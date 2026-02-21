import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonMeterComponent } from './ion-meter.component';

describe('IonMeterComponent', () => {
  let component: IonMeterComponent;
  let fixture: ComponentFixture<IonMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonMeterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
