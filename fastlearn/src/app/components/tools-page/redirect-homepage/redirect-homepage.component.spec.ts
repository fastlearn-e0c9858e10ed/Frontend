import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectHomepageComponent } from './redirect-homepage.component';

describe('RedirectHomepageComponent', () => {
  let component: RedirectHomepageComponent;
  let fixture: ComponentFixture<RedirectHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RedirectHomepageComponent]
    });
    fixture = TestBed.createComponent(RedirectHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
