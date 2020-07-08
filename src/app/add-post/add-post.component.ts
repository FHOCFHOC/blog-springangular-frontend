import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PostPayload} from './post-payload';
import {AddPostService} from '../add-post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  titlo = new FormControl('');
  conteudo = new FormControl('');

  constructor(private addpostService: AddPostService, private router: Router) {
    this.addPostForm = new FormGroup({
      titlo: this.titlo,
      conteudo: this.conteudo
    });
    this.postPayload = {
      id: '',
      conteudo: '',
      titlo: '',
      nomeDoUsuario: ''
    }
  }

  ngOnInit(): void {
  }

  addPost() {
    this.postPayload.conteudo = this.addPostForm.get('conteudo').value;
    this.postPayload.titlo = this.addPostForm.get('titlo').value;
    this.addpostService.addPost(this.postPayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Falha');
    })
  }

}
