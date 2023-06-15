import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinHeaderComponent } from './coin-header.component';

describe('CoinHeaderComponent', () => {
  let component: CoinHeaderComponent;
  let fixture: ComponentFixture<CoinHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoinHeaderComponent]
    });
    fixture = TestBed.createComponent(CoinHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
