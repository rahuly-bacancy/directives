import { Directive, effect, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIf]',
  standalone: true
})
export class If {
  appIf = input<boolean>(false);
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { 
    effect(() => {
      if(this.appIf()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }else {
        this.viewContainer.clear();
      }
    })
  }

}
