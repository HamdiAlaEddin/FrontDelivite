import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commandedto } from 'src/app/models/CommandeDto';
import { Livraison } from 'src/app/models/Livraison';

@Injectable({
  providedIn: 'root'
})
export class LivraisonserviceService {
  URL: string="http://localhost:9000/test/Delivite"
  constructor(private httpClient:HttpClient) { }

  getLivraison(): Observable<Commandedto[]> {
    return this.httpClient.get<Commandedto[]>(this.URL+"/getallCommande");
  }
}
