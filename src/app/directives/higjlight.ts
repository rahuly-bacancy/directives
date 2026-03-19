import { Directive, effect, ElementRef, HostBinding, HostListener, input, signal } from '@angular/core';
import { single } from 'rxjs';

@Directive({
  selector: '[appHigjlight]'
})
export class Higjlight {

  appHigjlight = input<string>('blue');
  isHovered = signal(false);

  @HostBinding('style.backgroundColor')
  get backgroundColor() {
    return this.isHovered() ? this.appHigjlight() : 'transparent';
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered.set(false);
  }

}
