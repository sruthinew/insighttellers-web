import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import * as Hammer from 'hammerjs';
import gsap from 'gsap';
import Observer from 'gsap/Observer';


@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss']
})
export class OurServicesComponent implements OnInit, AfterViewInit {

  @ViewChild('cardList') cardList: ElementRef | any

  @Input() isCardActive: any 

  isScreen: string = 'large'

  constructor(private responsive: BreakpointObserver) {
    gsap.registerPlugin(Observer)
  }

  services: any = [
    {
      title: 'Quantitative Market Research',
      content: 'Our quantitative market research services help you quickly gather insights from our panellists and understand the changing consumer behaviour. Using our comprehensive services, we find the answers to the most of your questions!'
    },
    {
      title: 'Data Collection & Analysis',
      content: `Dedicated Data collection and analysis services from brilliant minds at INSIGHT TELLERS help you understand the information, establish a factual basis for building verdict and eventually enabling better decisions after analysing your requirements.`
    },
    {
      title: 'Qualitative Research',
      content: `Our Qualitative Research services include formation of focus groups and in- depth interviews and this gives you deep insights into consumer behaviour by questioning them about your product or services consumption experience.`
    },
    {
      title: 'Our Services',
      content: false
    },
    {
      title: 'Mystery Shopping',
      content: `With a team of professional mystery shoppers, we evaluate the different aspects of the customer experience regarding your products/services. Our mystery shopping market research includes staff knowledge, cleanliness of establishment, product availability, levels of service etc. not only let you evaluate your internal operations but also your competitors' operation.`
    },
    {
      title: 'Translation',
      content: `Targeting audiences in multiple geographies? Our Experts believe that useful insights can be gained when people share their opinion in their local language, and we make this happen by translating the questionnaire in the local language. Our detailed report includes the analysis of key segments, trends, and other factors that plays substantial role in complete turn-around of your business.`
    },
    {
      title: 'Survey Programming',
      content: `Insight Tellers has a team of skilled and experienced online survey programming team that has served clients globally on various complex and multi-lingual survey programming services. Our dedicated services include salient features covering complex conjoint, card sort exercises, media monitoring, and much more. `
    },
    {
      title: 'Panel Aggregation',
      content: `With our hands on the latest technology and tools we ensure to form panel samples that are finely-tuned, accurate, credible and most importantly cleaner. We understand the importance of overall sample in market research. With our Panel Aggregation services we lead to quality data for reliable and trustworthy results. `
    },
    {
      title: 'Contracted Work',
      content: `With an extensive team of data scientists and behavioural experts we design innovative solutions that deliver value across the organisation. Our contracted market research work provides strategic guidance in segmentation, customer experience, targeting, brand building and more.`
    }
  ]

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.Medium, Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait]).subscribe(res => {
      if (this.responsive.isMatched(Breakpoints.Medium)) {
        this.isScreen = 'medium'
      } else if (this.responsive.isMatched(Breakpoints.HandsetPortrait) || this.responsive.isMatched(Breakpoints.TabletPortrait)) {
        this.isScreen = 'mobile'
        this.services = this.services.filter((i: any) => i.content != false)
      }
    })
  }
  
  ngAfterViewInit(): void {
    this.cardList.nativeElement.children[0].classList.add('card-active')

    let container: HTMLElement | any = document.querySelector('.swipe-container')
    const hammer = new Hammer(container)
    hammer.on('swipeleft', () => this.animateCard('next'))
    hammer.on('swiperight', () => this.animateCard('prev'))
  }

  currentSlide: number = 0
  slidePixels: any = false

  animateCard(direction: string): void {
    let activeCard = this.cardList.nativeElement.querySelector('.card-active')
    
    if (direction === 'next') {
      this.currentSlide = (this.currentSlide === this.services.length - 1) ? this.currentSlide : this.currentSlide + 1 
    } else {
      this.currentSlide = (this.currentSlide === 0) ? 0 : this.currentSlide - 1
    }

    let currentCard = this.cardList.nativeElement.querySelector(`.card-${this.currentSlide}`)
    this.processCardAnimation(activeCard, currentCard, direction)
  }

  processCardAnimation(activeCard: HTMLElement, tobeCurrentCard: HTMLElement, direction: string) {
    let activeCardObj = activeCard.getBoundingClientRect()
    let cardObj = tobeCurrentCard.getBoundingClientRect()
    this.slidePixels = (!this.slidePixels) ? cardObj.left - activeCardObj.left : this.slidePixels
    
    if (direction == 'next') {
      gsap.to(this.cardList.nativeElement, {x: -this.slidePixels*this.currentSlide, duration: .8})
    } else {
      gsap.to(this.cardList.nativeElement, {x: -this.slidePixels*this.currentSlide, duration: .8})
    }
    activeCard.classList.remove('card-active')
    tobeCurrentCard.classList.add('card-active')
  }
}
