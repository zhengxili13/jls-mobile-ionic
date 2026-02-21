import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistreSuccedPage } from './registre-succed.page';

describe('RegistreSuccedPage', () => {
  let component: RegistreSuccedPage;
  let fixture: ComponentFixture<RegistreSuccedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistreSuccedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistreSuccedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
