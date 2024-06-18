import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberValidator]'
})
export class NumberValidatorDirective {
  private regex: RegExp = new RegExp(/^-?\d{0,2}(\.\d{0,1})?$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Delete'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow special keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const selectionStart = this.el.nativeElement.selectionStart;
    const selectionEnd = this.el.nativeElement.selectionEnd;

    const next: string = [current.slice(0, selectionStart), event.key, current.slice(selectionEnd)].join('');

    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    const value = this.el.nativeElement.value;
    if (value) {
      const num = parseFloat(value);
      if (num < -99 || num > 99) {
        this.el.nativeElement.value = '';
      }
    }
  }
}
