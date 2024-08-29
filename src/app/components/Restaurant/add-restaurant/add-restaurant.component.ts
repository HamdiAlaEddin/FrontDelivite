import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {
  role: string = 'RESTO';
  selectedFile: File | null = null;
  router: any;
  restoform!: FormGroup;
  imageFile: File | null = null; 
  userID!:number;
  constructor(
    private formBuilder: FormBuilder,
    private restoservice:UserserviceService,
    private route: ActivatedRoute,
    private rt : Router
  ){}
  ngOnInit(){
  this.restoform = this.formBuilder.group({
    firstName:[""],
    lastName:[""],
    password:[""],
    address:[""],
   phoneNumber:[""],
    image:[""],
    preferredLanguage:[""],
    dateOfBirth:[""],
    location:[""],
    email:[""]
  })
  ;
  
}
logOut(){
  this.restoservice.logout();
  this.router.navigate(['/login']);
}
onFileSelected(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedFile = fileInput.files[0];
  }
}
addRestaurant() {
  if (this.restoform.valid && this.selectedFile) {
    const newResto: Restaurant = this.restoform.value as Restaurant;
    newResto.userID = this.userID; // Assurez-vous que userID est défini ailleurs si nécessaire

    // Assurez-vous que `selectedFile` est un objet de type File
    if (!(this.selectedFile instanceof File)) {
      console.error('Invalid file selected.');
      return;
    }

    // Appel du service pour ajouter l'utilisateur avec l'image
    this.restoservice.addRestaurantWithImage(
      newResto.firstName,
      newResto.lastName,
      newResto.password,
      newResto.address,
      newResto.phoneNumber,
      newResto.preferredLanguage,
      newResto.dateOfBirth,
      this.selectedFile, // Passez le fichier ici
      newResto.location,
      newResto.email
    ).subscribe({
      next: (response) => {
        // Afficher le toast après un ajout réussi
        this.Toast.fire({
          icon: 'success',
          title: 'Added successfully'
        });
        this.rt.navigate(['/getRestaurants']);
      },
      error: (error) => {
        console.error("Error adding Restaurant:", error); // Gestion des erreurs
        this.Toast.fire({
          icon: "error",
          title: "Failed to add Restaurant"
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
