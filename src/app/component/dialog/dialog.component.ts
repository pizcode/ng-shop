import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
  }, private mdDialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  cancel() {
    this.close(false);
  }
  close(value) {
    this.mdDialogRef.close(value);
  }
  confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc")
  onEsc() {
    this.close(false);
  }

}
