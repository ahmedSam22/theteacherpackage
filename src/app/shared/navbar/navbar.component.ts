import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/components/auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user:any;
  public dark = false
  constructor(private authentication:AuthenticationService) { 
    this.authentication.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
  }

  ngOnInit(): void {
  }
  // darkMode(){
  //   $('body').toggleClass('dark-only')
  // }
  logOut(){
    this.authentication.logout()
  }
}
