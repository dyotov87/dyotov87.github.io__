import { Attribute, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconRegistryService } from '../../../common/components/icon/service/iconRegistry.service';
import { clear } from '../../../svg.generated';
/**
 * Creates form input for boolean values (checkbox).
 *
 * Implements `ControlValueAccessor` so it can be used within Angular forms.
 *
 * @example
 * <yuv-checkbox></yuv-checkbox>
 *
 */
@Component({
  selector: 'yuv-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  host: { class: 'yuv-checkbox' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  // value: boolean = null;
  _tabindex;

  /**
   * By default checkbox value will be either 'true' or 'false'. Setting tristate
   * property to 'true' the value could also be set to NULL, meaning not set (default: false)
   */
  @Input() tristate = false;
  /**
   * Will prevent the input from being changed (default: false)
   */
  @Input() readonly: boolean;
  @Input() value: boolean = null;
  //@Input() filter: any;
  @Output() change = new EventEmitter<boolean>();

  constructor(@Attribute('tabindex') tabindex: string, private iconRegistry: IconRegistryService) {
    this.iconRegistry.registerIcons([clear]);
    this._tabindex = tabindex || '0';
  }

  reset(): void {
    this.value = null;
    this.propagateChange(this.value);
  }

  propagateChange = (_: any) => {};

  writeValue(value: any): void {
    this.value = value === undefined ? null : value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}

  onChange(value) {
    if (value === null) {
      this.value = true;
    }
    this.change.emit(this.value);
    this.propagateChange(this.value);
  }
}
