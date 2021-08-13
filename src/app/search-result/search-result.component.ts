import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  results: any;
  searchQuery: any;
  routeSub: any;
  resultsSub: any;

  constructor(
    private route: ActivatedRoute,
    private musicData: MusicDataService,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params.q;
      this.resultsSub = this.musicData.searchArtists(params.q).subscribe(data => {
        let arr = Array(data.artists.items);
        this.results = arr.filter(element => element.images.length > 0);       
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.resultsSub.unsubscribe();
  }
}