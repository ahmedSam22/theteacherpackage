import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public location: any = [];
  public subject = new Subject<any>();
  private locationSource = new  BehaviorSubject(this.location);
  private currentLocation = this.locationSource.asObservable();



  constructor(private router: Router,private http:HttpClient) { 
    this.locationSource = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('location') || '{}'));
        // this.currentUser = this.currentUserSubject.asObservable();
// console.log(this.gettLocation().subscribe(console.log))
// console.log(this.gettLocation)
  }
  setLocation(message: string) {
    this.locationSource.next(message)
  }
  deleteLocaion(){
    this.locationSource.next(null)
    // localStorage.setItem('location',null)
    // localStorage.clear()
    window.localStorage.removeItem('location');
    
    this.router.navigate(['/home'])
      
  }
  public gettLocation(): Observable<boolean> { return this.locationSource.asObservable()}

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          console.log(resolve)
        },
        err => {
          reject(err);
        });
    });
  }
  getLocationName(long:any,lat:any){
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?types=poi&access_token=${environment.mapboxToken}`)
  }
  getLocationNameByText(text:any){
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?types=poi&access_token=${environment.mapboxToken}`)
  }
  // searchEntries(term) {
  //   return this.http
  //       .get(this.baseUrl + this.queryUrl + term)
  //       .map(res => res.json());
  // }
  // searchEntries(term) {
  //   return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${term}.json?types=poi&access_token=${environment.accessToken}`)
  // }
 
}
