import { Component, OnInit, Input} from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent  implements OnInit {

  @Input() menuItem: any; // Debes definir el tipo adecuado para menuItem
  @Input() isRoot: boolean = true; // Debes inicializar esta propiedad según tus necesidades
  isOpen: boolean = false;

  onMenuItemSelected(menuItem: any) {
    // Implementa la lógica para manejar la selección de elementos del menú
  }

  constructor(private menuController: MenuController) { }

  ngOnInit() {}
  closeMenu() {
    this.menuController.close('main-menu'); // Cierra el menú actual
  }
}
