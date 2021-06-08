import {ModuleWithProviders, NgModule} from '@angular/core';
import {UtilitiesDropDownComponent} from './utilities-drop-down/utilities-drop-down.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [UtilitiesDropDownComponent],
  exports: [UtilitiesDropDownComponent],
  entryComponents: [UtilitiesDropDownComponent]
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders<ComponentsModule> {
    return {
      ngModule: ComponentsModule,
      providers: []
    };
  }
}
