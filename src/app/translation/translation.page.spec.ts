import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranslationPage } from './translation.page';

describe('TranslationPage', () => {
  let component: TranslationPage;
  let fixture: ComponentFixture<TranslationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
