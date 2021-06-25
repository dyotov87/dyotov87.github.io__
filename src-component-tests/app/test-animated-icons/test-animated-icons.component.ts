import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yuv-test-animated-icons',
  templateUrl: './test-animated-icons.component.html',
  styleUrls: ['./test-animated-icons.component.scss'],
  host: { class: 'yuv-test-container' }
})
export class TestAnimatedIconsComponent implements OnInit {
  activeUpload: boolean;
  constructor() {}

  ngOnInit() {}
}
