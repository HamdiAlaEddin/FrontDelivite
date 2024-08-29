import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-resto',
  templateUrl: './get-resto.component.html',
  styleUrls: ['./get-resto.component.css']
})
export class GetRestoComponent {
  resto:any=Restaurant;
  selectedFile: File | null = null;
  RestoTab:Restaurant[]=[];
  res:any=Restaurant;

  constructor(
    private router: Router,
    private Restoservice:UserserviceService
  ){}
  ngOnInit(){
    console.log(this.RestoTab);
    this.getRestos();
  }
  
  getRestos(){
    this.Restoservice.getRestos().subscribe((response)=>{
      this.RestoTab = response;
      console.log(this.RestoTab);
    }, error => {
      console.error('Error fetching Restaurants', error);
    });
  }
  deleteResto(ID: number) {
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
        
        this.Restoservice.deleteUser(ID).subscribe((res)=>{
          console.log("Response from backend", res); 
          Swal.fire(
            'Deleted!',
            'Restaurant has been deleted.',
            'success'
          );
          this.getRestos();
        });
      }
    });
  }
  logOut(){
    this.Restoservice.logout();
    this.router.navigate(['/login']);
  }
  updateResto(Id: number) {
    this.Restoservice.getRestoById(Id).subscribe(
        (rees) => {
          if (typeof rees.dateOfBirth === 'string') {
            rees.dateOfBirth = new Date(rees.dateOfBirth);
        }

        // Extraire la date au format YYYY-MM-DD
        const dateOfBirthFormatted = rees.dateOfBirth.toISOString().split('T')[0];
            Swal.fire({
                title: 'Update Restaurant',
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
                    <input id="firstName" class="swal2-input custom-input" value="${rees.firstName}">
                    <input id="lastName" class="swal2-input custom-input" value="${rees.lastName}">
                    <input id="email" class="swal2-input custom-input" value="${rees.email}">
                    <input id="phoneNumber" class="swal2-input custom-input" value="${rees.phoneNumber}">
                    <input id="address" class="swal2-input custom-input" value="${rees.address}">
                    <input id="preferredLanguage" class="swal2-input custom-input" value="${rees.preferredLanguage}">
  <input id="dateOfBirth" class="swal2-input custom-input" type="date" value="${dateOfBirthFormatted}">
                      <input id="location" class="swal2-input custom-input" value="${rees.location}">
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
                    rees.address = address;
                    rees.firstName = firstName;
                    rees.lastName = lastName;
                    rees.email = email;
                    rees.phoneNumber = phoneNumber;
                    rees.preferredLanguage = preferredLanguage;
                    rees.dateOfBirth = dateOfBirthAsDate;
                    rees.location = location;

                    // Envoyer les données mises à jour au backend
                    return this.Restoservice.updateRestaurant(rees).toPromise();
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Updated!',
                        'The Restaurant information has been updated.',
                        'success'
                    );
                    this.getRestos(); // Rafraîchir la liste des clients
                }
            }).catch((error) => {
                Swal.fire(
                    'Error!',
                    'There was an error updating the Restaurant.',
                    'error'
                );
                console.error('Error updating restaurant:', error);
            });
        },
        (error) => {
            console.error('Error fetching restaurant details:', error);
        }
    );
}

showCardDetails(f: any) {
  Swal.fire({
      title: `${f.firstName} ${f.lastName}`,
      html: `
          <p><strong>Phone Number:</strong> ${f.phoneNumber}</p>
          <p><strong>Email:</strong> ${f.email}</p>
          <p><strong>Address:</strong> ${f.address}</p>
          <p><strong>Preferred Language:</strong> ${f.preferredLanguage}</p>
          <p><strong>Date:</strong> ${f.dateOfBirth}</p>
      `,
      imageUrl: f.image ? f.image.imageURL : 'url/to/default/image.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
  });
}

}
