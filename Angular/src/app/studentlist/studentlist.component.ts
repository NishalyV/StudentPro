import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services/authentication.service';
import { TaskService } from '../_services/task.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentListComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  StudentForm: FormGroup;
  datas: any;
  users: any;
  EditForm: FormGroup;
  selecteddata: any;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private taskservice: TaskService) { }

  ngOnInit() {
    this.StudentForm = this.fb.group({
      studentName: ['', [Validators.required]],
      studentSubject:['',[Validators.required]],
      studentMark: ['', [Validators.required]]
    });

    this.EditForm = this.fb.group({
      studentName: ['', [Validators.required]],
      studentSubject:['',[Validators.required]],
      studentMark: ['', [Validators.required]]
    })

    this.getResult();
  }

  getResult(){
    this.taskservice.getResult().pipe(first()).subscribe(users => {
      this.datas=users;
    });
  }
  get f() { return this.StudentForm.controls; }
  get func() { return this.EditForm.controls; }
  
  addMark() {
    return this.taskservice.addMark(this.f.studentName.value,this.f.studentSubject.value, this.f.studentMark.value).subscribe(data => {
      this.users = data;
      console.log(data);
      this.closebutton.nativeElement.click();
      this.StudentForm.patchValue({
        studentName: '',
        studentSubject: '',
        studentMark: ''
      });
  console.log(this.closebutton.nativeElement.click());
      this.getResult();
    })
  }

  edit(data){
    console.log(data);
    this.selecteddata = data;
    console.log(this.selecteddata);
    this.EditForm.get("studentName").patchValue(this.selecteddata.studentName);
    this.EditForm.get("studentSubject").patchValue(this.selecteddata.studentSubject);
    this.EditForm.get("studentMark").patchValue(this.selecteddata.studentMark);
// return this.taskservice.getbyid(this.func.studentName.value, this.func.studentMark.value).subscribe(data=>{
//   this.users=data;
//   this.getResult();
// })
  }

  editMark(){
return this.taskservice.update(this.selecteddata.id,this.func.studentName.value,this.func.studentSubject.value, this.func.studentMark.value).subscribe(data=>{
  this.users=data;
  console.log(this.users)
  this.closebutton.nativeElement.click();
  console.log(this.closebutton.nativeElement.click());
  this.EditForm.patchValue({
    studentName: '',
    studentSubject: '',
    studentMark: ''
  });
  this.getResult();
})
  }

  delete(data){
return this.taskservice.delete(data).subscribe(data=>{
  this.users=data;
  this.getResult();
});
  }
}

