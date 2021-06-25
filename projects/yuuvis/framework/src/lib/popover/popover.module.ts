import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YuvCommonModule } from '../common/common.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { PopoverComponent } from './popover/popover.component';

/**
 * Use this module to inject a `PopoverService`.
 */

// based upon https://stackblitz.com/edit/cdk-popover-example-p1
@NgModule({
  declarations: [PopoverComponent, ConfirmComponent],
  imports: [CommonModule, OverlayModule, PortalModule, YuvCommonModule],
  entryComponents: [PopoverComponent, ConfirmComponent]
})
export class YuvPopoverModule {}
