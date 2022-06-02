import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: ApiClientService) { }

  ngOnInit(): void {
    this.loginFormBuilder();
  }

  loginFormBuilder() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(){
    // going to the database and bring the EVID 
    console.log(this.loginForm.value)
    this.api.login(this.loginForm.value.email, this.loginForm.value.password)
  }

  signInGoogle() {
    this.api.googleLogin().subscribe(data => console.log(data));
  }
}
