import "./modal";
import { OverlayManager } from "./overlay-manager";

class ModalManager extends OverlayManager {
  constructor() {
    super("ui-modal");
  }
}

export const modal = new ModalManager();
