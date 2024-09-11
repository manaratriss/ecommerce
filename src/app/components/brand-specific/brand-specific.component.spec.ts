import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSpecificComponent } from './brand-specific.component';

describe('BrandSpecificComponent', () => {
  let component: BrandSpecificComponent;
  let fixture: ComponentFixture<BrandSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandSpecificComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
