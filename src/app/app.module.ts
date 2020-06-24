import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalModule } from './rental/rental.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '../app/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { ManageModule } from './manage/manage.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalComponent } from './rental/rental.component';

const routes: Routes = [
  {path: '', redirectTo: "/rentals", pathMatch: "full"}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    RentalModule,
    AuthModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ManageModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
