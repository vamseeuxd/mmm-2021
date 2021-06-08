import {Component} from '@angular/core';
import {ConferenceData} from '../../providers/conference-data';
import {Config, ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-manage-tax-expenses-for',
  templateUrl: './manage-expenses-for.page.html',
  styleUrls: ['./manage-expenses-for.page.scss'],
})
export class ManageExpensesForPage {

  ios: boolean;

  tracks: { name: string, icon: string, isChecked: boolean }[] = [];

  constructor(
    public confData: ConferenceData,
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
  }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;

    // passed in array of track names that should be excluded (unchecked)
    const excludedTrackNames = this.navParams.get('excludedTracks');

    this.confData.getTracks().subscribe((tracks: any[]) => {
      tracks.forEach(track => {
        this.tracks.push({
          name: track.name,
          icon: track.icon,
          isChecked: (excludedTrackNames.indexOf(track.name) === -1)
        });
      });
    });
  }

  selectAll(check: boolean) {
    // set all to checked or unchecked
    this.tracks.forEach(track => {
      track.isChecked = check;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }

}
