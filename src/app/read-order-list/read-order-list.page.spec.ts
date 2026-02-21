import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReadOrderListPage } from './read-order-list.page';

describe('ReadOrderListPage', () => {
  let component: ReadOrderListPage;
  let fixture: ComponentFixture<ReadOrderListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOrderListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReadOrderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
