import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxFormatters } from './ngx-formatters';

describe('NgxFormatters', () => {
  let component: NgxFormatters;
  let fixture: ComponentFixture<NgxFormatters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxFormatters],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxFormatters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
