import { Injectable,  signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  state = signal <IState>(initial_state_value)
}

export interface IState{
  _id: string,
  fullname: string,
  email: string,
  jwt: string
}

export const initial_state_value ={
  _id: '',
  fullname: '',
  email: '',
  jwt: ''
}