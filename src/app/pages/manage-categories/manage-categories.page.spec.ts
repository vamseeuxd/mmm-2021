import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageCategoriesPage } from './manage-categories.page';

describe('ManageCategoriesPage', () => {
  let component: ManageCategoriesPage;
  let fixture: ComponentFixture<ManageCategoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCategoriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
