import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseNavigateComponent } from './database-navigate.component';

describe('DatabaseNavigateComponent', () => {
  let component: DatabaseNavigateComponent;
  let fixture: ComponentFixture<DatabaseNavigateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseNavigateComponent]
    });
    fixture = TestBed.createComponent(DatabaseNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
