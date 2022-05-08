import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoSectionComponent } from './dashboard.component';

describe('CryptoSectionComponent', () => {
  let component: CryptoSectionComponent;
  let fixture: ComponentFixture<CryptoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
