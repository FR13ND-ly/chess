import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bishop } from '../models/pieces/bishop';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {

  @Input() black: boolean = false
  @Input() selected: boolean = false
  @Input() position: any = [null, null]
  @Input() piece: string = ''
  @Output() resolveMove = new EventEmitter()

  click() {
    // this.resolveMove.emit()
  }

  onEndDrag(e : any) {
    let previous = {
      i : e.previousContainer.element.nativeElement.dataset.i,
      j : e.previousContainer.element.nativeElement.dataset.j
    }
    let current = {
      i : e.container.element.nativeElement.dataset.i,
      j :e.container.element.nativeElement.dataset.j
    }
    let move = {
      type: 'drop',
      previous,
      current
    }
    this.resolveMove.emit(move)
  }

  getFieldColor() {
    return !!(Math.floor(this.position[0] % 2 + this.position[1] % 8) % 2)
  }
}
