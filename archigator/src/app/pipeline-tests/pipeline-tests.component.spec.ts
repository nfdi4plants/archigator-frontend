import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineTestsComponent } from './pipeline-tests.component';

describe('PipelineTestsComponent', () => {
  let component: PipelineTestsComponent;
  let fixture: ComponentFixture<PipelineTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineTestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
