import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import gsap from 'gsap';
import Observer from 'gsap/Observer';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss']
})
export class WhyUsComponent implements OnInit {
  @ViewChild('perkCard02', {static: true}) perkCardPivot: ElementRef | any
  isScreen: string = 'large';

  constructor(private responsive: BreakpointObserver) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.Medium, Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait]).subscribe(res => {
      if (this.responsive.isMatched(Breakpoints.Medium)) {
        this.isScreen = 'medium'
      } else if (this.responsive.isMatched(Breakpoints.HandsetPortrait) || this.responsive.isMatched(Breakpoints.TabletPortrait)) {
        this.isScreen = 'mobile'
      }
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: '.why-us-container',
        start: '25% 20%',
        end: 'bottom top',
        scrub: true,
        pin: false,
        markers: false
      }
    })
      .to(this.perkCardPivot.nativeElement, {scale: 3.6, opacity: 1})
      .from('.testimonial-page', {opacity: 0}, "<0")
  }
}
