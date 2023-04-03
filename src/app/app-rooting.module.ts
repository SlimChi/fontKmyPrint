import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {PanierComponent} from "./pages/panier/panier.component";
import {TokenGuardService} from "./services/guard/token-guard/token-guard.service";
import {AdminGuardService} from "./services/guard/admin-guard/admin-guard.service";
import {ManageUsersComponent} from "./admin/manage-users/manage-users.component";
import {ConfirmRegisterComponent} from "./pages/confirm-register/confirm-register.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";
import {ResponseResetPasswordComponent} from "./pages/response-reset-password/response-reset-password.component";
import {AdressesComponent} from "./pages/adresses/adresses.component";
import {UpdateAdresseComponent} from "./pages/update-adresse/update-adresse.component";
import {AddAdresseComponent} from "./pages/add-adresse/add-adresse.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'confirm-register', component: ConfirmRegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'response-password', component: ResponseResetPasswordComponent},


  {
    path: 'admin',
    canActivate: [AdminGuardService, TokenGuardService],
    children: [

      {path: 'adminDashboard', component: AdminDashboardComponent},
      {path: 'users', component: ManageUsersComponent},
      {
        path: '', redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'user',
    canActivate: [TokenGuardService],
    children: [

      {path: 'profile', component: ProfileComponent, canActivate: [TokenGuardService]},
      {path: 'panier', component: PanierComponent},
      {path: 'adresses', component: AdressesComponent},
      {path: 'update-adresse/:id', component: UpdateAdresseComponent},
      {path: 'add-adresse', component: AddAdresseComponent},
      {path: 'home', component: HomeComponent},
      {
        path: '', redirectTo: 'user/adresses',
        pathMatch: 'full'
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}