import { NgModule,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddclientComponent } from './components/client/addclient/addclient.component';
import { GetclientComponent } from './components/client/getclient/getclient.component';
import { HttpClientModule } from '@angular/common/http';
//import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
import { MatDialogModule } from '@angular/material/dialog';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { RoleComponent } from './components/login/role/role.component';
import { RegisterChauffeurComponent } from './components/login/register-chauffeur/register-chauffeur.component';
import { RegisterRestoComponent } from './components/login/register-resto/register-resto.component';
import { AdminComponent } from './components/backoffice/admin/admin.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { VehicComponent } from './components/backoffice/vehic/vehic.component';
import { HistorilogComponent } from './components/backoffice/historique/historilog/historilog.component';
import { AdmincontactComponent } from './components/backoffice/contact/admincontact/admincontact.component';

@NgModule({
  declarations: [
  AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    NotFoundComponent,
    AddclientComponent,
    GetclientComponent,
    GetchauffeursComponent,
    AddchauffeurComponent,
    AddVehiculeComponent,
    GetvehiculeComponent,
    GetAdminComponent,
    AddAdminComponent,
    GetRestoComponent,
    AddRestaurantComponent,
    GetLivraisonComponent,
    LoginFormComponent,
    ResetPasswordComponent,
    ResetPasswordComponent,
    RegisterFormComponent,
    RoleComponent,
    RegisterChauffeurComponent,
    RegisterRestoComponent,
  AdminComponent,
  VehicComponent,
  HistorilogComponent,
  AdmincontactComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatExpansionModule,
    SweetAlert2Module.forRoot(),
    RouterModule,
   
    
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
