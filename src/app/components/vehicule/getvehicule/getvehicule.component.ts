import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TypeVehicule } from 'src/app/models/typeVehicule';
import { Vehicule } from 'src/app/models/Vehicule';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import { VehiculeserviceService } from 'src/app/services/vehiculeservice/vehiculeservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-getvehicule',
  templateUrl: './getvehicule.component.html',
  styleUrls: ['./getvehicule.component.css']
})
export class GetvehiculeComponent {
  vehicules: Vehicule[] = [];
  vehiculea:any ;
  constructor(private vehicleService: VehiculeserviceService,private us : UserserviceService, private router : Router) { }
  ngOnInit(): void {
    this.loadVehicles();
  }
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(vehicles => {
      this.vehicules = vehicles;
    });
  }
  logOut(){
    this.us.logout();
    this.router.navigate(['/login']);
  }
  deleteVehicule(ID: number) {
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
        
        this.vehicleService.deletevehicule(ID).subscribe((res)=>{
          console.log("Response from backend", res); 
          Swal.fire(
            'Deleted!',
            'Vehicule has been deleted.',
            'success'
          );
          this.loadVehicles();
        });
      }
    });
  }
  updatVehicule(v: number) {
    this.vehicleService.getVehiculeById(v).subscribe(
      
      (selectedVehicule) => {
        this.vehiculea = selectedVehicule;
        console.log(this.vehiculea);

  
        if (this.vehiculea) {
          Swal.fire({
            title: 'Update Vehicule',
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
              <input id="marque" class="swal2-input custom-input" value="${this.vehiculea.marque}">
              <input id="modele" class="swal2-input custom-input" value="${this.vehiculea.modele}">
              <input id="immatriculation" class="swal2-input custom-input" value="${this.vehiculea.immatriculation}">
              <select id="type" class="swal2-input custom-input">
                <option value="Voiture" ${this.vehiculea.type === 'Voiture' ? 'selected' : ''}>Voiture</option>
                <option value="Camion" ${this.vehiculea.type === 'Camion' ? 'selected' : ''}>Camion</option>
                <option value="Moto" ${this.vehiculea.type === 'Moto' ? 'selected' : ''}>Moto</option>
              </select>
              <input id="couleur" class="swal2-input custom-input" value="${this.vehiculea.couleur}">
            `,
            focusConfirm: false,
            inputAttributes: {
              autocapitalize: 'off',
              autocorrect: 'off'
            },
            preConfirm: () => {
              const marque = (document.getElementById('marque') as HTMLInputElement).value;
              const modele = (document.getElementById('modele') as HTMLInputElement).value;
              const immatriculation = (document.getElementById('immatriculation') as HTMLInputElement).value;
              const type = (document.getElementById('type') as HTMLSelectElement).value;
              const couleur = (document.getElementById('couleur') as HTMLInputElement).value;
              // Mettre à jour le véhicule avec les nouvelles valeurs
              this.vehiculea.marque = marque;
              this.vehiculea.modele = modele;
              this.vehiculea.immatriculation = immatriculation;
              this.vehiculea.type = type as TypeVehicule;
              this.vehiculea.couleur = couleur;
              return this.vehicleService.updateVehicule(this.vehiculea).toPromise();
            }
          }).then((result: any) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Updated!',
                'Your vehicule has been updated.',
                'success'
              );
              this.loadVehicles(); // Rafraîchir la liste des véhicules
              this.vehiculea = null;
            }
          });
        }
      },
      (error) => {
        console.error('Error fetching vehicule details:', error);
      }
    );
  }
  
}
