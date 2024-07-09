import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationInfoComponent } from './investigation-info.component';

describe('InvestigationInfoComponent', () => {
  let component: InvestigationInfoComponent;
  let fixture: ComponentFixture<InvestigationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestigationInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestigationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
