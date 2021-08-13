import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any> = [];
  favouriteSub: any;

  constructor(private musicData: MusicDataService) {}

  ngOnInit(): void {
    this.favouriteSub = this.musicData.getFavourites().subscribe(data => {
      this.favourites = data.tracks;
    });
  }

  removeFromFavourites(id: string): void {
    this.favouriteSub = this.musicData.removeFromFavourites(id).subscribe(data => {
      this.favourites = data.tracks;
    });
  }
  
  ngOnDestroy(): void {
    this.favouriteSub.unsubscribe();
  }
}