import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-getclient',
  templateUrl: './getclient.component.html',
  styleUrls: ['./getclient.component.css']
})
export class GetclientComponent {

  ClientTab: Client[]=[];
  client:any=Client;
  selectedFile: File | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private clientservice:UserserviceService
  ){}
 
  logOut(){
    this.clientservice.logout();
    this.router.navigate(['/login']);
  }
 
  async ngOnInit(){
   
    this.getClients()
     }
  
  
  getClients(){
    this.clientservice.getclients().subscribe((response)=>{
      this.ClientTab=response;
      console.log(this.ClientTab);
      
    })
  }
  deleteClient(clientID: number) {
    Swal.fire({
      title: 'Are you sure ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.clientservice.deleteUser(clientID).subscribe((res)=>{
          console.log("Response from backend", res); 
          Swal.fire(
            'Deleted!',
            'Your client has been deleted.',
            'success'
          );
          this.getClients();
        });
      }
    });
  }
  
  updateClient(clientId: number) {
    this.clientservice.getUserById(clientId).subscribe(
        (clienta) => {
          if (typeof clienta.dateOfBirth === 'string') {
            clienta.dateOfBirth = new Date(clienta.dateOfBirth);
        }

        // Extraire la date au format YYYY-MM-DD
        const dateOfBirthFormatted = clienta.dateOfBirth.toISOString().split('T')[0];
            Swal.fire({
                title: 'Update Client',
                html: `
                    <style>
                        .custom-input {
                            border-radius: 4px;
                            border: 1px solid #ccc;
                            padding: 8px;
                            margin-bottom: 10px;
                            width: 70%;
                            box-sizing: border-box;
                        }
                    </style>
                    <input id="firstName" class="swal2-input custom-input" value="${clienta.firstName}">
                    <input id="lastName" class="swal2-input custom-input" value="${clienta.lastName}">
                    <input id="email" class="swal2-input custom-input" value="${clienta.email}">
                    <input id="phoneNumber" class="swal2-input custom-input" value="${clienta.phoneNumber}">
                    <input id="address" class="swal2-input custom-input" value="${clienta.address}">
                    <input id="preferredLanguage" class="swal2-input custom-input" value="${clienta.preferredLanguage}">
  <input id="dateOfBirth" class="swal2-input custom-input" type="date" value="${dateOfBirthFormatted}">
                      <input id="location" class="swal2-input custom-input" value="${clienta.location}">
                `,
                focusConfirm: false,
                preConfirm: () => {
                    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
                    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
                    const email = (document.getElementById('email') as HTMLInputElement).value;
                    const phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value;
                    const address = (document.getElementById('address') as HTMLInputElement).value;
                    const preferredLanguage = (document.getElementById('preferredLanguage') as HTMLInputElement).value;
                    const dateOfBirth = (document.getElementById('dateOfBirth') as HTMLInputElement).value;
                    const location = (document.getElementById('location') as HTMLInputElement).value;
                    
                    // Convertir la chaîne de date en objet Date
                    const dateOfBirthAsDate = new Date(dateOfBirth);
                    // Mettre à jour le client
                    clienta.address = address;
                    clienta.firstName = firstName;
                    clienta.lastName = lastName;
                    clienta.email = email;
                    clienta.phoneNumber = phoneNumber;
                    clienta.preferredLanguage = preferredLanguage;
                    clienta.dateOfBirth = dateOfBirthAsDate;
                    clienta.location = location;

                    // Envoyer les données mises à jour au backend
                    return this.clientservice.updateClient(clienta).toPromise();
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Updated!',
                        'The client information has been updated.',
                        'success'
                    );
                    this.getClients(); // Rafraîchir la liste des clients
                }
            }).catch((error) => {
                Swal.fire(
                    'Error!',
                    'There was an error updating the client.',
                    'error'
                );
                console.error('Error updating client:', error);
            });
        },
        (error) => {
            console.error('Error fetching client details:', error);
        }
    );
}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file || null;
  }
  
  showCardDetails(f: any) {
    Swal.fire({
        title: `${f.firstName} ${f.lastName}`,
        html: `
            <p><strong>Phone Number:</strong> ${f.phoneNumber}</p>
            <p><strong>Email:</strong> ${f.email}</p>
            <p><strong>Address:</strong> ${f.address}</p>
            <p><strong>Preferred Language:</strong> ${f.preferredLanguage}</p>
            <p><strong>Date of Birth:</strong> ${f.dateOfBirth}</p>
        `,
        imageUrl: f.image ? f.image.imageURL : 'url/to/default/image.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    });
  }
 }