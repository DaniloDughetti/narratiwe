import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


export const newUser = functions.auth.user().onCreate( event => {
    return admin.database().ref(`/users/${event.data.uid}`).update({
      isNew: true
    });
  });
