import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'app/models/User';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  User!: User;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: User,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {}
  ngOnInit(): void {
    if (this.data.id != null) this.isChange = true;
  }

  onHandleCancelClick(): void {
    this.dialogRef.close();
  }
}
