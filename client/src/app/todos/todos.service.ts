import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponse, IUser } from '../auth.service';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private http = inject(HttpClient);

  list(){
   return this.http.get<IResponse<ITodo []>>(`${env.SERVER_URL_TODO}`)
  }

  add(todo: ITodo){
    return this.http.post<IResponse<ITodo>>(`${env.SERVER_URL_TODO}`, todo)
   }
 
   getById(todo_id: string){
    return this.http.get<IResponse<ITodo>>(`${env.SERVER_URL_TODO}/`+ todo_id)
   }

   update(todo: ITodo){
    return this.http.put<IResponse<ITodo>>(`${env.SERVER_URL_TODO}/`+ todo._id, todo)
   }
 
  

   delete(todo_id: string){
    return this.http.delete<IResponse<boolean>>(`${env.SERVER_URL_TODO}/`+ todo_id)
   }
}

export interface ITodo{
  _id:string,
  user_id: string,
  title: string,
  description: string,
  completed : boolean

}