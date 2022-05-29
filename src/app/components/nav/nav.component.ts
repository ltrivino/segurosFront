import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  profile: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  logout() {


  }

}
