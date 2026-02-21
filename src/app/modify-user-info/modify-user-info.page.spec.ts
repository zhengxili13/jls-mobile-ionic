import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyUserInfoPage } from './modify-user-info.page';

describe('ModifyUserInfoPage', () => {
  let component: ModifyUserInfoPage;
  let fixture: ComponentFixture<ModifyUserInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyUserInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyUserInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
