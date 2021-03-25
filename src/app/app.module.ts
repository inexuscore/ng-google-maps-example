import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    ToastrModule.forRoot({
      preventDuplicates: false,
      progressBar: true,
      countDuplicates: true,
      extendedTimeOut: 3000,
      positionClass: 'toast-bottom-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
