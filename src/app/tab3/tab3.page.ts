import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  urlImageStorage : string[] = [];
  imageNameStorage : String[] = [];

  imageStorage = [{}]

  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService
  ) {}

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  async ionViewDidEnter() {
    await this.fotoService.loadFoto();
    this.tampilkanData();
  }

  tampilkanData() {
    this.urlImageStorage = []
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          this.urlImageStorage.unshift(url)
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
}
