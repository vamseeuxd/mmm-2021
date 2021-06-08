import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageTaxSavingSectionsPage } from './manage-tax-saving-sections.page';

describe('ManageTaxSavingSectionsPage', () => {
  let component: ManageTaxSavingSectionsPage;
  let fixture: ComponentFixture<ManageTaxSavingSectionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTaxSavingSectionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTaxSavingSectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
