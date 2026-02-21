import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubCategoryListPage } from './sub-category-list.page';

describe('SubCategoryListPage', () => {
  let component: SubCategoryListPage;
  let fixture: ComponentFixture<SubCategoryListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoryListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubCategoryListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
