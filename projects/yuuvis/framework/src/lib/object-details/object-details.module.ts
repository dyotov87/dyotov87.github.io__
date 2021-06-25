import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@yuuvis/core';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { YuvActionModule } from '../actions/action.module';
import { YuvCommonModule } from '../common/common.module';
import { YuvComponentsModule } from '../components/components.module';
import { YuvDirectivesModule } from '../directives/directives.module';
import { YuvFormModule } from '../form/form.module';
import { YuvObjectFormModule } from '../object-form/object-form.module';
import { YuvPipesModule } from '../pipes/pipes.module';
import { YuvPluginsModule } from './../plugins/plugins.module';
import { AuditComponent } from './audit/audit.component';
import { ContentPreviewComponent } from './content-preview/content-preview.component';
import { ContextErrorComponent } from './context-error/context-error.component';
import { ObjectDetailsCompareComponent } from './object-details-compare/object-details-compare.component';
import { ObjectDetailsComponent } from './object-details/object-details.component';
import { SummarySectionComponent } from './summary/summary-section/summary-section.component';
import { SummaryComponent } from './summary/summary.component';

const objectDetails = [
  ObjectDetailsComponent,
  ObjectDetailsCompareComponent,
  SummaryComponent,
  SummarySectionComponent,
  AuditComponent,
  ContentPreviewComponent,
  ContextErrorComponent
];

/**
 * Module providing components to display the details of dms - objects such as object summary, context, audit, etc.
 */
@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    YuvComponentsModule,
    YuvDirectivesModule,
    YuvPipesModule,
    ReactiveFormsModule,
    YuvFormModule,
    YuvCommonModule,
    TranslateModule,
    FormsModule,
    YuvObjectFormModule,
    YuvActionModule,
    RouterModule,
    CalendarModule,
    YuvPluginsModule
  ],
  declarations: [...objectDetails],
  entryComponents: [...objectDetails],
  exports: [...objectDetails]
})
export class YuvObjectDetailsModule {}
