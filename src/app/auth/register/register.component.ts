import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { RegisterPayload } from '../register-payload';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerPayload: RegisterPayload;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      nomeDoUsuario: '',
      email: '',
      senha: '',
      senhaConfirmada: ''
    });
    this.registerPayload = {
      nomeDoUsuario: '',
      email: '',
      senha: '',
      senhaConfirmada: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.registerPayload.nomeDoUsuario = this.registerForm.get('nomeDoUsuario').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.senha = this.registerForm.get('senha').value;
    this.registerPayload.senhaConfirmada = this.registerForm.get('senhaConfirmada').value;

    this.authService.register(this.registerPayload).subscribe(data => {
      console.log('registro bem sucedido');
      this.router.navigateByUrl('/register-success');
    }, error => {
      console.log('registro mal sucedido');
    });
  }

}
