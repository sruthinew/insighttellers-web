import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TextInputDirective } from "../directives/text-input/text-input.directive";
import { NavbarComponent } from "../navbar/navbar.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { RootContentComponent } from "./content.component";
import { FooterComponent } from "./footer/footer.component";
import { OurServicesComponent } from "./our-services/our-services.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { TestimonialComponent } from "./testimonial/testimonial.component";
import { WhyUsComponent } from "./why-us/why-us.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AnimateDirective } from "../directives/animate.directive";
import { LandingComponent } from "./landing/landing.component";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
      ],
    declarations: [
        RootContentComponent,

        TextInputDirective,
        AnimateDirective,

        NavbarComponent,
        
        LandingComponent,

        AboutUsComponent,
        
        WhyUsComponent,
        TestimonialComponent,

        ContactUsComponent,

        FooterComponent,
        
        OurServicesComponent,
        
        PortfolioComponent
    ],
    exports:[ RootContentComponent ]
})
export class ComponentsModule { }