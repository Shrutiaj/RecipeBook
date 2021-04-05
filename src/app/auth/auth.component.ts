import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  
  userForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    if(!this.userForm.valid){
      return;
    }
    
    const email = this.userForm.get('email').value;
    const password = this.userForm.get('password').value;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLoginMode){
      authObs = this.authService.signIn(email, password);
    }
    else{
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.userForm.reset();
  }

  onHandleError(){
    this.error = null;  
  }

}
