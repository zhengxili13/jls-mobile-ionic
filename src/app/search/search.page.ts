import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {


  public SearchText: string;
  public items: string[];

  constructor(
    public navCtrl: NavController,
    public storage: Storage) { }

  ngOnInit() {
    this.initializeItems();
  }


  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }

  ionViewWillEnter() {
    this.loadSearchTextList();
  }

  loadSearchTextList() {
    this.storage.get('SearchTextList').then(result => {
      if (result != null && JSON.parse(result) != null && JSON.parse(result).length > 0) {
        this.items = JSON.parse(result);
      }
      else {
        this.items = [];
      }
    })
  };

  search() {
    if (this.items.find(p => p == this.SearchText) == null) {
      this.items.splice(0, 0, this.SearchText);
      if (this.items.length > 20) {
        this.items.pop();
      }
      this.storage.set('SearchTextList', JSON.stringify(this.items));
    }
    this.startSearch(this.SearchText);
  }

  startSearch(item) {
    this.navCtrl.navigateForward('NewproductPage', {
      queryParams: {
        PageType: 'SimpleProductSearch',
        Title: item,
        SearchText: item
      }
    });
  }

  clearSearchHistroy() {
    this.items = [];
    this.storage.remove('SearchTextList');
  }

}
