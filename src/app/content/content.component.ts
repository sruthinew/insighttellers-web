import { Component, AfterViewInit, ElementRef, ViewChild, HostListener } from "@angular/core";
import gsap from "gsap";
import Observer from "gsap/Observer";
import ScrollTrigger from "gsap/ScrollTrigger";

@Component({
    selector: 'app-components',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})

export class RootContentComponent implements AfterViewInit {

    @ViewChild('landingSection') landing: ElementRef | any

    isCardActive: boolean = true
    isAnimating: boolean = false

    constructor() {
        gsap.registerPlugin(ScrollTrigger, Observer)
    }

    ngAfterViewInit(): void {
        gsap.timeline({
            scrollTrigger: {
                trigger: this.landing.nativeElement,
                start: '10% top',
                markers: false,
                scrub: true,
                toggleClass: 'blurred-landing'
            }
        }).to(this.landing.nativeElement, {autoAlpha: 0, y: 150})
    }
    
    scrollToView(event: any): void {
        let scrollTo = event

        if (typeof event === 'boolean') {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            location.pathname = ""
        } else {
            scrollTo = event.target.getAttribute('link-data')
            document.querySelector('#nav-link-mobile>.nav-link__active')?.classList.remove('nav-link__active')
            event.target.classList.add('nav-link__active')

            if (scrollTo === "landing-page") {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }

            this.toggleSidebarEvent()
        }
    }

    toggleSidebarEvent(): void {
        document.querySelector('.sidebar-container')?.classList.toggle('sidebar-container__active')
    }
}