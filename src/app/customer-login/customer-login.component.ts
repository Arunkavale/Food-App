
import {Component , OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-customer-login',
    styleUrls: ['./customer-login.scss'],
    templateUrl: './customer-login.component.html'
})
export class CustomerLoginComponent implements OnInit {
    constructor(private http: HttpClient ) { }
    newPost = '';
    enteredValue = '';
    addCustomer: FormGroup;
    user = {
        phone: '9766999425',
        password: '123456789'
    };
    ngOnInit() {
    }
    SubmitCustomer() {

    }
}
