import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commandedto } from 'src/app/models/CommandeDto';
import { Livraison } from 'src/app/models/Livraison';
import { LivraisonDto } from 'src/app/models/livraisonDto';

@Injectable({
  providedIn: 'root'
})
export class LivraisonserviceService {
  URL: string="http://localhost:9000/test/Delivite"
  constructor(private httpClient:HttpClient) { }

  getAllLivraison(): Observable<LivraisonDto[]> {
    console.log("methode");
    
    return this.httpClient.get<LivraisonDto[]>(this.URL+"/getAllLivraison");
  }
  getLivraison(ID:number): Observable<LivraisonDto[]> {
    return this.httpClient.get<LivraisonDto[]>(`${this.URL}/getlivraison/${ID}`);
  }
  deleteLivraison(ID : number){
    return this.httpClient.delete(`${this.URL}/deleteLivraison/${ID}`);
  }
}
