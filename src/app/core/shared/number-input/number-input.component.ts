import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss'
})
export class NumberInputComponent {
    @Input() value:number;
    @Output() valueChange = new EventEmitter<number>();

    increment() {
        this.value++;
        this.emitValue();
    }
    decrement() {
        if (this.value > 0) {
            this.value--;
            this.emitValue();
        }
    }
    private emitValue() {
        console.log("Changed emitValue()");
        this.valueChange.emit(this.value);
    }
}
