import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { MatSidenav } from '@angular/material';
import { SidenavItem } from '../sidenav-item/sidenav-item.model';

@Injectable()
export class SidebarService {

  private sidenav: MatSidenav;
  private itemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private subitemsSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private items: SidenavItem[] = [];
  private subitems: SidenavItem[] = [];
  items$: Observable<SidenavItem[]> = this.itemsSubject.asObservable();
  subitems$: Observable<SidenavItem[]> = this.subitemsSubject.asObservable();

  private currentlyOpenSubject: BehaviorSubject<SidenavItem[]> = new BehaviorSubject<SidenavItem[]>([]);
  private oCurrentlyOpen: SidenavItem[] = [];
  currentlyOpen$: Observable<SidenavItem[]> = this.currentlyOpenSubject.asObservable();

  isIconSidenav: boolean;
  private menu = this;

  constructor() {
    this.setSidenav();
  }

  setSidenav() {
    if (JSON.parse(localStorage.getItem('currentUser')) == null) {
      this.sideAll();
    } else {
      if (JSON.parse(localStorage.getItem('currentUser')).rol == 6) {
        const dashboard = this.menu.addItem('Reporte de Ventas', 'shopping_basket', '/sales-report', 1);
      } else {
        this.sideAll();
      }
    }
  }

  resetSidenav() {
    this.items = [];
  }

  sideAll() {

    const miPerfil = this.menu.addItem('Mi Perfil', 'perm_identity', '/perfil', 2, 'esta es la descripcion');
    const pasantias = this.menu.addItem('Pasantias', 'assignment', '/internships', 3, 'Cree, edite y de la baja a los pasantes');

    // const reclamos = this.menu.addItem('Carreras', 'help_outline', '/career', 4, 'Cree, edite y de la baja a las carreras');
    // this.menu.addSubItem(reclamos, 'Reportes', '/1', 1);

    const miHuella = this.menu.addItem('Gestion', 'fingerprint', '/nada', 4, 'Registrá tu huella');
    this.menu.addSubItem(miHuella, 'Carreras', '/careers', 1);
    this.menu.addSubItem(miHuella, 'Empresas', '/companies', 2);
    this.menu.addSubItem(miHuella, 'Tutores externos', '/company-tutors', 3);
    this.menu.addSubItem(miHuella, 'Estudiantes', '/students', 4);
    this.menu.addSubItem(miHuella, 'Profesores', '/teachers', 5);

    const recursosHumanos = this.menu.addItem('Usuarios', 'work_outline', '/users', 5, 'Realizá las consultas');
    // this.menu.addSubItem(recursosHumanos, 'Recursos 1', '/sales-report', 1);

    const tercerasEntidades = this.menu.addItem('Reportes', 'group', '/reports', 6, 'Vea todas las estadisticas');
    // this.menu.addSubItem(tercerasEntidades, 'Terceras 1', '/1', 1);
    // this.menu.addSubItem(tercerasEntidades, 'Terceras 2', '/2', 2);

    // const programasBeneficios = this.menu.addItem('Programas y beneficios', 'bookmark_border', '/programas-beneficios', 8, 'Consultá tus subscripciones');
    // this.menu.addSubItem(programasBeneficios, 'Terceras 1', '/1', 1);
    // this.menu.addSubItem(programasBeneficios, 'Terceras 2', '/2', 2);

    // const creditosAnses = this.menu.addItem('Créditos ANSES', 'attach_money', '/creditos-anses', 9, 'Iniciá tu trámite');
    // this.menu.addSubItem(creditosAnses, 'Creditos Anses 1', '/1', 1);
    // this.menu.addSubItem(creditosAnses, 'Creditos Anses 2', '/2', 2);

    // const hijos = this.menu.addItem('Hijos', 'face', '/hijos', 10, 'Controla a tus hijos');
    // this.menu.addSubItem(hijos, 'Libretas', '/libretas', 1);
    // this.menu.addSubItem(hijos, 'certificados', '/certificados', 2);

    // const homeItem: SidenavItem = new SidenavItem({
    //   name: 'Libreta',
    //   icon: 'home',
    //   route: '',
    //   position: 1,
    //   subItems: [
    //     {
    //       parent: this,
    //       name: 'Libretia1',
    //       route: '/libretas1',
    //       position: 1,
    //       subItems: []
    //     }
    //   ],
    //   description: null
    // });

    // this.items.push(homeItem);
    // this.itemsSubject.next(this.items);

  }


  addItem(name: string, icon: string, route: string, position: number, description?: string) {
    const item = new SidenavItem({
      name,
      icon,
      route,
      subItems: [],
      position: position || 99,
      description: description || null
    });

    this.items.push(item);
    this.itemsSubject.next(this.items);

    return item;
  }

  addSubItem(parent: SidenavItem, name: string, route: string, position: number) {
    const item = new SidenavItem({
      name,
      route,
      parent,
      subItems: [],
      position: position || 99
    });

    parent.subItems.push(item);
    this.subitems.push(item);
    this.itemsSubject.next(this.items);
    this.subitemsSubject.next(this.subitems);

    return item;
  }

  removeItem(item: SidenavItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }

    this.itemsSubject.next(this.items);
  }

  isOpen(item: SidenavItem) {
    return (this.oCurrentlyOpen.indexOf(item) != -1);
  }

  toggleCurrentlyOpen(item: SidenavItem) {
    let currentlyOpen = this.oCurrentlyOpen;

    if (this.isOpen(item)) {
      if (currentlyOpen.length > 1) {
        currentlyOpen.length = this.oCurrentlyOpen.indexOf(item);
      } else {
        currentlyOpen = [];
      }
    } else {
      currentlyOpen = this.getAllParents(item);
    }

    this.oCurrentlyOpen = currentlyOpen;
    this.currentlyOpenSubject.next(currentlyOpen);
  }

  getAllParents(item: SidenavItem, currentlyOpen: SidenavItem[] = []) {
    currentlyOpen.unshift(item);

    if (item.hasParent()) {
      return this.getAllParents(item.parent, currentlyOpen);
    } else {
      return currentlyOpen;
    }
  }

  nextCurrentlyOpen(currentlyOpen: SidenavItem[]) {
    this.oCurrentlyOpen = currentlyOpen;
    this.currentlyOpenSubject.next(currentlyOpen);
  }

  nextCurrentlyOpenByRoute(route: string) {
    let currentlyOpen = [];

    const item = this.findByRouteRecursive(route, this.items);

    if (item && item.hasParent()) {
      currentlyOpen = this.getAllParents(item);
    } else if (item) {
      currentlyOpen = [item];
    }

    this.nextCurrentlyOpen(currentlyOpen);
  }

  findByRouteRecursive(route: string, collection: SidenavItem[]) {
    let result = _.find(collection, { route: route });
    if (!result) {
      _.each(collection, (item) => {
        if (item.hasSubItems()) {
          const found = this.findByRouteRecursive(route, item.subItems);
          if (found) {
            result = found;
            return false;
          }
        }
      });
    }
    return result;
  }

  get currentlyOpen() {
    return this.oCurrentlyOpen;
  }

  isSidenavClose (sidenav){
    return sidenav.openedChange
  }
}
