import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbonnementList } from './abonnement-list';

describe('AbonnementList', () => {
  let component: AbonnementList;
  let fixture: ComponentFixture<AbonnementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbonnementList],
    }).compileComponents();

    fixture = TestBed.createComponent(AbonnementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
