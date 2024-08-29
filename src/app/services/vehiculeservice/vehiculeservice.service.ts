import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicule } from 'src/app/models/Vehicule';

@Injectable({
  providedIn: 'root'
})
export class VehiculeserviceService {
URL: string="http://localhost:9000/test/Delivite"
  constructor(private httpClient:HttpClient) { }



  addVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.httpClient.post<Vehicule>(this.URL+"/addVehicule", vehicule);
  }
  getVehicles(): Observable<Vehicule[]> {
    return this.httpClient.get<Vehicule[]>(this.URL+"/getVehicule");
  }
  deletevehicule(ID : number){
    return this.httpClient.delete(`${this.URL}/deleteVehicule/${ID}`);
  }
  getVehiculeById(id: number): Observable<Vehicule> {
    return this.httpClient.get<Vehicule>(`${this.URL}/getVehicule/${id}`);
  }

  updateVehicule(vehicule: Vehicule): Observable<Vehicule> {
    return this.httpClient.put<Vehicule>(`${this.URL}/updateVehicule`, vehicule);
  }
}
