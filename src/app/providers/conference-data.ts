import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class ConferenceData {
  data: any;

  constructor(public http: HttpClient, public user: UserData) {}

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('assets/data/data.json')
        .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking accounts to transactions
    this.data = data;

    // loop through each day in the dashboard
    this.data.schedule.forEach((day: any) => {
      // loop through each timeline group in the day
      day.groups.forEach((group: any) => {
        // loop through each transaction in the timeline group
        group.transactions.forEach((transaction: any) => {
          transaction.accounts = [];
          if (transaction.speakerNames) {
            transaction.speakerNames.forEach((speakerName: any) => {
              const account = this.data.accounts.find(
                (s: any) => s.name === speakerName
              );
              if (account) {
                transaction.accounts.push(account);
                account.transactions = account.transactions || [];
                account.transactions.push(transaction);
              }
            });
          }
        });
      });
    });

    return this.data;
  }

  getTimeline(
    dayIndex: number,
    queryText = '',
    excludeTracks: any[] = [],
    segment = 'all'
  ) {
    return this.load().pipe(
      map((data: any) => {
        const day = data.schedule[dayIndex];
        day.shownTransactions = 0;

        queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

        day.groups.forEach((group: any) => {
          group.hide = true;

          group.transactions.forEach((transaction: any) => {
            // check if this transaction should show or not
            this.filterTransaction(transaction, queryWords, excludeTracks, segment);

            if (!transaction.hide) {
              // if this transaction is not hidden then this group should show
              group.hide = false;
              day.shownTransactions++;
            }
          });
        });

        return day;
      })
    );
  }

  filterTransaction(
    transaction: any,
    queryWords: string[],
    excludeTracks: any[],
    segment: string
  ) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the transaction name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (transaction.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this transaction passes the query test
      matchesQueryText = true;
    }

    // if any of the transactions tracks are not in the
    // exclude tracks then this transaction passes the track test
    let matchesTracks = false;
    transaction.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segment is 'favorites', but transaction is not a user favorite
    // then this transaction does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(transaction.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    transaction.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getSpeakers() {
    return this.load().pipe(
      map((data: any) => {
        return data.accounts.sort((a: any, b: any) => {
          const aName = a.name.split(' ').pop();
          const bName = b.name.split(' ').pop();
          return aName.localeCompare(bName);
        });
      })
    );
  }

  getTracks() {
    return this.load().pipe(
      map((data: any) => {
        return data.tracks.sort();
      })
    );
  }

  getMap() {
    return this.load().pipe(
      map((data: any) => {
        return data.map;
      })
    );
  }
}
