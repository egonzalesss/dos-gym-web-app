import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'dos-gym-web-app',
        appId: '1:1006903696405:web:68319c7840924a7935021c',
        storageBucket: 'dos-gym-web-app.firebasestorage.app',
        apiKey: 'AIzaSyBgs2iD2QJeziwv02ilmZ_i0S7WuoPPA4o',
        authDomain: 'dos-gym-web-app.firebaseapp.com',
        messagingSenderId: '1006903696405',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),
  ],
};
