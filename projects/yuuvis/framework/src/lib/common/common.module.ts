import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';
import { EmptyComponent } from './components/empty/empty.component';
import { IconComponent } from './components/icon/component/icon.component';
import { IconService } from './components/icon/service/icon.service';
import { IconRegistryService } from './components/icon/service/iconRegistry.service';
import { ObjectTypeIconComponent } from './components/object-type-icon/object-type-icon.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FocusWithinDirective } from './directives/focus-within.directive';
import { RouterLinkDirective } from './directives/router-link.directive';

/**
 * `YuvCommonModule` is a shared module containing components that are (re)used by other modules of the framework.
 * It for example contains the `yuv-icon` component, responsible for rendering SVG-Icons.
 */
@NgModule({
  imports: [CommonModule, HttpClientModule, AccordionModule, SidebarModule],
  declarations: [IconComponent, FocusWithinDirective, SidebarComponent, EmptyComponent, RouterLinkDirective, ObjectTypeIconComponent],
  entryComponents: [IconComponent, SidebarComponent, EmptyComponent, ObjectTypeIconComponent],
  exports: [IconComponent, FocusWithinDirective, SidebarComponent, EmptyComponent, RouterLinkDirective, ObjectTypeIconComponent],
  providers: [IconService, IconRegistryService]
})
export class YuvCommonModule {}
