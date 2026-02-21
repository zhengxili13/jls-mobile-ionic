import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewproductPage } from './newproduct.page';

describe('NewproductPage', () => {
  let component: NewproductPage;
  let fixture: ComponentFixture<NewproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewproductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
