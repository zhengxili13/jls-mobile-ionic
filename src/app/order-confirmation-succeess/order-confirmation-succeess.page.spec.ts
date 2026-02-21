import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderConfirmationSucceessPage } from './order-confirmation-succeess.page';

describe('OrderConfirmationSucceessPage', () => {
  let component: OrderConfirmationSucceessPage;
  let fixture: ComponentFixture<OrderConfirmationSucceessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderConfirmationSucceessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderConfirmationSucceessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
