import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  albumSub: any;
  routeSub: any;

  constructor(
    private musicData: MusicDataService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.albumSub = this.musicData.getAlbumById(params.id).subscribe(data => {
          this.album = data;
      });
    });
  }

  addToFavorites(trackID: string): void {
    if (this.musicData.addToFavorites(trackID)) {
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    } 
  }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.albumSub.unsubscribe();
  }

}
