import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastpaperComponent } from './pastpaper.component';

describe('PastpaperComponent', () => {
  let component: PastpaperComponent;
  let fixture: ComponentFixture<PastpaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PastpaperComponent]
    });
    fixture = TestBed.createComponent(PastpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
