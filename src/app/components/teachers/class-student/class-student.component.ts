import { Component, OnInit } from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
@Component({
  selector: 'app-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.scss']
})
export class ClassStudentComponent implements OnInit {
  selected:any;
  constructor() { }

  ngOnInit(): void {
  }
  type(num:any) {
     console.log("nummmm",num)
  }
  select(item:any) {
    this.selected = item;
    console.log("selllllected",this.selected)
     };
  isActive(item:any) {
  return this.selected === item;
  }
}
