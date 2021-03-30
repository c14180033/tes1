import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  imageStorage = [{}]

  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  async ionViewDidEnter() {
    await this.fotoService.loadFoto();
    this.tampilkanData();
  }

  tampilkanData() {
    this.imageStorage = []
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          this.imageStorage.unshift({
            link: url,
            namaFoto: itemRef.name
          })
        })
      });
    }).catch((error) => {
      console.log(error);
    });
  }
  selectFoto(url: string) {
    this.router.navigate(['/tab4', url])
  }
}
