import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/components/auth/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user:any;
  collapsed=true;
  selected:any;
  element:any;
  public dark = false
  constructor(private authentication:AuthenticationService) { 
    this.authentication.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
  }

  ngOnInit(): void {
  }
  
  logOut(){
    this.authentication.logout()
  }
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  select(item:any) {
    this.selected = item;
      this.hideNavBar();
     
  };
  isActive(item:any) {
    return this.selected === item;
    }
  hideNavBar(){
    this.element = document.getElementById('navbarSupportedContent');
    this.element.style.transition='transform ease-out 3s'; 
    this.element.classList.add("collapse");
   
  }
 
 
}
