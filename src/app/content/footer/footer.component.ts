import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private responsive: BreakpointObserver) { }

  isMobile: boolean = false
  currentYear: number = new Date().getFullYear()

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(res => {
      if (res.matches) {
        this.isMobile = !this.isMobile
      }
    })
  }

}
