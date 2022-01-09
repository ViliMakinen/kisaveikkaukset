import { Injectable } from '@angular/core';
import { User } from './home/home.component';
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

// await setDoc(doc(usersRef, 'Aapo'), {
//       name: 'Aapo',
//       predictions: ['Chelsea'],
//     }),
//       await setDoc(doc(usersRef, 'Viltsu'), {
//         name: 'Viltsu',
//         predictions: ['Liverpool'],
//       }),
//       await setDoc(doc(usersRef, 'Elmo'), {
//         name: 'Elmo',
//         predictions: [],
//       })

const firebaseConfig = {
  apiKey: 'AIzaSyCaOwTsRzFIqNESTzdxOYiVY62KEUTWm_E',
  authDomain: 'kisaveikkaukset-7e8a6.firebaseapp.com',
  projectId: 'kisaveikkaukset-7e8a6',
  storageBucket: 'kisaveikkaukset-7e8a6.appspot.com',
  messagingSenderId: '794325472687',
  appId: '1:794325472687:web:a0dc37725c45b7f9170b5a'
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  app = initializeApp(firebaseConfig);
  db = getFirestore();

  async getUser(userName: string): Promise<User | null> {
    const docRef = doc(this.db, 'users', userName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:',
        docSnap.data());
      return docSnap.data() as User;
    } else {
      console.log('No such document!');
    }
    return null;
  }

  setUser(userName: string): void {
  }

  async updateUser(user: User) {
    const docRef = doc(this.db, 'users', user.name);
  }
}






