import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../_services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  isMessage = false;
  Message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }


  get f() { return this.loginForm.controls; }


  onSubmit() {
      this.submitted = true;

      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;

      this.loginService.login(this.loginForm.value)
          .subscribe(
           (response: any) => {
              if (response !== null) {
                
                  const token: string = (<any>response).token;
                  
                  this.router.navigate(['/search'], { relativeTo: this.route });
              }
              else {
                  console.log('Login invalid '+ response);
                  this.Message = 'Login invalid '+ response;
              }
            },
            (error: any) => {
                this.isMessage = true;
                this.Message = 'Invalid Username or Password';
                console.log('Login invalid' + error);
                this.loading = false;
            });
  }
}
