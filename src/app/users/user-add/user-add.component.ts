import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userService } from '../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: userService){
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.minLength(3)],
      lastname: ['', [Validators.minLength(3), Validators.maxLength(60)]],
      email: ['', Validators.email],
      phone: ['', Validators.pattern('^[0-9]*$')]
    });
  }
  onSubmit(){
    const user = this.userForm.value;
    this.userService.addUser(user);
    this.userForm.reset();
  }
}
