import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageExpensesForPage } from './manage-expenses-for.page';

describe('ManageTaxExpensesForPage', () => {
  let component: ManageExpensesForPage;
  let fixture: ComponentFixture<ManageExpensesForPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageExpensesForPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageExpensesForPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
