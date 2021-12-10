import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmKisatComponent } from './mm-kisat.component';

describe('MmKisatComponent', () => {
  let component: MmKisatComponent;
  let fixture: ComponentFixture<MmKisatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MmKisatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MmKisatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
