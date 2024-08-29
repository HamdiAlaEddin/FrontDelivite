import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/Admin';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-admin',
  templateUrl: './get-admin.component.html',
  styleUrls: ['./get-admin.component.css']
})
export class GetAdminComponent {
  admin:any=Admin;
  selectedFile: File | null = null;
  AdminTab:Admin[]=[];
  adm:any=Admin;

  constructor(
    private router: Router,
    private Adminservice:UserserviceService
  ){}
  ngOnInit(){
    console.log(this.AdminTab);
    this.getadmins();
  }
  
  getadmins(){
    this.Adminservice.getadmins().subscribe((response)=>{
      this.AdminTab = response;
      console.log(this.AdminTab);
    }, error => {
      console.error('Error fetching Admins', error);
    });
  }
  deleteAdmin(ID: number) {
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
        
        this.Adminservice.deleteUser(ID).subscribe((res)=>{
          console.log("Response from backend", res); 
          Swal.fire(
            'Deleted!',
            'Your client has been deleted.',
            'success'
          );
          this.getadmins();
        });
      }
    });
  }
  updateAdmin(Id: number) {
    this.Adminservice.getAdminById(Id).subscribe(
        (adm) => {
            if (typeof adm.dateOfBirth === 'string') {
                adm.dateOfBirth = new Date(adm.dateOfBirth);
            }

            // Extraire la date au format YYYY-MM-DD
            const dateOfBirthFormatted = adm.dateOfBirth.toISOString().split('T')[0];
            Swal.fire({
                title: 'Update Admin',
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
                    <input id="firstName" class="swal2-input custom-input" value="${adm.firstName}">
                    <input id="lastName" class="swal2-input custom-input" value="${adm.lastName}">
                    <input id="email" class="swal2-input custom-input" value="${adm.email}">
                    <input id="phoneNumber" class="swal2-input custom-input" value="${adm.phoneNumber}">
                    <input id="address" class="swal2-input custom-input" value="${adm.address}">
                    <input id="preferredLanguage" class="swal2-input custom-input" value="${adm.preferredLanguage}">
                    <input id="dateOfBirth" class="swal2-input custom-input" type="date" value="${dateOfBirthFormatted}">
                    <input id="location" class="swal2-input custom-input" value="${adm.location}">
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
                    // Mettre à jour l'admin
                    adm.address = address;
                    adm.firstName = firstName;
                    adm.lastName = lastName;
                    adm.email = email;
                    adm.phoneNumber = phoneNumber;
                    adm.preferredLanguage = preferredLanguage;
                    adm.dateOfBirth = dateOfBirthAsDate;
                    adm.location = location;

                    // Envoyer les données mises à jour au backend
                    return this.Adminservice.updateAdmin(adm).toPromise();
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Updated!',
                        'The Admin information has been updated.',
                        'success'
                    );
                    this.getadmins(); // Rafraîchir la liste des admins
                }
            }).catch((error) => {
                Swal.fire(
                    'Error!',
                    'There was an error updating the admin.',
                    'error'
                );
                console.error('Error updating admin:', error);
            });
        },
        (error) => {
            console.error('Error fetching admin details:', error);
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
