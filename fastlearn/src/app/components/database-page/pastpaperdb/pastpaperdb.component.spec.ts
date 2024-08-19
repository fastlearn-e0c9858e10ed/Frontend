import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastpaperdbComponent } from './pastpaperdb.component';

describe('PastpaperdbComponent', () => {
  let component: PastpaperdbComponent;
  let fixture: ComponentFixture<PastpaperdbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PastpaperdbComponent]
    });
    fixture = TestBed.createComponent(PastpaperdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
