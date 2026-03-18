import { Directive, effect, ElementRef, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLight {

  appHighLight = input<string>('yellow');
  @HostBinding('style.backgroundColor')
  get bgColor() {
    return this.appHighLight();
  }
}
