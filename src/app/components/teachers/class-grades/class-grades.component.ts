import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-grades',
  templateUrl: './class-grades.component.html',
  styleUrls: ['./class-grades.component.scss']
})
export class ClassGradesComponent implements OnInit {
  hideGrade!: boolean;
  showGarde!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
