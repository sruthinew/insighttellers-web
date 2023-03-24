import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild('navLinkList') navLinkList: any
  @ViewChild('activeLinkMarker') activeLinkMarker: any

  @Output() navLinkEvent = new EventEmitter<boolean>();
  @Output() toggleSidebarEvent = new EventEmitter<boolean>();

  currentlyActive: any
  isMobile: boolean = false

  constructor(private responsive: BreakpointObserver, private location: Location) {
  }

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait]).subscribe(res => {
      if (res.matches) {
        this.isMobile = !this.isMobile
      }
    })
  }

  ngAfterViewInit(): void {
    let activeLink = this.navLinkList.nativeElement.children[0]
    this.currentlyActive = activeLink

    this.activeLinkMarker.nativeElement.style.width = activeLink.offsetWidth / 2

    let markerPos = (activeLink.offsetWidth / 2) - (this.activeLinkMarker.nativeElement.offsetWidth / 2) + activeLink.offsetLeft
    this.activeLinkMarker.nativeElement.style.transform = `translateX(${markerPos}px)`
  }

  moveMarkerTo(linkIndex: number): void {
    let activeLink = this.navLinkList.nativeElement.children[linkIndex]
    this.currentlyActive = activeLink

    this.activeLinkMarker.nativeElement.style.width = activeLink.offsetWidth / 2 + 'px'

    let markerPos = (activeLink.offsetWidth / 2 - activeLink.offsetWidth / 4) + activeLink.offsetLeft
    this.activeLinkMarker.nativeElement.style.transform = `translateX(${markerPos}px)`
  }

  switchNavLink(event: any) {
    let linkId = parseInt(event.target.getAttribute('link-index'))

    this.currentlyActive.classList.remove('nav-link-active')
    event.target.classList.add('nav-link-active')
    this.moveMarkerTo(linkId)

    if (linkId === 0) {
      this.navLinkEvent.emit(true)
    }
  }

  isSidebarActive: boolean = false

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive
    this.toggleSidebarEvent.emit(this.isSidebarActive)
  }

}
