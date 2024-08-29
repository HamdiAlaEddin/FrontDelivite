import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  adminName!: string;
  
  constructor(private us : UserserviceService, private router : Router){}
  async ngOnInit(){
    const res = await this.us.getAdminDetails().then(res => {
      this.adminName = res
      console.log("admin name:" + this.adminName);
    });
    
    
  }
  getAdminName(){
    return this.adminName;
  }
  logOut(){
    this.us.logout();
    this.router.navigate(['/login']);
  }

  
}
