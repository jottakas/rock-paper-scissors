import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HAND_SHAPES } from '../../../../shared/enums/hand-shapes.enum';
import { HandShape } from '../../../../shared/interfaces/hand-shape.interface';

import { HandShapeComponent } from './hand-shape.component';

describe('HandShapeComponent', () => {
  let component: HandShapeComponent;
  let fixture: ComponentFixture<HandShapeComponent>;

  const mockHandShape: HandShape = {
    id: HAND_SHAPES.Rock,
    name: 'Rock'
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

  it('should display the rock shape', () => {
    const html = fixture.debugElement.query(By.css('i'))
    expect(html.classes['fa-hand-back-fist']).toBeTrue;
  });

  it('should display the paper shape', () => {
    const html = fixture.debugElement.query(By.css('i'))
    expect(html.classes['fa-hand']).toBeTrue;
  });

  it('should display the scissors shape', () => {
    const html = fixture.debugElement.query(By.css('i'))
    expect(html.classes['fa-hand-scissors']).toBeTrue;
  });
});
