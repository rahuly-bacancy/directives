import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type DeepDiveTopic = Readonly<{
  id: string;
  title: string;
  definition: string;
 whatIsIt: string;
  howItWorks: readonly string[];
  keyTakeaways: readonly string[];
  codeExample?: string;
}>;

@Component({
  selector: 'app-directives-deep-dive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directives-deep-dive.component.html',
  styleUrl: './directives-deep-dive.component.css',
})
export class DirectivesDeepDiveComponent {
  trackByTopicId(_index: number, topic: DeepDiveTopic): string {
    return topic.id;
  }

  readonly topics: readonly DeepDiveTopic[] = [
    {
      id: 'recap-structural-attribute',
      title: '1. Structural and Attribute Directives Recap',
      definition:
        'Directives are classes that add behavior to elements or transform the DOM in Angular templates.',
      whatIsIt:
        'Structural directives change the DOM shape (add/remove/move views). Attribute directives change how an existing element looks or behaves.',
      howItWorks: [
        'Structural: Angular gives the directive a TemplateRef (what to render) and ViewContainerRef (where to render). The directive decides when to create/clear embedded views.',
        'Attribute: Angular instantiates the directive on the host element and applies its logic (styles, classes, attributes, listeners) to that same element.',
        'Both types can accept inputs via @Input() so templates can pass data/configuration.',
      ],
      keyTakeaways: [
        'Structural directives are about rendering views; attribute directives are about enhancing a host element.',
        'The `*` syntax is special sugar for an `<ng-template>`.',
      ],
      codeExample: `<!-- Attribute directive -->
<div appHighlight="lemonchiffon">Highlighted block</div>

<!-- Structural directive -->
<div *ngIf="isLoggedIn">Visible only when true</div>`,
    },
    {
      id: 'custom-attribute-directive',
      title: '2. Creating a custom attribute directive',
      definition:
        'A custom attribute directive is a directive attached to an existing element using an attribute selector.',
      whatIsIt:
        'It is reusable behavior you can apply to many elements, like highlighting, tooltips, validation styling, or permissions.',
      howItWorks: [
        'Create a directive with `@Directive({ selector: \'[yourSelector]\' })`.',
        'Expose configuration via `@Input()` (e.g. a color).',
        'Change the host element using ElementRef (direct DOM), Renderer2 (safe DOM), or host bindings.',
      ],
      keyTakeaways: [
        'Prefer `@HostBinding` for styles/classes/attributes you want Angular to track.',
        'Prefer inputs with aliases when you want attribute-like usage (e.g. `appHighlight="yellow"`).',
      ],
      codeExample: `import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @HostBinding('style.backgroundColor') backgroundColor = 'yellow';

  @Input('appHighlight')
  set color(value: string | null) {
    this.backgroundColor = value?.trim() || 'yellow';
  }
}`,
    },
    {
      id: 'hostlistener',
      title: '3. Using @HostListener to bind host events',
      definition:
        '`@HostListener` lets a directive listen to DOM events on the host element (or global targets) and run directive methods when those events occur.',
      whatIsIt:
        'It is a declarative way to react to interactions like mouse enter/leave, clicks, key presses, focus/blur, etc., without adding event bindings everywhere in the template.',
      howItWorks: [
        'Angular registers event listeners when the directive is created.',
        'When the event fires, Angular calls the decorated method.',
        'You can read event payloads (like MouseEvent) by adding parameters.',
      ],
      keyTakeaways: [
        'Great for encapsulating UI interaction behavior (hover effects, shortcuts, focus management).',
        'Keeps templates clean: you apply behavior once via an attribute.',
      ],
      codeExample: `import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({ selector: '[appHover]', standalone: true })
export class HoverDirective {
  @HostBinding('style.transform') transform = 'translateY(0)';

  @HostListener('mouseenter')
  onEnter() {
    this.transform = 'translateY(-2px)';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.transform = 'translateY(0)';
  }
}`,
    },
    {
      id: 'hostbinding',
      title: '4. Using @HostBinding to bind host properties',
      definition:
        '`@HostBinding` binds a directive field to a property/class/attribute/style on the host element.',
      whatIsIt:
        'It is an Angular-managed way to update the host element from directive state (classes, attributes, inline styles).',
      howItWorks: [
        'Angular evaluates the directive property and writes the result to the host binding target.',
        'When the property changes, Angular updates the DOM accordingly.',
        'You can bind styles (`style.*`), classes (`class.*`), and attributes (`attr.*`).',
      ],
      keyTakeaways: [
        'Prefer it over manual `nativeElement.style = ...` when possible.',
        'Combine `@HostBinding` with `@Input()` or signals for reactive behavior.',
      ],
      codeExample: `import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[appPermission]', standalone: true })
export class PermissionDirective {
  @HostBinding('attr.aria-disabled') ariaDisabled: string | null = null;
  @HostBinding('style.pointerEvents') pointerEvents: string | null = 'auto';
  @HostBinding('style.opacity') opacity = '1';

  @Input('appPermission')
  set allowed(value: boolean | null) {
    const canAccess = !!value;
    this.ariaDisabled = (!canAccess).toString();
    this.pointerEvents = canAccess ? 'auto' : 'none';
    this.opacity = canAccess ? '1' : '0.55';
  }
}`,
    },
    {
      id: 'bind-directive-inputs',
      title: '5. Binding to Directive Properties',
      definition:
        'Directives can expose inputs (and optionally outputs). Templates bind to these directive inputs like any component input.',
      whatIsIt:
        'It is how you configure a directive per usage: pass values, booleans, or objects to control behavior.',
      howItWorks: [
        'Declare `@Input()` on the directive.',
        'Bind in template using property binding syntax `[yourInput]="expression"` or attribute-like syntax `yourInput="literal"`.',
        'When the binding expression changes, Angular re-invokes the input setter / updates the input property.',
      ],
      keyTakeaways: [
        'Use input aliasing to map an attribute name to a property name.',
        'Use boolean inputs carefully: `[appPermission]="isAllowed"` is clearer than relying on presence/absence.',
      ],
      codeExample: `<!-- Alias-style binding: appHighlight maps to directive input -->
<p [appHighlight]="selectedColor">Color comes from component state</p>

<!-- Boolean input binding -->
<button [appPermission]="currentUserIsAdmin">Admin only</button>`,
    },
    {
      id: 'structural-behind-scenes',
      title: '6. What happens behind the scenes in a structural directive?',
      definition:
        'Structural directives work by turning template HTML into an Angular template (`TemplateRef`) that can be rendered as an embedded view.',
      whatIsIt:
        'The `*` asterisk syntax is “syntactic sugar” that Angular desugars into an `<ng-template>` element.',
      howItWorks: [
        'Angular rewrites `*yourDirective="expr"` into an `<ng-template [yourDirective]="expr">...</ng-template>`.',
        'Your directive receives the TemplateRef for the `<ng-template>` contents.',
        'The directive uses ViewContainerRef to `createEmbeddedView(templateRef)` (render) or `clear()` (remove).',
      ],
      keyTakeaways: [
        'Structural directives control “views”, not individual DOM properties.',
        'The directive owns when and how many embedded views are created.',
      ],
      codeExample: `<!-- Sugar -->
<div *appUnless="condition">Shown when condition is false</div>

<!-- Desugared form -->
<ng-template [appUnless]="condition">
  <div>Shown when condition is false</div>
</ng-template>`,
    },
    {
      id: 'custom-structural',
      title: '7. Building a Custom Structural directive',
      definition:
        'A custom structural directive is a directive that creates and destroys embedded views based on some logic.',
      whatIsIt:
        'It is like a custom `*ngIf` / `*ngFor` for your specific application needs (permissions, feature flags, device breakpoints, experiments).',
      howItWorks: [
        'Inject `TemplateRef` and `ViewContainerRef` in the directive constructor.',
        'Decide when to render by calling `createEmbeddedView(...)` vs `clear()`.',
        'Expose an input (e.g. `@Input(\'appUnless\')`) that updates the condition.',
      ],
      keyTakeaways: [
        'Keep structural directives small and deterministic: view container should reflect current state.',
        'Use `clear()` before re-rendering to avoid accidentally creating multiple copies.',
      ],
      codeExample: `import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]', standalone: true })
export class UnlessDirective {
  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
  ) {}

  @Input('appUnless')
  set condition(value: boolean) {
    this.viewContainer.clear();
    if (!value) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}`,
    },
  ];
}
