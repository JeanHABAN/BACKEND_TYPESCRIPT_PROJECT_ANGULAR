import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, IToken, IUser } from './auth.service';
import { StateService } from './state.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  template: `
    <form [formGroup]="form" (ngSubmit)="go()">
      <input placeholder="email" formControlName="email"/>
      <input placeholder="password" type="password" formControlName="password"/>
      <button type="submit" [disabled]="form.invalid">Go</button>
    </form>
  `,
  styles: [
  ]
})
export class SigninComponent {

private authService = inject(AuthService);
private stateService = inject(StateService);
private router = inject(Router);
private notification = inject(ToastrService)

form = inject(FormBuilder).group({
  email:['jean@miu.edu',Validators.required],
  password:['123',Validators.required]
})


go(){
  this.authService.signin(this.form.value as IUser)
  .subscribe(response => {
    if(response.success){
      const decoded_token = jwtDecode(response.data) as IToken
    const  state ={
    ...decoded_token,
    jwt: response.data
   }
   this.stateService.state.set(state);
   localStorage.setItem('todoAppState', JSON.stringify(state))
   this.router.navigate(['', 'todos'])
   this.notification.success(`signin succesfully`)
    }else{
      
    }
  })
}
}
