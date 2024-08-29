import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeVehicule } from 'src/app/models/typeVehicule';
import { Vehicule } from 'src/app/models/Vehicule';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import { VehiculeserviceService } from 'src/app/services/vehiculeservice/vehiculeservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css']
})
export class AddVehiculeComponent {
  vehiculeForm: FormGroup;
  typeVehiculeOptions = Object.values(TypeVehicule);

  constructor(private fb: FormBuilder, private vehiculeService: VehiculeserviceService,private us : UserserviceService, private router : Router) {
    this.vehiculeForm = this.fb.group({
      marque: ['', Validators.required],
      modele: ['', Validators.required],
      immatriculation: ['', Validators.required],
      type: ['', Validators.required],
      couleur: ['']
    });
  }
  logOut(){
    this.us.logout();
    this.router.navigate(['/login']);
  }
  onSubmit(): void {
    if (this.vehiculeForm.valid) {
      const vehicule: Vehicule = this.vehiculeForm.value;
      this.vehiculeService.addVehicule(vehicule).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Véhicule ajouté avec succès',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
          // Réinitialiser le formulaire ou rediriger l'utilisateur
          this.vehiculeForm.reset();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du véhicule:', error);
          Swal.fire({
            icon: 'error',
            title: 'Échec de l\'ajout du véhicule',
            text: 'Une erreur est survenue lors de l\'ajout du véhicule.',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      });
    } else {
      console.error('Le formulaire est invalide.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur de validation',
        text: 'Veuillez vérifier que tous les champs sont remplis correctement.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
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

