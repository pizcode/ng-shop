import { Component, OnInit } from '@angular/core';
import { alert } from './Alert';
import { AlertService } from './alert.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  template: '',
})
export class AlertComponent implements OnInit {

  constructor(private AS:AlertService,private _snackBar: MatSnackBar) { }

  alert:alert = {
    message:'',
    className:''
  };

  ngOnInit(): void {
    this.check();
  }

  check(){
    this.AS.getAlert().subscribe(data=>{
      this._snackBar.open(data.message, 'close',{
        duration: 3000
      });
    });
  }

}
