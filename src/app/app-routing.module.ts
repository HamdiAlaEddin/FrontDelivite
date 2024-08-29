import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { MapsComponent } from './components/maps/maps.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddclientComponent } from './components/client/addclient/addclient.component';
import { GetclientComponent } from './components/client/getclient/getclient.component';
import { GetchauffeursComponent } from './components/chauffeur/getchauffeurs/getchauffeurs.component';
import { AddchauffeurComponent } from './components/chauffeur/addchauffeur/addchauffeur.component';
import { AddVehiculeComponent } from './components/vehicule/add-vehicule/add-vehicule.component';
import { GetvehiculeComponent } from './components/vehicule/getvehicule/getvehicule.component';
import { GetAdminComponent } from './components/Admin/get-admin/get-admin.component';
import { AddAdminComponent } from './components/Admin/add-admin/add-admin.component';
import { GetRestoComponent } from './components/Restaurant/get-resto/get-resto.component';
import { AddRestaurantComponent } from './components/Restaurant/add-restaurant/add-restaurant.component';
import { GetLivraisonComponent } from './components/Order/get-livraison/get-livraison.component';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';

import { RegisterChauffeurComponent } from './components/login/register-chauffeur/register-chauffeur.component';
import { RegisterRestoComponent } from './components/login/register-resto/register-resto.component';
import { RoleComponent } from './components/login/role/role.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './components/backoffice/admin/admin.component';
import { StatisticComponent } from './components/backoffice/statistic/statistic.component';





const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'user',
    component: HomeComponent,
    canActivate: [AuthGuard], 
  },
  //{path:'user', component:HomeComponent},
  {path:'contact', component:ContactComponent},
  {path:'maps', component:MapsComponent},
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RoleComponent },
  { path: 'register-client', component: RegisterFormComponent },
  { path: 'register-chauffeur', component: RegisterChauffeurComponent },
  { path: 'register-resto', component: RegisterRestoComponent },
  {path:'admin/addClient', component:AddclientComponent},
  {path:'admin/Client', component:GetclientComponent},
  
  {path:'addChauffeur', component:AddchauffeurComponent},
  {path:'getchauffeur', component:GetchauffeursComponent},


  {path:'addAdmin', component:AddAdminComponent},
  {path:'getAdmin', component:GetAdminComponent},

  {path:'admin/addVehicule', component:AddVehiculeComponent},
  {path:'admin/getVehicule', component:GetvehiculeComponent},

  {path:'addRestaurant', component:AddRestaurantComponent},
  {path:'getRestaurants', component:GetRestoComponent},

  {path:'getOrders', component:GetLivraisonComponent},
//test pour l admin
//{path:'admin', component:AdminComponent},

{path:'admin/Clientstat', component:StatisticComponent},


  {path:'**', component:NotFoundComponent},

];



@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
