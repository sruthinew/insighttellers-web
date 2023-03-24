import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {

  @ViewChild('animateVector', {static: true}) vector: ElementRef | any

  @ViewChild('vectorSlider', {static: true}) vectorSlider: ElementRef | any
  @ViewChild('textSliderX', {static: true}) textSliderX: ElementRef | any
  @ViewChild('textSliderY', {static: true}) textSliderY: ElementRef | any
  @ViewChild('animateSliderShape', {static: true}) sliderShape: ElementRef | any

  isScreen: string = 'large'

  currentSlide: number = 1

  carouselData = [
    {
      counter: '01',
      text: 'Tap on Business, Customers and Trends with Better Insights.'
    },
    {
      counter: '02',
      text: 'Customers Matter and so does their Opinion!'
    },
    {
      counter: '03',
      text: 'We provide Reliable Research People!'
    },
    {
      counter: '04',
      text: 'Expect Quick, Reliable, Real and Affordable insights!'
    }
  ]

  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.Medium, Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait]).subscribe(res => {
      if (this.responsive.isMatched(Breakpoints.Medium)) {
        this.isScreen = 'medium'
      } else if (this.responsive.isMatched(Breakpoints.HandsetPortrait) || this.responsive.isMatched(Breakpoints.TabletPortrait)) {
        this.isScreen = 'mobile'
      }
    })

    this.moveVectorSlide(false)

  }

  ngAfterViewInit(): void {
    setInterval(() => {
      if (this.currentSlide == 4) {
        this.currentSlide = 0
        this.moveVectorSlide(false)
      } else {
        this.currentSlide += 1
        this.moveVectorSlide(true)
      }
    }, 2500)
  }

  moveVectorSlide(animateSlide: boolean): void {
    gsap.timeline({defaults: {duration: animateSlide ? 1 : 0}})
      .to(this.vectorSlider.nativeElement, {x: `-${this.currentSlide * 100}%`})
      .to(this.textSliderX.nativeElement, {x: `-${this.currentSlide * 100}%`}, "<0")
      .to(this.sliderShape.nativeElement, {rotate: '+=45deg'}, "<0")
  }
}