import { Component, ElementRef, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';

import { darkStyle } from './statistics-dark-style';
import {StatisticsPageRoutingModule} from './statistics-routing.module';

@Component({
  selector: 'page-Statistics',
  templateUrl: 'statistics.html',
  styleUrls: ['./statistics.scss']
})
export class StatisticsPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public platform: Platform) {}

  async ngAfterViewInit() {
    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const googleMaps = await getGoogleMaps(
      'YOUR_API_KEY_HERE'
    );

    let statistics;

    this.confData.getMap().subscribe((mapData: any) => {
      const mapEle = this.mapElement.nativeElement;

      statistics = new googleMaps.Map(mapEle, {
        center: mapData.find((d: any) => d.center),
        zoom: 16,
        styles: style
      });

      mapData.forEach((markerData: any) => {
        const infoWindow = new googleMaps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`
        });

        const marker = new googleMaps.Marker({
          position: markerData,
          statistics,
          title: markerData.name
        });

        marker.addListener('click', () => {
          infoWindow.open(statistics, marker);
        });
      });

      googleMaps.event.addListenerOnce(statistics, 'idle', () => {
        mapEle.classList.add('show-statistics');
      });
    });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains('dark-theme');
          if (statistics && isDark) {
            statistics.setOptions({styles: darkStyle});
          } else if (statistics) {
            statistics.setOptions({styles: []});
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });
  }
}

function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}

