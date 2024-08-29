import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chauffeur } from 'src/app/models/Chauffeur';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addchauffeur',
  templateUrl: './addchauffeur.component.html',
  styleUrls: ['./addchauffeur.component.css']
})
export class AddchauffeurComponent {

  role: string = 'CHAUFFEUR';
  selectedFile: File | null = null;
  router: any;
  chauffeurform!: FormGroup;
  imageFile: File | null = null; 
  userID!:number;
  constructor(
    private formBuilder: FormBuilder,
    private userservice:UserserviceService,
    private route: ActivatedRoute,
    private rt : Router
  ){}
  ngOnInit(){
  this.chauffeurform = this.formBuilder.group({
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
    disponible:false,
    accepted: false,
    numPermisConduit: [""],
    userID:1
  })
  ;
  
}
logOut(){
  this.userservice.logout();
  this.router.navigate(['/login']);
}
onFileSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];
  }
}
addchauffeur() {
  if (this.chauffeurform.valid && this.selectedFile) {
    const newChauffeur: Chauffeur = this.chauffeurform.value as Chauffeur;
    newChauffeur.userID = this.userID; // Assurez-vous que userID est défini ailleurs si nécessaire

    // Assurez-vous que `selectedFile` est un objet de type File
    if (!(this.selectedFile instanceof File)) {
      console.error('Invalid file selected.');
      return;
    }

    // Appel du service pour ajouter l'utilisateur avec l'image
    this.userservice.addChauffeurWithImage(
      newChauffeur.firstName,
      newChauffeur.lastName,
      newChauffeur.password,
      newChauffeur.address,
      newChauffeur.phoneNumber,
      newChauffeur.preferredLanguage,
      newChauffeur.dateOfBirth,
      this.selectedFile, // Passez le fichier ici
      newChauffeur.location,
      newChauffeur.email,
      newChauffeur.numPermisConduit,
    ).subscribe({
      next: (response) => {
        // Afficher le toast après un ajout réussi
        this.Toast.fire({
          icon: 'success',
          title: 'Added successfully'
        });
        this.rt.navigate(['/getchauffeur']);
      },
      error: (error) => {
        console.error("Error adding chauffeur:", error); // Gestion des erreurs
        this.Toast.fire({
          icon: "error",
          title: "Failed to add Chauffeur"
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
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
  
}
