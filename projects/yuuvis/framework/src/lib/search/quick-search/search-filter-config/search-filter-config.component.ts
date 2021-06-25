import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { SearchFilter, SearchFilterGroup, SearchQuery, TranslateService, UserConfigService, Utils } from '@yuuvis/core';
import { IconRegistryService } from '../../../common/components/icon/service/iconRegistry.service';
import { Selectable } from '../../../grouped-select';
import { PopoverConfig } from '../../../popover/popover.interface';
import { PopoverRef } from '../../../popover/popover.ref';
import { NotificationService } from '../../../services/notification/notification.service';
import { addCircle, clear } from '../../../svg.generated';
import { QuickSearchPickerData } from '../quick-search-picker/quick-search-picker.component';
import { SelectableGroup } from './../../../grouped-select/grouped-select/grouped-select.interface';
import { PopoverService } from './../../../popover/popover.service';
import { QuickSearchService } from './../quick-search.service';

@Component({
  selector: 'yuv-search-filter-config',
  templateUrl: './search-filter-config.component.html',
  styleUrls: ['./search-filter-config.component.scss']
})
export class SearchFilterConfigComponent implements OnInit {
  @ViewChild('storedFilterInput') storedFilterInput: ElementRef;
  @ViewChild('fieldSelectTrigger') fieldSelectTrigger: ElementRef;
  @ViewChild('tplValuePicker') tplValuePicker: TemplateRef<any>;

  storedFiltersGroups: SelectableGroup[] = [];
  availableFiltersGroups: SelectableGroup[] = [];
  availableObjectTypeFields: Selectable[];

  hiddenFilters: string[] = [];
  storedFilters: Selectable[] = [];
  selectedFilter: Selectable = { id: '', label: '' };
  mainSelection: string[] = [];
  selection: string[] = [];
  formOptions: any;
  formValid = false;
  fromActive = true;
  global = false;

  get hasManageSettingsRole() {
    return this.userConfig.hasManageSettingsRole;
  }

  query: SearchQuery;
  CREATE_NEW_ID = '__create_new';

  @Input() set options(data: { typeSelection: string[]; query: SearchQuery; sharedFields: boolean; global: boolean }) {
    this.global = data.global;
    this.query = data.query;
    this.availableObjectTypeFields = this.quickSearchService.getAvailableObjectTypesFields(data.typeSelection, data.sharedFields);

    this.availableFiltersGroups = [
      ...this.quickSearchService.groupFilters(
        this.availableObjectTypeFields.map((o) => ({ ...o, value: [new SearchFilter(o.id, o.defaultOperator, o.defaultValue)] }))
      )
    ];

    this.quickSearchService.loadFilterSettings(this.global).subscribe(([storedFilters, hiddenFilters]) => {
      this.storedFilters = this.quickSearchService.loadFilters(storedFilters as any, this.availableObjectTypeFields);
      this.hiddenFilters = hiddenFilters;

      this.storedFiltersGroups = [
        {
          id: 'custom',
          label: this.translate.instant('yuv.framework.search.filter.custom.filters'),
          items: this.getDefaultFilters()
        },
        {
          id: 'enabled',
          label: this.translate.instant('yuv.framework.search.filter.enabled.filters'),
          items: this.storedFilters.filter((f) => this.isVisible(f))
        },
        {
          id: 'disabled',
          label: this.translate.instant('yuv.framework.search.filter.disabled.filters'),
          items: this.storedFilters.filter((f) => !this.isVisible(f))
        }
      ];

      this.availableFiltersGroups.push({
        id: 'stored',
        label: this.translate.instant('yuv.framework.search.filter.stored.filters'),
        items: this.storedFilters.filter((f) => this.isVisible(f))
      });

      this.createNew();
      this.mainSelection = [this.CREATE_NEW_ID];
    });
  }
  @Output() close = new EventEmitter<any>();

  constructor(
    private quickSearchService: QuickSearchService,
    private notify: NotificationService,
    private translate: TranslateService,
    private userConfig: UserConfigService,
    private iconRegistry: IconRegistryService,
    private popoverService: PopoverService
  ) {
    this.iconRegistry.registerIcons([addCircle, clear]);
  }

  isVisible(filter = this.selectedFilter) {
    return filter && filter.id && !this.hiddenFilters.includes(filter.id);
  }

  isDefault(filter = this.selectedFilter) {
    return filter && filter.id && !filter.highlight;
  }

