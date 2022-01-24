import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app'
import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import { User } from './constants';


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
  currentUser: User | null = null
  loggedIn: boolean = false;

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  async getUser(userName: string): Promise<User | null> {
    const docRef = doc(this.db, 'users', userName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      this.currentUser = docSnap.data() as User;
      this.loggedIn = true;
      return docSnap.data() as User;
    } else {
      console.log(`No such document with username: ${userName} found.`);
      return null;
    }
  }

  async getUsers(): Promise<User[]> {
    return getDocs(collection(this.db, 'users'))
      .then((querySnapshot) => {
        return querySnapshot.docs
          .map((doc) => doc.data() as User);
      })
  }

  async updateUserPredictions(user: User): Promise<void> {
    const docRef = doc(this.db, 'users', user.name)
    return updateDoc(docRef, { predictions: user.predictions })
  }

  async updateUserPredictionsBackUp(user: User): Promise<void> {
    const docRef = doc(this.db, 'usersBackUp', user.name)
    return updateDoc(docRef, { predictions: user.predictions })
  }

  async createUsers() {
    // await setDoc(doc(this.db, 'usersBackUp', 'results'), {
    //   name: 'results',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: []
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    //  })
    // await setDoc(doc(this.db, 'usersBackUp', 'Aapo'), {
    //   name: 'Aapo',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: []
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    // })
    // await setDoc(doc(this.db, 'usersBackUp', 'Viltsu'), {
    //   name: 'Viltsu',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: ['Liverpool']
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    // })
    // await setDoc(doc(this.db, 'usersBackUp', 'Elmo'), {
    //   name: 'Elmo',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: ['Chelsea']
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    // })
    // await setDoc(doc(this.db, 'usersBackUp', 'Osku'), {
    //   name: 'Osku',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: []
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    // })
    // await setDoc(doc(this.db, 'usersBackUp', 'Eetu-Matti'), {
    //   name: 'Eetu-Matti',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: []
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    // })
    // await setDoc(doc(this.db, 'usersBackUp', 'Jukka'), {
    //   name: 'Jukka',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: []
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    // })
    // await setDoc(doc(this.db, 'usersBackUp', 'Petra'), {
    //   name: 'Petra',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: []
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    // })
    // await setDoc(doc(this.db, 'usersBackUp', 'Emmi'), {
    //   name: 'Emmi',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: []
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    // })
    // await setDoc(doc(this.db, 'usersBackUp', 'Aikku'), {
    //   name: 'Aikku',
    //   points: 0,
    //   predictions: [
    //     {
    //       tournament: 'Champions League',
    //       predictions: {
    //         oneRoundPredictions: []
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     },
    //     {
    //       tournament: 'NFL-playoffs',
    //       predictions: {
    //         nflBracket: {
    //           AFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }],
    //           NFCdivisionals: [
    //             {
    //               teams: [{
    //                 team: '',
    //                 seed: 0
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 },
    //               ]
    //             }, {
    //               teams: [{
    //                 team: '',
    //                 seed: 0,
    //               },
    //                 {
    //                   team: '',
    //                   seed: 0
    //                 }]
    //             }
    //           ],
    //           AFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           NFCchampionship: {
    //             teams: [{
    //               team: '',
    //               seed: 0,
    //             },
    //               {
    //                 team: '',
    //                 seed: 0
    //               }]
    //           },
    //           superbowlists: [{
    //             team: '',
    //             seed: 0
    //           }, {
    //             team: '',
    //             seed: 0
    //           }],
    //           winner: { team: '', seed: 0 }

    //         }
    //       },
    //       locked: false,
    //       tournamentPoints: 0
    //     }
    //   ]
    // })
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logOut(): void {
    this.loggedIn = false;
  }
}






