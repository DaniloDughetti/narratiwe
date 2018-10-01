# Narratiwe

<p align="center">
<img src="https://narratiwe.com/assets/images/text-logo.png" width="200">
</p>

Narratiwe it's an open source project created by Danilo Dughetti.
It wants to be a responsive web app for all writing enthusiasts: Anyone can easily write and read fantastic stories. You can choose to write a private story and publish it when ended or to create a shared story that is continued by anyone in the community.

The app is already running on `https://www.narratiwe.com`, let's add new feature and improve this codebase!


<p align="center">
<img src="https://narratiwe.com/assets/images/welcome-logo.png" height="400">
</p>

<p align="center">
<img src="https://narratiwe.com/assets/images/tour-2.png" width="800">
</p>


## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

First of all `npm install` to download dependencies then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Firebase configuration

In order to execute http calling to a backend you will have to create a Firebase application and edit `utils/firebaseconfig.ts` that is leaved blank for privacy reason.

So you have to sign in to a google account then create a firebase application, in the end create `utils/firebaseconfig.ts` and it will looks like:

```
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUT_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
  };

export const firebase = AngularFireModule.initializeApp(firebaseConfig)
```
