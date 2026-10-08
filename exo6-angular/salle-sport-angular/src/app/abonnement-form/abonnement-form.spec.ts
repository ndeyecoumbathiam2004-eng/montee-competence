import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbonnementForm } from './abonnement-form';

describe('AbonnementForm', () => {
  let component: AbonnementForm;
  let fixture: ComponentFixture<AbonnementForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AbonnementForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
