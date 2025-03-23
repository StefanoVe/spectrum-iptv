import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodDetailsComponent } from './vod-details.component';

describe('VodDetailsComponent', () => {
  let component: VodDetailsComponent;
  let fixture: ComponentFixture<VodDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VodDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VodDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
