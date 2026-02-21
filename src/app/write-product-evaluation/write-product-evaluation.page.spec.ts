import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WriteProductEvaluationPage } from './write-product-evaluation.page';

describe('WriteProductEvaluationPage', () => {
  let component: WriteProductEvaluationPage;
  let fixture: ComponentFixture<WriteProductEvaluationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteProductEvaluationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WriteProductEvaluationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
