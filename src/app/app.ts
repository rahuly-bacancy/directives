import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DirectivesDeepDiveComponent } from './components/directives-deep-dive/directives-deep-dive.component';
import { HighLight } from './directive/high-light';
import { If } from "./directive/if";
import { For } from './directive/for';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    DirectivesDeepDiveComponent,
    HighLight,
    If,
    For
],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly title = signal('Angular Directives Lab');
items = ['Angular', 'React', 'Vue', 'Node'];
  readonly demoLinks = [
    { label: 'Recap', href: '#recap' },
    { label: 'Directive Inputs', href: '#directive-input' },
    { label: 'HostListener', href: '#hostlistener' },
    { label: 'HostBinding', href: '#hostbinding' },
    { label: 'Structural', href: '#structural' },
    { label: 'Deep Dive', href: '#deep-dive' },
  ];
}
