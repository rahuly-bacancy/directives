import { Directive, effect, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFor]',
  standalone: true
})
export class For {

  appForOf = input<any[]>([]);
  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { 
    effect(() => {
      this.viewContainer.clear();
      this.appForOf().forEach((item: any) => {
        this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: item, index: this.appForOf().indexOf(item)});
      })
    })
  }

}
