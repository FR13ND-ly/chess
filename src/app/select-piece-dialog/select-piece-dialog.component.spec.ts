import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPieceDialogComponent } from './select-piece-dialog.component';

describe('SelectPieceDialogComponent', () => {
  let component: SelectPieceDialogComponent;
  let fixture: ComponentFixture<SelectPieceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectPieceDialogComponent]
    });
    fixture = TestBed.createComponent(SelectPieceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
