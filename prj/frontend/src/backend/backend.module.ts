import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from './services/backend.service';



@NgModule({
  declarations: [],
  providers: [BackendService],
  imports: [
    CommonModule
  ]
})
export class BackendModule { }
