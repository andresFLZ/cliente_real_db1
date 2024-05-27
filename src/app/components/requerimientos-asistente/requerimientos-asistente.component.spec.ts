import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequerimientosAsistenteComponent } from './requerimientos-asistente.component';

describe('RequerimientosAsistenteComponent', () => {
  let component: RequerimientosAsistenteComponent;
  let fixture: ComponentFixture<RequerimientosAsistenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequerimientosAsistenteComponent]
    });
    fixture = TestBed.createComponent(RequerimientosAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
