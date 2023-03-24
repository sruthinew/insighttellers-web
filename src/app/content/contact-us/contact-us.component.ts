import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactUsForm!: FormGroup

  constructor(
    private responsive: BreakpointObserver,
    private http: HttpClient
  ) { }

  isScreen: string = 'large'

  ngOnInit(): void {
    this.contactUsForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone_number: new FormControl(''),
      country: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required, Validators.minLength(30)])
    })

    this.responsive.observe([Breakpoints.Medium, Breakpoints.HandsetPortrait]).subscribe((res => {
      if (this.responsive.isMatched(Breakpoints.HandsetPortrait)) {
        this.isScreen = 'mobile'
      } else if (this.responsive.isMatched(Breakpoints.Medium)) {
        this.isScreen = 'medium'
      }
    }))
  }

  submitContactForm(): void {
    this.http.post('http://api.insighttellers.com/user/contact-us/submit/', this.contactUsForm.value)
    .subscribe((res: any) => {
      Toastify({
        text: res.message,
        duration: 3000,
        newWindow: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: (res.success) ? "#a8f0c6" : "#f7a7a3",
          borderLeft: (res.success) ? "5px solid #178344" : "5px solid #8f130c",
          borderRadius: "10px",
          padding: ".75rem 1rem",
          color: "black"
        }
      }).showToast();

      this.contactUsForm.reset()
    })
  }

}