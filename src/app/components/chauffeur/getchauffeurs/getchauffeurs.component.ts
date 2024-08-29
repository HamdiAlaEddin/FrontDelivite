import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chauffeur } from 'src/app/models/Chauffeur';
import { Role } from 'src/app/models/Role';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-getchauffeurs',
  templateUrl: './getchauffeurs.component.html',
  styleUrls: ['./getchauffeurs.component.css']
})
export class GetchauffeursComponent {

  chauffeur:any=Chauffeur;
  selectedFile: File | null = null;
  ChauffeurTab:Chauffeur[]=[];
  chauf:any=Chauffeur;

  constructor(
    private router: Router,
    private chauffeurservice:UserserviceService
  ){}
  ngOnInit(){
    console.log(this.ChauffeurTab);
    this.getchauffeurs();
  }
  
  getchauffeurs(){
    this.chauffeurservice.getchauffeurs().subscribe((response)=>{
      this.ChauffeurTab = response;
      console.log(this.ChauffeurTab);
    }, error => {
      console.error('Error fetching chauffeurs', error);
    });
  }
  deleteChauffeur(s: number) {
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
        
        this.chauffeurservice.deleteUser(s).subscribe((res)=>{
          console.log("Response from backend", res); 
          Swal.fire(
            'Deleted!',
            'Your client has been deleted.',
            'success'
          );
          this.getchauffeurs();
        });
      }
    });
  }
  logOut(){
    this.chauffeurservice.logout();
    this.router.navigate(['/login']);
  }
  updateChauffeur(chaufId: number) {
    this.chauffeurservice.getChaufById(chaufId).subscribe(
      (chauf) => {
        if (typeof chauf.dateOfBirth === 'string') {
          chauf.dateOfBirth = new Date(chauf.dateOfBirth);
        }

        const dateOfBirthFormatted = chauf.dateOfBirth.toISOString().split('T')[0];
        Swal.fire({
          title: 'Update Chauffeur',
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
            <input id="firstName" class="swal2-input custom-input" value="${chauf.firstName}">
            <input id="lastName" class="swal2-input custom-input" value="${chauf.lastName}">
            <input id="email" class="swal2-input custom-input" value="${chauf.email}">
            <input id="phoneNumber" class="swal2-input custom-input" value="${chauf.phoneNumber}">
            <input id="address" class="swal2-input custom-input" value="${chauf.address}">
            <input id="preferredLanguage" class="swal2-input custom-input" value="${chauf.preferredLanguage}">
            <input id="dateOfBirth" class="swal2-input custom-input" type="date" value="${dateOfBirthFormatted}">
            <input id="location" class="swal2-input custom-input" value="${chauf.location}">
            <input id="numPermisConduit" class="swal2-input custom-input" value="${chauf.numPermisConduit}">
          `,
          focusConfirm: false,
          preConfirm: () => {
            const fir = (document.getElementById('firstName') as HTMLInputElement).value;
            const la = (document.getElementById('lastName') as HTMLInputElement).value;
            const em = (document.getElementById('email') as HTMLInputElement).value;
            const ph = (document.getElementById('phoneNumber') as HTMLInputElement).value;
            const ad = (document.getElementById('address') as HTMLInputElement).value;
            const pr = (document.getElementById('preferredLanguage') as HTMLInputElement).value;
            const dat = (document.getElementById('dateOfBirth') as HTMLInputElement).value;
            const loc = (document.getElementById('location') as HTMLInputElement).value;
            const numP = (document.getElementById('numPermisConduit') as HTMLInputElement).value;
            
            // Convertir la chaîne de date en objet Date
            const dateOfBirthAsDate = new Date(dat);
            
            // Mettre à jour le chauffeur
            chauf.firstName = fir;
            chauf.lastName = la;
            chauf.email = em;
            chauf.phoneNumber = ph;
            chauf.address = ad;
            chauf.preferredLanguage = pr;
            chauf.dateOfBirth = dateOfBirthAsDate;
            chauf.location = loc;
            chauf.numPermisConduit = numP;

            // Envoyer les données mises à jour au backend
            return this.chauffeurservice.updateChauf(chauf).toPromise();
          }
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Updated!',
              'The Driver information has been updated.',
              'success'
            );
            this.getchauffeurs(); // Rafraîchir la liste des chauffeurs
          }
        }).catch((error) => {
          Swal.fire(
            'Error!',
            'There was an error updating the Driver.',
            'error'
          );
          console.error('Error updating Driver:', error);
        });
      },
      (error) => {
        console.error('Error fetching driver details:', error);
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
  toggleAccepted(chauffeurId: number) {
    // Appeler le service pour obtenir les détails du chauffeur
    this.chauffeurservice.getChaufById(chauffeurId).subscribe(
        (chauffeur) => {
            const isAccepted = chauffeur.accepted;
            const action = isAccepted ? 'revoke' : 'accepte';
            const actionText = isAccepted ? 'revoke acceptance' : 'accept this chauffeur';
            const confirmButtonText = isAccepted ? 'Yes, revoke it!' : 'Yes, accept it!';

            Swal.fire({
                title: 'Are you sure?',
                text: `Do you want to ${actionText}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: confirmButtonText,
                cancelButtonText: 'No, cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.chauffeurservice.acceptChauffeur(chauffeurId).subscribe(
                        (response) => {
                            console.log('Chauffeur status changed', response);
                            Swal.fire(
                                ` ${action}d !`,
                                `The chauffeur has been ${action}d.`,
                                'success'
                            );
                            this.getchauffeurs(); // Rafraîchir la liste des chauffeurs
                        },
                        (error) => {
                            console.error('Error updating chauffeur status', error);
                        }
                    );
                }
            });
        },
        (error) => {
            console.error('Error fetching chauffeur details', error);
        }
    );
}



 }