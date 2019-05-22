export class SidenavItem {
  name: string;
  icon: string;
  route: string;
  parent: SidenavItem;
  subItems: SidenavItem[];
  position: number;
  description: string;

  constructor(model: any = null) {
    if (model) {
      this.name = model.name;
      this.icon = model.icon;
      this.route = model.route;
      this.parent = model.parent;
      this.subItems = this.mapSubItems(model.subItems);
      this.position = model.position;
      this.description = model.description;
    }
  }

  hasSubItems() {
    if (this.subItems) {
      return this.subItems.length > 0;
    }
    return false;
  }

  hasParent() {
    return !!this.parent;
  }

  mapSubItems(list: SidenavItem[]) {
    if (list) {
      list.forEach((item, index) => {
        list[index] = new SidenavItem(item);
      });

      return list;
    }
  }
}
