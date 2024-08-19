import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubjectComponent } from './addsubject.component';

describe('AddsubjectComponent', () => {
  let component: AddsubjectComponent;
  let fixture: ComponentFixture<AddsubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsubjectComponent]
    });
    fixture = TestBed.createComponent(AddsubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
