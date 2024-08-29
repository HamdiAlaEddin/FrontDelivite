import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from 'src/app/models/User';
import { UserserviceService } from 'src/app/services/userservice/userservice.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  
  constructor(private us : UserserviceService,private router: Router,private formBuilder: FormBuilder){}
  //username = new FormControl('',[Validators.required,Validators.email])
  //password = new FormControl('',[Validators.required,Validators.minLength(8)])
  //////////////////////////////////////////////////////////
  loginForm! : FormGroup
  prepareForm(){
    this.loginForm = this.formBuilder.group({
      username:["", Validators.required],
      password:["", Validators.required],
    });
}
ngOnInit(): void {
  this.prepareForm();
}
login() {
  if (this.loginForm.valid) {

      const loginRequest: LoginRequest = {
          username: this.loginForm.get('username')?.value,
          password: this.loginForm.get('password')?.value
      };

      this.us.login(loginRequest).subscribe(
          (response: LoginResponse) => {

              console.log('User connected', response.message);
              if (response.token) {
                  sessionStorage.setItem("token", response.token);
                  sessionStorage.setItem("role", response.role); // Stocker le rôle

                  // Redirection selon le rôle
                  this.redirectBasedOnRole(response.role);
              }
          },
          (error) => {
              console.error('Login failed', error);
              this.prepareForm();
          }
      );
  } else {
      console.error('Form is invalid');
  }
}

redirectBasedOnRole(role: string) {
  if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
  }  else {
    
      this.router.navigate(['/user']);
  }
}



// login() {
//   if (this.loginForm.valid) {

//       const loginRequest: LoginRequest = {
//           username: this.loginForm.get('username')?.value,
//           password: this.loginForm.get('password')?.value
//       };


//       this.us.login(loginRequest).subscribe(
//           (response: LoginResponse) => {

//               console.log('user connected', response.message);
//               if (response.token){
//                   sessionStorage.setItem("token", response.token);
//                   this.router.navigate(["/"]);
                  
//               }
//           },
//           (error) => {
//               console.error('Login failed', error);
//               // Optionally reset the form or show an error message
//               this.prepareForm();
              
//           }
//       );
//   } else {
//       console.error('Form is invalid');
    
//   }
// }

  //////////////////////////////////////////////////////////

  // login(){
  //   // if(this.username.invalid){
  //   //   Swal.fire({
  //   //     icon: "error",
  //   //     text: "Your email is wrong!",
  //   //   });
  //   //   return;
  //   // }
  //   // if(this.password.invalid){
  //   //   Swal.fire({
  //   //     icon: "error",
  //   //     text: "The password needs to be at least 8 characters!",
  //   //   });
  //   //   return;
  //   // }
  //   if(this.username.value && this.password.value ){
      
  //     this.us.login(this.username.value , this.password.value).subscribe({
  //           next: (response) => {
  //             console.log(response);
  //             if(response && response.role=="CLIENT"){
  //               this.router.navigate(["/"]);
  //             }else{
  //               this.router.navigate(["/"]);
  //             }
              
  //           },
  //           error: (error) => {
  //             console.log(error)
  //             Swal.fire({
  //               icon: "error",
  //               title: "Wrong!",
  //               timer: 1500,
  //               showConfirmButton: false,
  //             });
  //             //display error
  //           }
  //         });
  //   }
  // }
  // forgotPassword(){
  //   if(this.username.invalid){
  //     Swal.fire({
  //       icon: "error",
  //       text: "Your email is wrong!",
  //     });
  //     return;
  //   }
  //   if(this.username.valid && this.username.value){
  //     this.us.forgetPassword(this.username.value);
  //   }
  // }
}
