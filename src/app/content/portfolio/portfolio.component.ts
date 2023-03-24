import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import * as Hammer from 'hammerjs';
import gsap from 'gsap';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  @ViewChild('cardList') cardList: any

  constructor(private responsive: BreakpointObserver) { }
  
  isScreen: string = 'large'
  currentSlide: number = 0
  slidePixels: any = false

  listItems: any = [
    {
      active: 1,

      activeTitle: "Advertising Research",
      activeContent: "Insight Tellers uses advertising market research to gather strategic and valuable insights for creating effective advertising campaigns. Want to figure out which marketing and advertising method will deliver results for your business? Connect with Insight Tellers and increase your reach.",
      
      inactiveTitle: "Branding Research",
      inactiveContent: "It’s the power of branding that helps businesses sell their services/products. But deciphering which branding method to use is also important. Increase recognition for your company, set your values and become the unique identifiers in the market with our dedicated branding research services."
    },
    {
      active: 1,

      activeTitle: "Competitive Intelligence Research",
      activeContent: "Allow us to decode what your competitors are doing. We Gather and Analyse the biggest competitor’s data so we can find the best ways to spread intellect about your products, services, company, or data and make strategic decisions for your organisation using our Competitive Intelligence Research.",

      inactiveTitle: "Customer Loyalty Research",
      inactiveContent: "Apart from branding it’s the customer loyalty that your business wants. Want to understand the extent to which customers will continue to do business with you? Our powerful Customer Loyalty Research is a competitive tool that can lower your customer acquisition and bring in increased profits."
    },
    {
      active: 1,

      activeTitle: "Employee Engagement Research",
      activeContent: "Before scaling your business to new horizons, employee engagement is essential. Create a customised plan for employee engagement with preferences like unique personalities, motives, needs, and goals using our efficient solution.",

      inactiveTitle: "Market Opportunity Research",
      inactiveContent: "Considering new business ideas and market opportunities? The most important aspect for growing your business, so why shoot the arrows in the dark? Find out which one of them is worth pursuing so you can focus on the ones that have the highest potential for success."
    },
    {
      active: 1,

      activeTitle: "Pricing Strategy Research",
      activeContent: "Planning to upscale your current prices or thinking of launching a new product? Our pricing strategy market research helps you predict the customers' response and discover the psychological effects of price points on sales. INSIGHT TELLERS help you describe the right price by conducting the right market research making sure your product/services sell no matter what the situation is.",

      inactiveTitle: "Product Development Research",
      inactiveContent: "Planning to launch or develop a new product? With our Product Development Research gathers customer insights to make sure your products wins the marketplace and you do not have to bear the loss."
    },
    {
      active: 1,

      activeTitle: "Segmentation Research",
      activeContent: "Planning to launch more than one product in the market? Or looking to establish your company in an already established industry? Our segmentation research divides your brand's extensive target audience into smaller segments or subsets to better categorise and deliver services to your target market.",

      inactiveTitle: "Communication Research",
      inactiveContent: "Using our market communication research increases the effectiveness of the marketing communication of your enterprise by gathering market opinion and intelligence from your perspective market. We make sure you use the most straightforward methods ensuring clear communication with your target audience."
    },
    {
      active: 1,

      activeTitle: "Innovation Research",
      activeContent: "Bored from citing old and traditional market research methods that don't offer much results? Insight Tellers use the latest technologies and tools to bring in innovation in our market research services.",
      
      inactiveTitle: "Strategy Research",
      inactiveContent: "Change is constant in market conditions and at Insight Tellers we treat everything as dynamic. With the latest trends and marketing results in our minds we strategize your business for effective results in a defined period."
    }
  ]

  listItemsForMobile: Array<any> = []

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.Medium).subscribe(res => {
      if (this.responsive.isMatched(Breakpoints.HandsetPortrait) || this.responsive.isMatched(Breakpoints.TabletPortrait)) {
        this.isScreen = 'mobile'
        this.listItems.forEach((item: any) => {
          let obj1 = {title: item.activeTitle, content: item.activeContent}
          let obj2 = {title: item.inactiveTitle, content: item.inactiveContent}
          this.listItemsForMobile.push(obj1)
          this.listItemsForMobile.push(obj2)
        })
      } else if (this.responsive.isMatched(Breakpoints.Medium)) {
        this.isScreen = 'medium'
      }
    })
  }

  ngAfterViewInit(): void {
    this.cardList.nativeElement.children[0].classList.add('card-active')

    let container: HTMLElement | any = document.querySelector('.swipe-container-portfolio')
    const hammer = new Hammer(container)
    hammer.on('swipeleft', () => this.animateCard('next'))
    hammer.on('swiperight', () => this.animateCard('prev'))
  }

  animateCard(direction: string): void {
    let activeCard = this.cardList.nativeElement.querySelector('.card-active')
    
    if (direction === 'next') {
      this.currentSlide = (this.currentSlide == 12) ? 11 : this.currentSlide + 1 
    } else {
      this.currentSlide = (this.currentSlide == 0) ? 0 : this.currentSlide - 1
    }
    let currentCard = this.cardList.nativeElement.querySelector(`.card-${this.currentSlide}`)
    this.processCardAnimation(activeCard, currentCard, direction)
  }

  processCardAnimation(activeCard: HTMLElement, tobeCurrentCard: HTMLElement, direction: string) {
    let activeCardObj = activeCard.getBoundingClientRect()
    let cardObj = tobeCurrentCard.getBoundingClientRect()
    let getCardsToSlide = (sliceIndex: any) => Array.from(this.cardList.nativeElement.children).slice(parseInt(`${sliceIndex}`), this.listItemsForMobile.length)
    this.slidePixels = (!this.slidePixels) ? cardObj.left - activeCardObj.left : this.slidePixels

    if (direction == 'next') {
      let elems = getCardsToSlide(tobeCurrentCard.getAttribute('card-index'))
      gsap.timeline({defaults: {duration: .8}})
        .to(activeCard, {opacity: 0, scale: .8})
        .to(elems, {x: -this.slidePixels*this.currentSlide}, "<0") // x >==> gsap.utils.wrap(Array.from({length: elems.length}, (_, i) => -320*(i+1)))
        
      activeCard.classList.remove('card-active')
      tobeCurrentCard.classList.add('card-active')
    } else {
      let elems = getCardsToSlide(activeCard.getAttribute('card-index'))
      gsap.timeline({defaults: {duration: .8}})
        .to(tobeCurrentCard, {opacity: 1, scale: 1})
        .to(elems, {x: -this.slidePixels*this.currentSlide}, "<0")
      
        activeCard.classList.remove('card-active')
        tobeCurrentCard.classList.add('card-active')
    }
  }

  contentNext(): void {
    this.listItems.forEach((item: any) => {
      item.active = (item.active == 2) ? 2 : item.active + 1
    })
  }

  contentPrev(): void {
    this.listItems.forEach((item: any) => {
      item.active = (item.active == 1) ? 1 : item.active - 1
    })
  }

}
