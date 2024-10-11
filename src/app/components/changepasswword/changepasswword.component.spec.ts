import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswwordComponent } from './changepasswword.component';

describe('ChangepasswwordComponent', () => {
  let component: ChangepasswwordComponent;
  let fixture: ComponentFixture<ChangepasswwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangepasswwordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangepasswwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
