import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HandShapeEnum } from 'src/app/shared/enums/hand-shape.enum';
import { HandShape } from 'src/app/shared/interfaces/hand-shape.interface';

import { HandShapeComponent } from './hand-shape.component';

describe('HandShapeComponent', () => {
  let component: HandShapeComponent;
  let fixture: ComponentFixture<HandShapeComponent>;

  const mockHandShape: HandShape = {
    id: HandShapeEnum.Paper,
    name: 'Paper'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandShapeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HandShapeComponent);
    component = fixture.componentInstance;
    component.handShape = mockHandShape;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