  isStored(filter = this.selectedFilter) {
    return filter && filter.id && !!this.storedFilters.find((f) => f.id === filter.id);
  }

  isEmpty(filter = this.selectedFilter) {
    return filter && filter.id && SearchFilterGroup.fromArray(filter.value || []).isEmpty();
  }

  createNew(value: (SearchFilter | SearchFilterGroup)[] = []) {
    this.onFilterSelect({
      id: Utils.uuid(),
      label: '',
      highlight: true,
      value: [...value]
    });
  }

  getDefaultFilters() {
    return [
      {
        id: this.CREATE_NEW_ID,
        svg: addCircle.data,
        label: this.translate.instant('yuv.framework.search.filter.create.new'),
        value: []
      },
      this.query.filters.length && {
        id: this.CREATE_NEW_ID + '#active',
        svg: addCircle.data,
        label: `${this.translate.instant('yuv.framework.search.filter.create.new')} (${this.translate.instant('yuv.framework.search.filter.from.active')})`,
        value: this.query.filterGroup.clone().group
      },
      ...this.storedFilters.filter((f) => this.isVisible(f) && f.highlight)
    ].filter((f) => f);
  }

  onFilterSelect(res: Selectable) {
    if (res.id.startsWith(this.CREATE_NEW_ID)) {
      this.createNew(res.value);
    } else {
      this.selectedFilter = res;
      this.formOptions = { filter: this.selectedFilter, availableObjectTypeFields: this.availableObjectTypeFields };
    }
  }

  onClose() {
    this.close.emit();
  }

  onVisibilityChange(visible = this.isVisible()) {
    this.quickSearchService.saveFiltersVisibility(this.selectedFilter.id, !visible, this.global).subscribe((hiddenFilters) => {
      this.hiddenFilters = hiddenFilters;
      this.storedFiltersGroups[0].items = this.getDefaultFilters();
      this.storedFiltersGroups[1].items = this.storedFilters.filter((f) => this.isVisible(f));
      this.storedFiltersGroups[2].items = this.storedFilters.filter((f) => !this.isVisible(f));
      this.availableFiltersGroups.find((g) => g.id === 'stored').items = this.storedFilters.filter((f) => this.isVisible(f));
    });
  }

  onControlRemoved(id: string) {}

  onFilterChanged(res: Selectable) {
    res.label = this.selectedFilter.label;
    this.selectedFilter = res;
  }

  onFilterNameChanged(name: string) {
    this.selectedFilter.label = name;
  }

  onSave() {
    if (this.formValid && this.selectedFilter.label && !this.isEmpty()) {
      this.quickSearchService.saveFilter(this.selectedFilter, this.global).subscribe((storedFilters) => {
        this.storedFilters = this.quickSearchService.loadFilters(storedFilters as any, this.availableObjectTypeFields);
        this.onVisibilityChange(false);
        // reset form
        this.onFilterSelect(this.selectedFilter);
        this.mainSelection = [this.selectedFilter.id];
        this.notify.success(this.translate.instant('yuv.framework.search.filter.configuration'), this.translate.instant('yuv.framework.search.filter.saved'));
      });
    } else if (!this.selectedFilter.label) {
      this.storedFilterInput.nativeElement.focus();
    }
  }

  onRemove() {
    this.quickSearchService.removeFilter(this.selectedFilter, this.global).subscribe((storedFilters) => {
      this.storedFilters = this.quickSearchService.loadFilters(storedFilters as any, this.availableObjectTypeFields);
      this.onVisibilityChange(true);
      this.notify.success(this.translate.instant('yuv.framework.search.filter.configuration'), this.translate.instant('yuv.framework.search.filter.removed'));
      this.createNew();
    });
  }

  showObjectTypeFieldPicker() {
    const pickerData: QuickSearchPickerData = {
      type: 'filter',
      items: this.availableFiltersGroups,
      selected: []
    };
    const popoverConfig: PopoverConfig = {
      panelClass: 'filters',
      maxHeight: 400,
      disableSmallScreenClose: true,
      data: pickerData
    };
    this.popoverService.open(this.tplValuePicker, popoverConfig, this.fieldSelectTrigger.nativeElement);
  }

  onPickerResult(type: string, res: Selectable[], popoverRef?: PopoverRef) {
    const fs = res[0].value as any;
    this.formOptions.newFilters = [...fs];
    this.onPickerCancel(popoverRef);
  }

  onPickerCancel(popoverRef?: PopoverRef) {
    return popoverRef && popoverRef.close();
  }

  ngOnInit() {}
}
