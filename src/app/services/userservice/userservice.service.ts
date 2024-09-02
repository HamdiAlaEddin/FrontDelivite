import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Chauffeur } from 'src/app/models/Chauffeur';
import { Admin } from 'src/app/models/Admin';
import { Restaurant } from 'src/app/models/Restaurant';
import { LoginRequest, LoginResponse, User } from 'src/app/models/User';
import Swal from 'sweetalert2';
import { ResetPasswordComponent } from 'src/app/components/login/reset-password/reset-password.component';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  URL: string="http://localhost:9000/test/Delivite"

  constructor(private httpClient:HttpClient, private dialog: MatDialog) { }
  
//partie Client

  addUserWithImage(firstName: string, lastName: string, password: string, address: string, phoneNumber: string, preferredLanguage: string, dateOfBirth: any, imageFile: File, location: string, email: string) {     
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('phone_number', phoneNumber); // Assurez-vous que ce nom correspond à celui du backend
    formData.append('preferredLanguage', preferredLanguage);
    formData.append('image', imageFile); 
    formData.append('location', location);
    formData.append('email', email);

    const dob = new Date(dateOfBirth);
    if (!isNaN(dob.getTime())) {
      const formattedDate = dob.toISOString().split('T')[0]; // Format yyyy-MM-dd
      formData.append('date_of_birth', formattedDate); // Assurez-vous que ce nom correspond à celui du backend
    } else {
      throw new Error('Invalid date format for dateOfBirth');
    }

    return this.httpClient.post(`${this.URL}/addUser`, formData).pipe(
      tap(() => console.log('Utilisateur ajouté avec succès !')),
      catchError((error) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        return throwError(() => new Error('Erreur lors de l\'ajout de l\'utilisateur.'));
      })
    );
}



  getclients(){
    return this.httpClient.get<Client[]>(this.URL+"/getClients")
  }
 
  getUserById(clientID: number): Observable<Client> {
   
    return this.httpClient.get<Client>(`${this.URL}/getUser/${clientID}`);
  }

  updateClient(client: Client): Observable<Client> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.put<Client>(`${this.URL}/updateClient`, client, { headers });
  }
  deleteUser(ID : number){
    return this.httpClient.delete(`${this.URL}/deleteUser/${ID}`);
  }

  ///partie chauffeur
  getchauffeurs(){  return this.httpClient.get<Chauffeur[]>(this.URL+"/getChauffeurs")
  }
  getChaufById(ID: number): Observable<Chauffeur> {
   
    return this.httpClient.get<Chauffeur>(`${this.URL}/getUser/${ID}`);
  }
  addChauffeurWithImage(firstName: string, lastName: string, password: string, address: string, phoneNumber: string, preferredLanguage: string, dateOfBirth: any, imageFile: File, location: string, email: string,numPermisConduit:string) {     
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('phone_number', phoneNumber); // Assurez-vous que ce nom correspond à celui du backend
    formData.append('preferredLanguage', preferredLanguage);
    formData.append('image', imageFile); 
    formData.append('location', location);
    formData.append('email', email);
    formData.append('numPermisConduit', numPermisConduit);
    const dob = new Date(dateOfBirth);
    if (!isNaN(dob.getTime())) {
      const formattedDate = dob.toISOString().split('T')[0]; // Format yyyy-MM-dd
      formData.append('date_of_birth', formattedDate); // Assurez-vous que ce nom correspond à celui du backend
    } else {
      throw new Error('Invalid date format for dateOfBirth');
    }
  
    return this.httpClient.post(`${this.URL}/addChauffeur`, formData).pipe(
      tap(() => console.log('Chauffeur ajouté avec succès !')),
      catchError((error) => {
        console.error('Erreur lors de l\'ajout du Chauffeur :', error);
        return throwError(() => new Error('Erreur lors de l\'ajout du Chauffeur.'));
      })
    );
  }
  updateChauf(chauff: Chauffeur): Observable<Chauffeur> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.put<Chauffeur>(`${this.URL}/updateChauffeur`, chauff, { headers });
  }
  //////PARTIE ADMIN
  getadmins(){  return this.httpClient.get<Admin[]>(this.URL+"/getAdmins")
  }

  getAdminById(ID: number): Observable<Admin> {
    return this.httpClient.get<Admin>(`${this.URL}/getUser/${ID}`);
  }
  addAdminWithImage(firstName: string, lastName: string, password: string, address: string, phoneNumber: string, preferredLanguage: string, dateOfBirth: any, imageFile: File, location: string, email: string) {     
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('phone_number', phoneNumber); // Assurez-vous que ce nom correspond à celui du backend
    formData.append('preferredLanguage', preferredLanguage);
    formData.append('image', imageFile); 
    formData.append('location', location);
    formData.append('email', email);

    const dob = new Date(dateOfBirth);
    if (!isNaN(dob.getTime())) {
      const formattedDate = dob.toISOString().split('T')[0]; // Format yyyy-MM-dd
      formData.append('date_of_birth', formattedDate); // Assurez-vous que ce nom correspond à celui du backend
    } else {
      throw new Error('Invalid date format for dateOfBirth');
    }

    return this.httpClient.post(`${this.URL}/addAdmin`, formData).pipe(
      tap(() => console.log('Admin ajouté avec succès !')),
      catchError((error) => {
        console.error('Erreur lors de l\'ajout de l\'admin :', error);
        return throwError(() => new Error('Erreur lors de l\'ajout de l\'admin.'));
      })
    );
}
updateAdmin(admin: Admin): Observable<Admin> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.httpClient.put<Admin>(`${this.URL}/updateAdmin`, admin, { headers });
}
//////////PARTIE RESTO

