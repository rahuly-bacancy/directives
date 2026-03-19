import { Directive, effect, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFor]'
})
export class For {

  appForOf = input<any[]>([]);
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { 
    effect(() => {
      this.viewContainer.clear();
      this.appForOf().forEach((item,index) => {
        this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: item, $index: index });
      })
    })
  }

}
