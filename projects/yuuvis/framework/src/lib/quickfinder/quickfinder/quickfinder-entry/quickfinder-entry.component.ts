import { Highlightable } from '@angular/cdk/a11y';
import { Component, ElementRef, HostBinding, Input } from '@angular/core';

/**
 * @ignore
 */
export interface QuickfinderEntry {
  id: string;
  iconSVG: string;
  title: string;
  description: string;
}
/**
 * @ignore
 */
@Component({
  selector: 'yuv-quickfinder-entry',
  templateUrl: './quickfinder-entry.component.html',
  styleUrls: ['./quickfinder-entry.component.scss']
})
export class QuickfinderEntryComponent implements Highlightable {
  @HostBinding('class.active') _active: boolean = false;

  @Input() item: QuickfinderEntry;

  constructor(public element: ElementRef) {}

  detailsClicked(event) {
    event.stopPropagation();
  }

  setActiveStyles(): void {
    this._active = true;
  }
  setInactiveStyles(): void {
    this._active = false;
  }
}
