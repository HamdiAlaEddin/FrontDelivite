import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Commandedto } from 'src/app/models/CommandeDto';
import { Livraison } from 'src/app/models/Livraison';
import { LivraisonDto } from 'src/app/models/livraisonDto';
import { LivraisonserviceService } from 'src/app/services/livraisonservice/livraisonservice.service';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';

@Component({
  selector: 'app-get-livraison',
  templateUrl: './get-livraison.component.html',
  styleUrls: ['./get-livraison.component.css']
})
export class GetLivraisonComponent {
  OrderTab: LivraisonDto[]=[];
  id_user!: number;
  selectedFile: File | null = null;
  constructor(
   
    private router: Router,
    private livser:LivraisonserviceService,
    private us:UserserviceService
  ){}

  async ngOnInit(){
    const currentUser = await this.us.getCurrentUser();
    if (currentUser) {
        this.id_user = currentUser.userID;
        this.getOrders();
    } else {
        console.error('Unable to get current user');
    }
}

getOrders(){
    if (this.id_user) {
        this.livser.getLivraison(this.id_user).subscribe(
            response => {
                this.OrderTab = response;
                console.log(this.OrderTab);
            },
            error => {
                console.error('Error fetching orders', error);
            }
        );
    } else {
        console.error('User ID is undefined');
    }
}
 

  updateLivraison(id: number) {
    // Implémentez la méthode pour mettre à jour une livraison
  }

  deleteLivraison(id: number) {
   
  }
}
