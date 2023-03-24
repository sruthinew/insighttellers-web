import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import gsap from 'gsap';

@Directive({
  selector: '[appAnimate]'
})
export class AnimateDirective implements OnInit {

  @Input() appAnimate!: string
  @Input() animateDelay: number = 0

  constructor(private el: ElementRef<HTMLElement>) {
  }
  
  ngOnInit(): void {
    this.el.nativeElement.classList.add(`normalize-${this.appAnimate}-object`)
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.el.nativeElement.classList.remove(`normalize-${this.appAnimate}-object`)
        this.el.nativeElement.classList.add('animate-object')
      } else {
        this.el.nativeElement.classList.remove('animate-object')
        this.el.nativeElement.classList.add(`normalize-${this.appAnimate}-object`)
      }
    })

    observer.observe(this.el.nativeElement)
  }
}
