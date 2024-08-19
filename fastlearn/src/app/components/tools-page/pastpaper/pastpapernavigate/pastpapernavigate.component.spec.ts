import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastpapernavigateComponent } from './pastpapernavigate.component';

describe('PastpapernavigateComponent', () => {
  let component: PastpapernavigateComponent;
  let fixture: ComponentFixture<PastpapernavigateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PastpapernavigateComponent]
    });
    fixture = TestBed.createComponent(PastpapernavigateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
