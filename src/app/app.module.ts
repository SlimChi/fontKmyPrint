import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-rooting.module";
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from "./pages/login/login.component";
import { PanierComponent } from './pages/panier/panier.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";
import {ManageUsersComponent} from "./admin/manage-users/manage-users.component";
import { ConfirmRegisterComponent } from './pages/confirm-register/confirm-register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {TokenInterceptor} from "./services/http-interceptor/token.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { ResponseResetPasswordComponent } from './pages/response-reset-password/response-reset-password.component';
import { AdressesComponent } from './pages/adresses/adresses.component';
import { UpdateAdresseComponent } from './pages/update-adresse/update-adresse.component';
import { AddAdresseComponent } from './pages/add-adresse/add-adresse.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PanierComponent,
    AdminDashboardComponent,
    ManageUsersComponent,
    ConfirmRegisterComponent,
    ProfileComponent,
    NavbarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ResponseResetPasswordComponent,
    AdressesComponent,
    UpdateAdresseComponent,
    AddAdresseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
