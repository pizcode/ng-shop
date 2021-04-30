import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogComponent } from './dialog/dialog.component';
import { DialogService } from './dialog/dialog.service';



@NgModule({
  imports:[
    MatDialogModule,
    MatButtonModule,
  ],
  exports:[  
    DialogComponent,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    CommonModule,
    MatCheckboxModule
  ],
  entryComponents: [DialogComponent],
  declarations: [
    DialogComponent
  ],
  providers: [DialogService]
})
export class ComponentModule { }
