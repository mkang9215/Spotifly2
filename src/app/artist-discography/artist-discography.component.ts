import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {  
  artist: any;
  artistSub: any;
  albums: any;
  albumsSub: any;
  routeSub: any;
  loading: boolean = true;

  constructor(private musicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.artistSub = this.musicData.getArtistById(params.id).subscribe(data => {
        this.artist = data;
      });
      this.albumsSub = this.musicData.getAlbumsByArtistId(params.id).subscribe(data => {        
        let arr = Array(data.items);
        this.albums = arr.filter((element, index, array) => {
          return array.indexOf(element) == index;
        });
        //this.albums = data.items;
      });
    });
  }

  ngOnDestroy(): void {
    this.artistSub.unsubscribe();
    this.albumsSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
