import { Component, inject } from '@angular/core';
import { ITodo, TodosService } from './todos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  template: `
    <button (click)="goToAdd()">
    Add new todo</button>
    <p *ngFor="let todo of todos" [ngClass]="{completed: todo.completed}">
   {{todo.title}}
   <button (click)="deleteTodo(todo._id)">delete</button>
   <button (click)="goToEdit(todo._id)">
    update</button>
    </p>
  `,
  styles: [`
  .completed{
    text-decoration : line-through;
  }
  `
  ]
})
export class ListComponent {
private todoService = inject(TodosService);
private router = inject(Router)
private notification = inject(ToastrService)

todos : ITodo[]= []
constructor(){
  this.todoService.list().subscribe(response =>{
    this.todos = response.data;
  })
}

goToAdd(){ 
this.router.navigate(['','todos','add'])
}

deleteTodo(todo_id : string){
  this.todoService.delete(todo_id).subscribe(response => {
    if(response.success){
    this.todos =  this.todos.filter(todo => todo._id!==todo_id)
    this.notification.success(`deleted successfully`)
    }
  })
}

goToEdit(todo_id: string){
  this.router.navigate(['','todos','update', todo_id])
}
}
