import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ITodo, TodosService } from './todos.service';

@Component({
  selector: 'app-update',
  template: `
    <form [formGroup]="form" (ngSubmit)="go()">
      <input placeholder="title" formControlName="title"/>
      <textarea placeholder="description"  formControlName="description"></textarea>
      <input type="checkbox"  formControlName="completed"/>
      <button type="submit" [disabled]="form.invalid">Go</button>
    </form>
  `,
  styles: [
  ]
})
export class UpdateComponent {
  private todoService = inject(TodosService);
  private router = inject(Router)
  private notification = inject(ToastrService)
  //used to read params
  private activatedRoute = inject(ActivatedRoute)

  form = inject(FormBuilder).group({
    _id:'',
    title:['',Validators.required],
    description:['',Validators.required],
    completed:false
  })

  constructor(){
    //todo_id must be same as one for todos.module ({path:'update/:todo_id', component: UpdateComponent})
   const todoId = this.activatedRoute.snapshot.paramMap.get('todo_id');
   if(todoId){
    this.todoService.getById(todoId).subscribe(response => {
      const {_id, title, description, completed} = response.data
      this.form.get('_id') ?.patchValue(_id)
      this.form.get('title') ?.patchValue(title)
      this.form.get('description') ?.patchValue(description)
      this.form.get('completed') ?.patchValue(completed!)
    })
   }
  
  }
  go(){
    this.todoService.update(this.form.value as ITodo).
    subscribe(response => {
      if(response.success){
       if(response.data){
        this.notification.success('updated successfully');
        this.router.navigate(['','todos'])
       }else{
        this.notification.success('nothing to update');
        this.router.navigate(['','todos'])
       }
      }
    })
  }
}
