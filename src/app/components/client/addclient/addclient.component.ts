import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addcl',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent {
  role: string = 'CLIENT';
  selectedFile: File | null = null;
  router: any;
  clientform!: FormGroup;
  imageFile: File | null = null; 
  userID!:number;
  constructor(
    private formBuilder: FormBuilder,
    private userservice:UserserviceService,
    private route: ActivatedRoute,
    private rt : Router
  ){}
  ngOnInit(){
  this.clientform = this.formBuilder.group({
    firstName:[""],
    lastName:[""],
    password:[""],
    address:[""],
   phoneNumber:[""],
    image:[""],
    preferredLanguage:[""],
    dateOfBirth:[""],
    location:[""],
    email:[""],
    deliveriesCount:0,
    lastQuarterlyDiscountDate: null,
    userID:1
  })
  ;
  
}
onFileSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];
  }
}
logOut(){
  this.userservice.logout();
  this.router.navigate(['/login']);
}
addClient() {
  if (this.clientform.valid && this.selectedFile) {
    const newClient: Client = this.clientform.value as Client;
    newClient.userID = this.userID; // Assurez-vous que userID est défini ailleurs si nécessaire

    // Assurez-vous que `selectedFile` est un objet de type File
    if (!(this.selectedFile instanceof File)) {
      console.error('Invalid file selected.');
      return;
    }

    // Appel du service pour ajouter l'utilisateur avec l'image
    this.userservice.addUserWithImage(
      newClient.firstName,
      newClient.lastName,
      newClient.password,
      newClient.address,
      newClient.phoneNumber,
      newClient.preferredLanguage,
      newClient.dateOfBirth,
      this.selectedFile, // Passez le fichier ici
      newClient.location,
      newClient.email
    ).subscribe({
      next: (response) => {
        // Afficher le toast après un ajout réussi
        this.Toast.fire({
          icon: 'success',
          title: 'Added successfully'
        });
        this.rt.navigate(['/getclient']);
      },
      error: (error) => {
        console.error("Error adding client:", error); // Gestion des erreurs
        this.Toast.fire({
          icon: "error",
          title: "Failed to add client"
        });
      }
    });
  } else {
    console.error('Form is invalid or file is missing.');
    this.Toast.fire({
      icon: "error",
      title: "Form is invalid or file is missing"
    });
  }
}

    Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 7000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  
}
