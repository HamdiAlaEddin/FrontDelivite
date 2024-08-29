import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/Admin';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  role: string = 'ADMIN';
  selectedFile: File | null = null;
  router: any;
  adminform!: FormGroup;
  imageFile: File | null = null; 
  userID!:number;
  constructor(
    private formBuilder: FormBuilder,
    private adminservice:UserserviceService,
    private route: ActivatedRoute,
    private rt : Router
  ){}
  ngOnInit(){
  this.adminform = this.formBuilder.group({
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
  this.adminservice.logout();
  this.router.navigate(['/login']);
}
addAdmin() {
  if (this.adminform.valid && this.selectedFile) {
    const newAdmin: Admin = this.adminform.value as Admin;
    newAdmin.userID = this.userID; // Assurez-vous que userID est défini ailleurs si nécessaire

    // Assurez-vous que `selectedFile` est un objet de type File
    if (!(this.selectedFile instanceof File)) {
      console.error('Invalid file selected.');
      return;
    }

    // Appel du service pour ajouter l'utilisateur avec l'image
    this.adminservice.addAdminWithImage(
      newAdmin.firstName,
      newAdmin.lastName,
      newAdmin.password,
      newAdmin.address,
      newAdmin.phoneNumber,
      newAdmin.preferredLanguage,
      newAdmin.dateOfBirth,
      this.selectedFile, // Passez le fichier ici
      newAdmin.location,
      newAdmin.email
    ).subscribe({
      next: (response) => {
        // Afficher le toast après un ajout réussi
        this.Toast.fire({
          icon: 'success',
          title: 'Added successfully'
        });
        this.rt.navigate(['/getAdmin']);
      },
      error: (error) => {
        console.error("Error adding admin:", error); // Gestion des erreurs
        this.Toast.fire({
          icon: "error",
          title: "Failed to add admin"
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
