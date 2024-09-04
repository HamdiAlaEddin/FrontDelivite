import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restoclient',
  templateUrl: './restoclient.component.html',
  styleUrls: ['./restoclient.component.css']
})
export class RestoclientComponent {
  resto:any=Restaurant;
  selectedFile: File | null = null;
  RestoTab:Restaurant[]=[];
  res:any=Restaurant;

  constructor(
    private router: Router,
    private Restoservice:UserserviceService
  ){}
  ngOnInit(){
    console.log(this.RestoTab);
    this.getRestos();
  }
  
  getRestos(){
    this.Restoservice.getRestos().subscribe((response)=>{
      this.RestoTab = response;
      console.log(this.RestoTab);
    }, error => {
      console.error('Error fetching Restaurants', error);
    });
  }
  showCardDetails(f: any) {
    Swal.fire({
        title: `${f.firstName} ${f.lastName}`,
        html: `
            <p><strong>Phone Number:</strong> ${f.phoneNumber}</p>
            <p><strong>Email:</strong> ${f.email}</p>
            <p><strong>Address:</strong> ${f.address}</p>
            <p><strong>Preferred Language:</strong> ${f.preferredLanguage}</p>
            <p><strong>Date:</strong> ${f.dateOfBirth}</p>
        `,
        imageUrl: f.image ? f.image.imageURL : 'url/to/default/image.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    });
  }
}
