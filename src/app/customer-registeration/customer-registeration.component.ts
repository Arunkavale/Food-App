
import {Component , OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-customer-registeration',
    styleUrls: ['./customer-register.scss'],
    templateUrl: './customer-registeration.component.html'
})
export class CustomerRegisterationComponent implements OnInit{
    newPost = '';
    enteredValue = '';
    addCustomer: FormGroup;
    user = {
        name: '',
        email: '',
        phone: '',
        password: ''
    };
    ngOnInit() {
    this.addCustomer = new FormGroup({
        name: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
    });
    }
    SubmitCustomer() {
        console.log();
        
    }
}
