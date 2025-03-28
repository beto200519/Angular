import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule], // 👈 Agregar RouterModule
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  router: any;

  logout(){
    this.router.navigate(['login']);
  }
}
