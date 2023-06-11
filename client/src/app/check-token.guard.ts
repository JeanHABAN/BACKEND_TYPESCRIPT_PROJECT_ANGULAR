import { CanActivateFn } from '@angular/router';
import { StateService } from './state.service';
import { inject } from '@angular/core';

export const checkTokenGuard: CanActivateFn = (route, state) => {
  const app_state = inject(StateService);
 return app_state.state()._id ? true:false;
  
};
