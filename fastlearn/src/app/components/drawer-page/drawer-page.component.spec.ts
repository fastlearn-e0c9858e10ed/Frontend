import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerPageComponent } from './drawer-page.component';

describe('DrawerPageComponent', () => {
  let component: DrawerPageComponent;
  let fixture: ComponentFixture<DrawerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrawerPageComponent]
    });
    fixture = TestBed.createComponent(DrawerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
