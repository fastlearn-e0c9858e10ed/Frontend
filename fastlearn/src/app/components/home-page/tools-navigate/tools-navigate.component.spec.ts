import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsNavigateComponent } from './tools-navigate.component';

describe('ToolsNavigateComponent', () => {
  let component: ToolsNavigateComponent;
  let fixture: ComponentFixture<ToolsNavigateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolsNavigateComponent]
    });
    fixture = TestBed.createComponent(ToolsNavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
