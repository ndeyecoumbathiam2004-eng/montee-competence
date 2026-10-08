import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EspaceAdherent } from './espace-adherent';

describe('EspaceAdherent', () => {
  let component: EspaceAdherent;
  let fixture: ComponentFixture<EspaceAdherent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspaceAdherent],
    }).compileComponents();

    fixture = TestBed.createComponent(EspaceAdherent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
