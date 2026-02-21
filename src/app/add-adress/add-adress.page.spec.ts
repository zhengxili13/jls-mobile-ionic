import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAdressPage } from './add-adress.page';

describe('AddAdressPage', () => {
  let component: AddAdressPage;
  let fixture: ComponentFixture<AddAdressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAdressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
