import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotedbComponent } from './notedb.component';

describe('NotedbComponent', () => {
  let component: NotedbComponent;
  let fixture: ComponentFixture<NotedbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotedbComponent]
    });
    fixture = TestBed.createComponent(NotedbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
