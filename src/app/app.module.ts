import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GodsComponent } from './gods/gods.component';

import { FormsModule } from '@angular/forms';
import { GodDetailComponent } from './god-detail/god-detail.component'; // <-- NgModel lives here
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { GodSearchComponent } from './god-search/god-search.component';

@NgModule({
  declarations: [
    AppComponent,
    GodsComponent,
    GodDetailComponent,
    MessagesComponent,
    DashboardComponent,
    GodSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
