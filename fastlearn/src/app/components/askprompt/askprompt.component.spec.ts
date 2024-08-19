import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskpromptComponent } from './askprompt.component';

describe('AskpromptComponent', () => {
  let component: AskpromptComponent;
  let fixture: ComponentFixture<AskpromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskpromptComponent]
    });
    fixture = TestBed.createComponent(AskpromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
