import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  favouritesList: Array<any> = [];

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(
        mergeMap(token => {
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", 
          { headers: { "Authorization": `Bearer ${token}` } 
        });
      })
    );
  }

  getArtistById(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap(token => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, 
          { headers: { Authorization: `Bearer ${token}` }
        });
      })
    );
  }

  getAlbumsByArtistId(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap(token => {
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`,
          { headers: { Authorization: `Bearer ${token}` }
        });
      })
    );
  }

  getAlbumById(id: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap(token => {
        return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, 
          { headers: { Authorization: `Bearer ${token}` }
        });
      })
    );
  }

  searchArtists(artist: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(
      mergeMap(token => {
        return this.http.get<any>(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=50`,
          { headers: { Authorization: `Bearer ${token}` } 
        });
      })
    );
  }

  addToFavorites(id: string): boolean {
    if (!this.favouritesList || this.favouritesList.length >= 50) {
      this.favouritesList = [];
      return false;
    }    
    this.favouritesList.push(id);
    return true;
  }

  removeFromFavourites(id: string): Observable<any> {
    if (this.favouritesList) {
      this.favouritesList.splice(this.favouritesList.indexOf(id), 1);
    }
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    if (this.favouritesList.length > 0) {
      let items: string = this.favouritesList.join(',');
      return this.spotifyToken.getBearerToken().pipe(
        mergeMap(token => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${items}`,
            { headers: { Authorization: `Bearer ${token}` } 
          });
        })
      );
    }
    return new Observable(o => {
      o.next([]);
    });
  }

}