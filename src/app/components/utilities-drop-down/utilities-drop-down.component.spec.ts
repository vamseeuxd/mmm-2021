import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UtilitiesDropDownComponent } from './utilities-drop-down.component';

describe('UtilitiesDropDownComponent', () => {
  let component: UtilitiesDropDownComponent;
  let fixture: ComponentFixture<UtilitiesDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilitiesDropDownComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilitiesDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
