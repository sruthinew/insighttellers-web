import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  @ViewChild('cardList', {static: true}) cardList: ElementRef | any

  currentActiveIndex: number = 1
  isScreen: string = 'large';

  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.Medium, Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait]).subscribe(res => {
      if (this.responsive.isMatched(Breakpoints.Medium)) {
        this.isScreen = 'medium'
      } else if (this.responsive.isMatched(Breakpoints.HandsetPortrait) || this.responsive.isMatched(Breakpoints.TabletPortrait)) {
        this.isScreen = 'mobile'
      }
    })
  }

  processSliderAnimation(cardData: any, card: HTMLElement): void {
    let activeCard = this.cardList.nativeElement.querySelector('.card-active>.card-body')
    let activeCardObj = activeCard.getBoundingClientRect()

    let cardObj = card.getBoundingClientRect()
    let slideByPixels = activeCardObj.right - cardObj.right

    if (cardData.animateToActive) {
      if (cardData.isCardAtMid) {
        gsap.to(activeCard, {opacity: 1, scale: 1})
      } else {
        gsap.timeline()
          .to(card, {x: slideByPixels})
          .to(activeCard, {opacity: 0, scale: .8}, "<0")
      }
    } else {
      if (cardData.isCardAtMid) {
        gsap.to(activeCard, {opacity: 0, scale: .8})
      } else {
        gsap.timeline()
          .to(card, {x: 0})
          .to(activeCard, {opacity: 1, scale: 1}, "<0")
      }
    }
  } 

  initSliderAnimation(event: any): void {
    let index = event.target.getAttribute('data-index')
    let card = this.cardList.nativeElement.querySelector(`.card-${index}>.card-body`)
    let isCardActive = card.getAttribute('data-active')

    let cardData = {
      animateToActive: (isCardActive == 'false') ? true : false,
      isCardAtMid: (index == "2")
    }

    this.processSliderAnimation(cardData, card)

    card.setAttribute('data-active', (isCardActive == 'false') ? 'true' : 'false')
    event.target.classList.toggle('slider-btn-active')
  }

  animateCard(direction: string): void {
    if (direction === 'next') {
      let t = this.cardList.nativeElement.querySelector('.card-active')
      gsap.to(t, {
        x: 100,
        duration: 1
      })
    }
  }
}
