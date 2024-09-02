import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LivraisonDto } from 'src/app/models/livraisonDto';
import { User } from 'src/app/models/User';
import { LivraisonserviceService } from 'src/app/services/livraisonservice/livraisonservice.service';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehic',
  templateUrl: './vehic.component.html',
  styleUrls: ['./vehic.component.css']
})
export class VehicComponent {

  OrderTab: LivraisonDto[]=[];
  id_user!: number;


  constructor(
   
    private router: Router,
    private livser:LivraisonserviceService,
    private us:UserserviceService
  ){}

  async ngOnInit(){
            this.getOrderas(); 
            console.log(this.OrderTab);
                
}
logOut(){
  this.us.logout();
  this.router.navigate(['/login']);
}
getOrderas(){
  this.livser.getAllLivraison().subscribe(
    (data: LivraisonDto[]) => {
      this.OrderTab = data;
    },
    error => {
      console.error('Error fetching livraisons', error);
    }
  );
    
}
  updateLivraison(id: number) {
    // Implémentez la méthode pour mettre à jour une livraison
  }

  deleteLivraison(id: number) {
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
        
        this.livser.deleteLivraison(id).subscribe((res)=>{
          console.log("Response from backend", res); 
          Swal.fire(
            'Deleted!',
            'Order has been deleted.',
            'success'
          );
          this.getOrderas();
        });
      }
    });
  }
}

