import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  linkFoto : string = ''
  state = true

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private afStorage : AngularFireStorage,
    public fotoService : FotoService
  ) { }

  ngOnInit() {
    this.linkFoto = this.activatedRoute.snapshot.paramMap.get('linkFoto');
    console.log(this.linkFoto);
    if (this.linkFoto == null) {
      this.state = true
    } else {
      this.state = false
    }
  }

}