getRestos(){  return this.httpClient.get<Restaurant[]>(this.URL+"/getRestaurants")
}

getRestoById(ID: number): Observable<Restaurant> {
  return this.httpClient.get<Restaurant>(`${this.URL}/getUser/${ID}`);
}
addRestaurantWithImage(firstName: string, lastName: string, password: string, address: string, phoneNumber: string, preferredLanguage: string, dateOfBirth: any, imageFile: File, location: string, email: string) {     
  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('password', password);
  formData.append('address', address);
  formData.append('phone_number', phoneNumber); // Assurez-vous que ce nom correspond à celui du backend
  formData.append('preferredLanguage', preferredLanguage);
  formData.append('image', imageFile); 
  formData.append('location', location);
  formData.append('email', email);

  const dob = new Date(dateOfBirth);
  if (!isNaN(dob.getTime())) {
    const formattedDate = dob.toISOString().split('T')[0]; // Format yyyy-MM-dd
    formData.append('date_of_birth', formattedDate); // Assurez-vous que ce nom correspond à celui du backend
  } else {
    throw new Error('Invalid date format for dateOfBirth');
  }

  return this.httpClient.post(`${this.URL}/addRestaurant`, formData).pipe(
    tap(() => console.log('Utilisateur ajouté avec succès !')),
    catchError((error) => {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
      return throwError(() => new Error('Erreur lors de l\'ajout de l\'utilisateur.'));
    })
  );
}
updateRestaurant(rs: Restaurant): Observable<Restaurant> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  return this.httpClient.put<Restaurant>(`${this.URL}/updateRestaurant`, rs, { headers });
}
acceptChauffeur(id: number): Observable<any> {
  return this.httpClient.put(`${this.URL}/accept-chauffeur/${id}`, {});
}
/////////////////////////////////////////////
/////////////////////////////////////////////
async getCurrentUser(): Promise<User | undefined> {
  if (this.isLoggedIn()) {
    try {
        const token = sessionStorage.getItem('token');
        console.log('Token retrieved:', token);
        if (!token) {
            throw new Error('Token is missing');
        }

        // Envoyer la requête POST avec le payload approprié
        const response = await this.httpClient.post<any>(this.URL + "/getbytoken", { token }).toPromise();
        console.log('Response received:', response);
        return response;
    } catch (error) {
        console.log('Error during getCurrentUser:', error);
        if (error instanceof HttpErrorResponse && error.status === 403) {
            this.logout();
        }
        return undefined;
    }
}
return undefined;
}

