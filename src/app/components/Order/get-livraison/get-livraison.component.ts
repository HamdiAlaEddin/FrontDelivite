import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Commandedto } from 'src/app/models/CommandeDto';
import { Livraison } from 'src/app/models/Livraison';
import { LivraisonserviceService } from 'src/app/services/livraisonservice/livraisonservice.service';

@Component({
  selector: 'app-get-livraison',
  templateUrl: './get-livraison.component.html',
  styleUrls: ['./get-livraison.component.css']
})
export class GetLivraisonComponent {
  OrderTab: Commandedto[]=[];
  
  selectedFile: File | null = null;
  constructor(
   
    private router: Router,
    private livser:LivraisonserviceService
  ){}

  async ngOnInit(){
    this.getOrders() }
  
  
    getOrders(){
    this.livser.getLivraison().subscribe((response)=>{
      this.OrderTab=response;
      console.log(this.OrderTab);
      
    })
  }
  showLivraisonDetails(livraison: any) {
    // Implémentez la méthode pour afficher les détails de la livraison
  }

  updateLivraison(id: number) {
    // Implémentez la méthode pour mettre à jour une livraison
  }

  deleteLivraison(id: number) {
    // Implémentez la méthode pour supprimer une livraison
  }
}
