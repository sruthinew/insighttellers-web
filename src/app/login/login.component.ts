import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import Toastify from 'toastify-js';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  userRegisterForm!: FormGroup
  passwordVisible: boolean = false
  toast: any

  isMobile: boolean = false

  formTypeSelected: boolean = false
  isRespondentForm: boolean = false

  constructor(
    private responsive: BreakpointObserver,
    private http: HttpClient,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.userRegisterForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    })

    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe(res => {
      if (res.matches) {
        this.isMobile = !this.isMobile
      }
    })
  }

  registerUser(): void {
    let headers: HttpHeaders = new HttpHeaders({
      'AppKey': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJkamFuZ28taW5zZWN1cmUtamV4bWJsempsMiopJSo1dTdvPShwMW53aTYrdUAlMmJ3KWRva3h2OHEwX2hmcDBpYiUiLCJjbGllbnQiOiJpbnNpZ2h0dGVsbGVycy13ZWIifQ.dvQsbouCsntUr0VR2NY9OTJeYkKHt2cZwfvtJujAyLs'
    })

    this.http.post('http://api.insighttellers.com/respondent/', this.userRegisterForm.value, { headers: headers })
      .pipe(
        map((data: any) => data),
        catchError((error) => of(error))
      )
      .subscribe((res) => {
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
      })
  }

  googleRedirect(): void {
    window.open('http://api.insighttellers.com/respondent/signin/google/login/', '_blank', 'width=800,height=600')
  }

  navigateToPanel(): void {
    this.route.navigate(['join-our-panel'])
  }
}