getToken(){
  return localStorage.getItem('token');
}

setToken(token: string){
  localStorage.setItem('token',token);
}

isLoggedIn(): boolean {
  return !!sessionStorage.getItem('token');
}

logout(){
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');
}

forgetPassword(email: string){
  console.log(email);
  
  this.httpClient.post<any>(this.URL + "/resetpasswordrequest", email).subscribe({
    next: Response => {
      console.log(Response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        showConfirmButton: false,
        timer: 700
      });
    },
    error: Response => console.log(Response)
  });
}

resetPassword(token: string, password: string){
  const body = { token: token, password: password };
  this.httpClient.post<any>(this.URL + "/resetpassword", body).subscribe({
    next: Response => {
      console.log(Response)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Password reset successfully.",
        showConfirmButton: false,
        timer: 1500
      });
      this.dialog.closeAll();
    },
    error: Response => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500
      });
      console.log(Response)
    }
  });
}
login(loginRequest: LoginRequest): Observable<LoginResponse> {
  return this.httpClient.post<LoginResponse>(`${this.URL}/authenticate_user`, loginRequest)
    .pipe(
      catchError(this.handleError)
    );
}
private handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'An unknown error occurred!';
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred
    errorMessage = `Client-side error: ${error.error.message}`;
  } else {
    // The backend returned an unsuccessful response code
    errorMessage = `Server-side error: ${error.status} ${error.message}`;
  }
  return throwError(errorMessage);
}
// login(username: string, password: string) {
//   const body = { username: username, password: password };
//   return this.httpClient.post<any>(this.URL + "/authenticate_user", body).pipe(
//       tap(response => {
//         if(response.status == 200){
//           localStorage.setItem('token', response.token);
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             showConfirmButton: false,
//             timer: 1500
//           });
//           this.dialog.closeAll();
//         }else{
//           Swal.fire({
//             position: "top-end",
//             icon: "error",
//             title: "Wrong email or password",
//             showConfirmButton: false,
//             timer: 1500
//           });
//           throw new Error(response.message);
//         }
//       })
//     );
// }

register(firstName: string,
         lastName: string,
         email: string,
         password: string,
         role: "CLIENT",
         isAdmin: boolean,
         
        ){
  const body = {
    id: 0,firstName, lastName, email, password, role
  }
  return this.httpClient.post<any>(this.URL + "/register_user", body).pipe(
    tap(response => {
      if(response.status == 201){
        console.log("is admin: " + isAdmin);
        
        if(isAdmin){
          this.dialog.closeAll();
          return;
        }
        localStorage.setItem('token', response.token);
      }else{
        throw new Error(response.message);
      }
    }));
  }

  getAllUsers(){
    return this.httpClient.get<User[]>(this.URL + "/getAllUsers");
  }

  adminResetPassword(id : number){
    this.httpClient.post<any>(this.URL + "/admin/resetpassword", id).subscribe({
      next: res => {
        console.log(res);
        this.dialog.open(ResetPasswordComponent, {
          width: '550px',
          disableClose: false,
          data: { token: res.token }
        });
      },
      error: res => console.log(res)    
    });
  }
  adminDeleteUser(id: number){
    return this.httpClient.delete(this.URL + "/admin/delete_user/" + id);
  }

  async getAdminDetails() : Promise<string>{
    let name = "";
    const response = await this.httpClient.post<any>(this.URL + "/admin/getbytoken",this.getToken()).toPromise();
    name = response.name;
    return name;
  }
}

