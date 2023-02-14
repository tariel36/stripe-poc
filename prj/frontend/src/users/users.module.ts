import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInventoryComponent } from './user-inventory/user-inventory.component';
import { MaterialModule } from '../material/material.module';

const components = [UserInventoryComponent]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [...components]
})
export class UsersModule { }
