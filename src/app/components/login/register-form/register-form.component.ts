import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  role: string = 'CLIENT';
  selectedFile: File | null = null;
  isAdmin: boolean = false;
  registerForm!: FormGroup;
  userID!:number;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private us : UserserviceService,private router: Router,private formBuilder: FormBuilder){
    if(data && data.isAdmin){
      this.isAdmin = true;
      console.log(this.isAdmin);
      
    }
  }
  
  ngOnInit(){
    this.registerForm = this.formBuilder.group({
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
  
  
  register() {
    if (this.registerForm.valid && this.selectedFile) {
      const newClient: Client = this.registerForm.value as Client;
      newClient.userID = this.userID; // Assurez-vous que userID est défini ailleurs si nécessaire
  
      // Assurez-vous que `selectedFile` est un objet de type File
      if (!(this.selectedFile instanceof File)) {
        console.error('Invalid file selected.');
        return;
      }
  
      // Appel du service pour ajouter l'utilisateur avec l'image
      this.us.addUserWithImage(
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


  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
}
