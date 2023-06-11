import { Component, inject } from '@angular/core';
import { StateService, initial_state_value } from './state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
 <div *ngIf ="!stateService.state()._id; else welcome_and_signout">
   <button (click) ="signin()">Sign in</button>
   <button (click) ="signup()">Sign up</button>
 </div>
  <ng-template #welcome_and_signout>
    <p>welcome {{stateService.state().fullname}}</p>
    <button (click) ="signout()">logout</button>
</ng-template>
   <router-outlet/>
  `,
  styles: []
})
export class AppComponent {

  stateService = inject(StateService);
  private router = inject(Router);
  signin() { this.router.navigate(['','signin'])}
  signup() { this.router.navigate(['','signup'])}
  signout() { 
    this.stateService.state.set(initial_state_value);
    localStorage.clear();
    this.router.navigate(['','signin'])
  }

}
