import {Injectable} from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {collectionData} from 'rxfire/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDRsu6s4hY7H837ZxpqOPEMM8rQBfoedEk',
  authDomain: 'monthly-money-manager-7c461.firebaseapp.com',
  projectId: 'monthly-money-manager-7c461',
  storageBucket: 'monthly-money-manager-7c461.appspot.com',
  messagingSenderId: '706023131609',
  appId: '1:706023131609:web:2dcc2a79da727f9c02f1c8',
  measurementId: 'G-EMZ3GBQ40T'
});

@Injectable({
  providedIn: 'root'
})
export class MmmFireService {

  chitfundsRef = app.firestore().collection('chitfunds');
  chitfunds$ = collectionData(this.chitfundsRef.where('deleted', '==', false));

  constructor() {
  }
}
