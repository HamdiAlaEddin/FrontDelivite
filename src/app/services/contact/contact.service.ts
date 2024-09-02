import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  URL: string="http://localhost:9000/test/Delivite"
  constructor(private httpClient:HttpClient) { }
  addContact(contactObj:any){
    console.log(contactObj)
    return this.httpClient.post(this.URL + "/addContact" ,contactObj.value);

  }
  getContact(){
    return this.httpClient.get<Contact[]>(this.URL+"/getconatct")
  }

  delete(id_contact :number){
    return this.httpClient.delete(`${this.URL}/deletecontact/${id_contact}`);

  }
}
