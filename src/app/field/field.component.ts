import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() lmp: boolean = false
  @Input() lmc: boolean = false
  @Input() available: boolean = false
  @Input() draggable: boolean = false
  @Output() resolveMove = new EventEmitter()
  @Output() startDrag = new EventEmitter()

  onEndDrag(e : any) {
    let pvContainerData = e.previousContainer.element.nativeElement.dataset
    let ctContainerData = e.container.element.nativeElement.dataset
    let previous = {
      i : parseInt(pvContainerData.i),
      j : parseInt(pvContainerData.j)
    }
    let current = {
      i : parseInt(ctContainerData.i),
      j : parseInt(ctContainerData.j)
    }
    let move = {
      // type: 'drop',
      previous,
      current
    }
    
    this.resolveMove.emit(move)
  }

  getFieldColor() {
    return !!(Math.floor(this.position[0] % 2 + this.position[1] % 8) % 2)
  }

  onStartDrag(e: any) {
    let el = e.source.dropContainer.element.nativeElement.dataset
    let pos = {
      i : parseInt(el.i),
      j : parseInt(el.j)
    }
    this.startDrag.emit(pos)
  }
}
