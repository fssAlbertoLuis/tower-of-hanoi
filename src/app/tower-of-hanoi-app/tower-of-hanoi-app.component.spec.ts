import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerOfHanoiAppComponent } from './tower-of-hanoi-app.component';

describe('TowerOfHanoiAppComponent', () => {
  let component: TowerOfHanoiAppComponent;
  let fixture: ComponentFixture<TowerOfHanoiAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TowerOfHanoiAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TowerOfHanoiAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
