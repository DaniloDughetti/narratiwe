import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

import * as chapter from './chapter';
import * as user from './user';
/*
export const blockChapter = chapter.blockChapter;
export const block = chapter.block;
*/

export const newUser = user.newUser;