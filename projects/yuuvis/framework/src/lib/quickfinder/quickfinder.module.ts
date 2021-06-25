import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { YuvCommonModule } from '../common/common.module';
import { YuvFormModule } from '../form/form.module';
import { QuickfinderEntryComponent } from './quickfinder/quickfinder-entry/quickfinder-entry.component';
import { QuickfinderComponent } from './quickfinder/quickfinder.component';

/**
 * Module providing components for a quick selection an one object such as `QuickfinderComponent`.
 */
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, YuvCommonModule, YuvFormModule],
  declarations: [QuickfinderComponent, QuickfinderEntryComponent],
  entryComponents: [QuickfinderComponent, QuickfinderEntryComponent],
  exports: [QuickfinderComponent]
})
export class YuvQuickfinderModule {}
