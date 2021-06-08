import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-utilities-drop-down',
  templateUrl: './utilities-drop-down.component.html',
  styleUrls: ['./utilities-drop-down.component.scss'],
})
export class UtilitiesDropDownComponent implements OnInit {

  constructor(
    public popoverController: PopoverController,
  ) {
  }

  ngOnInit() {
  }

  async dismissPopover(role) {
    await this.popoverController.dismiss({}, role);
  }
}
