import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITodo, TodosService } from './todos.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add',
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
export class AddComponent {

  private todoService = inject(TodosService);
  private router = inject(Router)
  private notification = inject(ToastrService)

  form = inject(FormBuilder).group({
    title:['',Validators.required],
    description:['',Validators.required],
    completed:false
  })

  go(){
    this.todoService.add(this.form.value as ITodo).subscribe(response =>{
      if(response.success){
        this.notification.success('added successfully');
        this.router.navigate(['', 'todos'])
      }
    })
  }
}
