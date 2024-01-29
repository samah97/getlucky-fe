import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrl: './list-errors.component.scss',
  standalone: true,
  imports: [NgFor, NgIf]
})
export class ListErrorsComponent {
  errorList: string[] = [];

  @Input() set errors(errorList: string[]) {
    console.log('IN ERRORS');
    console.log(errorList);
    this.errorList = errorList;
  }

  @Input() set errorMessage(errorMessage: string) {
    console.log('In Error Message');
    this.errorList = [];
    this.errorList.push(errorMessage);
  }
}
