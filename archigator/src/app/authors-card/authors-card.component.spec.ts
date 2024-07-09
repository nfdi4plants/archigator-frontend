import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsCardComponent } from './authors-card.component';

describe('AuthorsCardComponent', () => {
  let component: AuthorsCardComponent;
  let fixture: ComponentFixture<AuthorsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
