import { Component, Inject, Optional } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  token: string | null = null;
  isDialog: boolean = true;
  password = new FormControl('',[Validators.required,Validators.minLength(8)]);
  confirmPassword = new FormControl('',[Validators.required,Validators.minLength(8)]);
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,private route: ActivatedRoute, private us : UserserviceService, private router : Router) {
    if(data){
      this.token = data.token;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log('Token:', this.token);
      if(!this.token){
        this.isDialog = false;
        this.token = params.get('token');
        console.log("token from params");
      }
    });
  }
  submit(){
    if(this.password.invalid){
      Swal.fire({
        icon: "error",
        text: "The password needs to be at least 8 characters!",
      });
      return;
    }
    if(this.password.value != this.confirmPassword.value){
      Swal.fire({
        icon: "error",
        text: "The passwords doesn't match!",
      });
      return;
    }
    if(this.token && this.password.value){
      this.us.resetPassword(this.token,this.password.value);
      this.isDialog ? null : this.router.navigate(["/login"]);
    }
  }
}
