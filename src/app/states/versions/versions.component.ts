import { PlatformLocation } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DmsObject, PendingChangesService, Screen, ScreenService, TranslateService } from '@yuuvis/core';
import { ObjectCompareInput, PluginsService, VersionListComponent } from '@yuuvis/framework';
import { takeUntilDestroy } from 'take-until-destroy';

@Component({
  selector: 'yuv-versions',
  templateUrl: './versions.component.html',
  styleUrls: ['./versions.component.scss']
})
export class VersionsComponent implements OnInit, OnDestroy {
  private STORAGE_KEY = 'yuv.app.versions';

  @ViewChild('versionList', { static: true }) versionList: VersionListComponent;

  versions: number[] = [];
  dmsObjectID: string;
  dmsObject: DmsObject;

  selection: DmsObject[];
  compare: ObjectCompareInput;
  smallScreen: boolean;

  get layoutOptionsKey() {
    return this.STORAGE_KEY;
  }

  plugins: any;
  pluginsCompare: any;

  constructor(
    private titleService: Title,
    private screenService: ScreenService,
    public translate: TranslateService,
    private location: PlatformLocation,
    private pendingChanges: PendingChangesService,
    private route: ActivatedRoute,
    private router: Router,
    private pluginsService: PluginsService
  ) {
    this.screenService.screenChange$.pipe(takeUntilDestroy(this)).subscribe((screen: Screen) => {
      this.smallScreen = screen.mode === ScreenService.MODE.SMALL;
    });
    this.plugins = this.pluginsService.getCustomPlugins('extensions', 'yuv-versions');
    this.pluginsCompare = this.pluginsService.getCustomPlugins('extensions', 'yuv-versions-compare');
  }

  closeDetails() {
    this.location.back();
  }

  onEditRecentClick(id: string) {
    this.router.navigate(['/object', id]);
  }

  onSlaveClosed() {
    if (!this.pendingChanges.check()) {
      this.versions = [];
    }
  }

  onCompareVersionsChange(objects: DmsObject[]) {
    this.compare = {
      title: this.versionList.activeVersion.title,
      first: {
        label: this.translate.instant('yuv.client.state.versions.compare.label', { version: objects[0].version }),
        item: objects[0]
      },
      second: {
        label: this.translate.instant('yuv.client.state.versions.compare.label', { version: objects[1].version }),
        item: objects[1]
      }
    };
  }

  versionSelected(objects: DmsObject[]) {
    if (objects && objects.length) {
      if (objects.length === 1) {
        this.compare = null;
        this.dmsObject = objects[0];
      } else {
        this.dmsObject = null;
        this.compare = {
          title: this.versionList.activeVersion.title,
          second: {
            label: this.translate.instant('yuv.client.state.versions.compare.label', { version: objects[0].version }),
            item: objects[0]
          },
          first: {
            label: this.translate.instant('yuv.client.state.versions.compare.label', { version: objects[1].version }),
            item: objects[1]
          }
        };
      }
    }
    this.selection = objects;
  }

  ngOnInit() {
    this.titleService.setTitle(this.translate.instant('yuv.client.state.versions.header.title'));
    this.route.params.pipe(takeUntilDestroy(this)).subscribe((params: any) => {
      if (params.id) {
        this.dmsObjectID = params.id;
      }
    });
    // extract the versions from the route params
    this.route.queryParamMap.pipe(takeUntilDestroy(this)).subscribe((params) => {
      const vp = params.get('version');
      this.versions = vp ? vp.split(',').map((v) => parseInt(v)) : [];
    });
  }

  ngOnDestroy() {}
}
