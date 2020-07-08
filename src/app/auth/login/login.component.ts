import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginPayload} from '../login-payload';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      nomeDoUsuario: new FormControl(),
      senha: new FormControl()
    });
    this.loginPayload = {
      nomeDoUsuario: '',
      senha: ''
    };
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginPayload.nomeDoUsuario = this.loginForm.get('nomeDoUsuario').value;
    this.loginPayload.senha = this.loginForm.get('senha').value;

    this.authService.login(this.loginPayload).subscribe(data => {
      if (data) {
        console.log('login bem sucedido');
        this.router.navigateByUrl('/home');
      } else {
        console.log('Login falho');
      }
    });
  }

}
