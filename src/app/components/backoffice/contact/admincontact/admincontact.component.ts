import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact/contact.service';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admincontact',
  templateUrl: './admincontact.component.html',
  styleUrls: ['./admincontact.component.css']
})
export class AdmincontactComponent {
  ContactTab: Contact[]=[];
  
  selectedFile: File | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private contactservice:ContactService,
    private clientservice:UserserviceService
  ){}
  logOut(){
    this.clientservice.logout();
    this.router.navigate(['/login']);
  }
  async ngOnInit(){
   
    this.getmessage()
     }
  
  
  getmessage(){
    this.contactservice.getContact().subscribe((response)=>{
      this.ContactTab=response;
      console.log(this.ContactTab);
      
    })
  }
  deleteContact(ID: number) {
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
        
        this.contactservice.delete(ID).subscribe((res)=>{
          console.log("Response from backend", res); 
          Swal.fire(
            'Deleted!',
            'Message has been deleted.',
            'success'
          );
          this.getmessage();
        });
      }
    });
  }
}
