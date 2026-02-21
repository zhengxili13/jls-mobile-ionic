import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistrePage } from './registre.page';

describe('RegistrePage', () => {
  let component: RegistrePage;
  let fixture: ComponentFixture<RegistrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
