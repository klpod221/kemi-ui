import "./drawer";
import { OverlayManager } from "./overlay-manager";

class DrawerManager extends OverlayManager {
  constructor() {
    super("ui-drawer");
  }
}

export const drawer = new DrawerManager();
export { modal } from "./modal-manager";
