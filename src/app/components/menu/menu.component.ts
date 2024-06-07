import { Component, OnInit } from '@angular/core';
import { MenusService } from 'src/app/services/menus.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  menuItems: any[] = [];

  constructor(private menuService: MenusService) { }

  ngOnInit() {
    this.getMenuItems();
  }

  getMenuItems() {
    this.menuService.getMainMenu().subscribe((menus) => {
      return this.menuService.getMenuItems(menus.id).subscribe((menuItems) => {
        console.log(menuItems)
        this.menuItems = menuItems;
      });
    }
  )}
}
