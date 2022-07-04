import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMainItemComponent } from '../add-main-item/add-main-item.component';

@Component({
  selector: 'app-not-found-grade',
  templateUrl: './not-found-grade.component.html',
  styleUrls: ['./not-found-grade.component.scss']
})
export class NotFoundGradeComponent implements OnInit {

  constructor(  public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  AddMainItem(lesson:any): void {
    const dialogRef = this.dialog.open(AddMainItemComponent, {

    });
}
}
