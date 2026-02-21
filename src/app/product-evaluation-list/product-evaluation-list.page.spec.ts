import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductEvaluationListPage } from './product-evaluation-list.page';

describe('ProductEvaluationListPage', () => {
  let component: ProductEvaluationListPage;
  let fixture: ComponentFixture<ProductEvaluationListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEvaluationListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEvaluationListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
