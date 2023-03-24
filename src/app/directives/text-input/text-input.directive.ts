import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextInput]'
})
export class TextInputDirective implements OnInit {

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('focusin', this.onFocus)
    this.el.nativeElement.addEventListener('focusout', this.onBlur)
  }

  onFocus(e: any) {
    e.target.offsetParent.classList.add('input-group-active')
  }

  onBlur(e: any) {
    e.target.offsetParent.classList.remove('input-group-active')
  }

}
