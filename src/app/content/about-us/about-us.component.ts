import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit, AfterViewInit {
  @ViewChild('textParallax', {static: true}) textParallax: ElementRef | any

  isScreen: string = 'large'
  
  constructor(private responsive: BreakpointObserver) {
    gsap.registerPlugin(ScrollTrigger)
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
        trigger: '.about-us-container',
        start: 'top top',
        end: 'bottom+=50% bottom',
        pin: true,
        pinSpacing: false,
        markers: false
      }
    })
  }

  ngAfterViewInit(): void {
    const sections: any = gsap.utils.toArray('div.section-reveal')
    const height: any = gsap.getProperty(sections[0], "height")

    sections.forEach((section: any, i: number) => {
      gsap.from(section, {
        autoAlpha: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: section,
          start: () => `top+=${i*(height/1.5)}px center`,
          end: `+=${height/1.5}px`,
          toggleActions: 'play reverse play reverse',
          markers: false
        }
      })
    })
  }
}