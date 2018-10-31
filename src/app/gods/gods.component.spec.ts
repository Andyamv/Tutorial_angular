import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GodsComponent } from './gods.component';

describe('GodsComponent', () => {
  let component: GodsComponent;
  let fixture: ComponentFixture<GodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
