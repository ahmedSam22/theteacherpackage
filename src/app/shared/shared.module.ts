import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [SidebarComponent, NavbarComponent, FooterComponent, JumbotronComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000, 
      positionClass: 'toast-bottom-right', 
      preventDuplicates: true,
      progressBar:true
    }),
    RouterModule,
    MatDialogModule,
  ],
  exports: [
    SidebarComponent, 
    NavbarComponent, 
    FooterComponent,
    JumbotronComponent,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    ToastrModule,
    RouterModule
  ],  
  providers:[
    
  ],
})
export class SharedModule { }
