import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectShippingAdressPage } from './select-shipping-adress.page';

describe('SelectShippingAdressPage', () => {
  let component: SelectShippingAdressPage;
  let fixture: ComponentFixture<SelectShippingAdressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectShippingAdressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectShippingAdressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
