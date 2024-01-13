import { Component, Input } from '@angular/core';
import { Errors } from '../../../models/errors';
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

  @Input() set errors(errorList: Errors | null) {
    this.errorList = errorList ?
      Object.keys(errorList.errors || {}).map(
        (key) => `${key} ${errorList.errors[key]}`
      )
      : [];
  }

  @Input() set errorMessage(errorMessage: string) {
    this.errorList.push(errorMessage);
  }
}
