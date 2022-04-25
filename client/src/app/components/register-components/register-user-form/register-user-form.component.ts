import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.css']
})
export class RegisterUserFormComponent implements OnInit {

  registerForm!: FormGroup;
  route: string = 'register';

  constructor(private formBuilder: FormBuilder, private store: StoreService, private _router: Router) { }

  ngOnInit(): void {
    this.registerFormBuilder();
  }

  registerFormBuilder() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      carId: ['']
    })
  }

  onSubmit() {
    if(this.registerForm.valid) {
      console.log(this.registerForm)
      this.store.setUserData(this.registerForm.value);
      this._router.navigate(['register-car'])
    } else {
      alert('invalid')
    }
  }
}
