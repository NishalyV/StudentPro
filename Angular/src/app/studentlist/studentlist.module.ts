import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { StudentListRoutingModule } from './studentlist.routing.module';
import { StudentListComponent } from './studentlist.component';

@NgModule({
  imports: [
    CommonModule,
    StudentListRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [StudentListComponent]
})
export class StudentListModule { }