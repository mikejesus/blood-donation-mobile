/* eslint-disable @angular-eslint/no-input-rename */
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shrink-header',
  templateUrl: './shrink-header.component.html',
  styleUrls: ['./shrink-header.component.scss'],
})
export class ShrinkHeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: any;

  subScroll: Subscription;
  newHeaderHeight: any;

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    public domCtrl: DomController) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
    this.scrollArea.ionScroll.subscribe(event => {
      console.log(event.detail.scrollTop);
      this.resizeHeader(event);
    });
  }

  resizeHeader(event) {
    this.domCtrl.write(() => {
      this.newHeaderHeight = this.headerHeight - event.detail.scrollTop;
      if (this.newHeaderHeight < 0) {
        this.newHeaderHeight = 0;
      }
      this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
    });

  }

  ngOnDestroy() {
    if (this.subScroll) {
      this.subScroll.unsubscribe();
    }
  }

}
