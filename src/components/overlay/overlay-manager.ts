export class OverlayManager {
  private overlayStack: string[] = [];
  private elementTagName: string;

  constructor(elementTagName: string) {
    this.elementTagName = elementTagName;
  }

  open(id: string, props?: Record<string, any>) {
    const element = document.querySelector(
      `${this.elementTagName}[id="${id}"]`
    ) as any;

    if (!element) {
      console.error(`Overlay with id "${id}" not found`);
      return;
    }

    // Get parentId from element
    const parentId = element.parentId;

    // If there's a parent, hide it
    if (parentId) {
      const parentElement = document.querySelector(
        `${this.elementTagName}[id="${parentId}"], ui-drawer[id="${parentId}"], ui-modal[id="${parentId}"]`
      ) as any;
      if (parentElement) {
        parentElement.isOpen = false;
      }
    } else {
      // Close current overlay if no parent specified
      const currentId = this.overlayStack[this.overlayStack.length - 1];
      if (currentId && currentId !== id) {
        this.close(currentId);
      }
    }

    // Set props if provided
    if (props) {
      element.props = props;
    }

    // Show the overlay
    element.isOpen = true;

    // Add to stack if not already there
    if (!this.overlayStack.includes(id)) {
      this.overlayStack.push(id);
    }

    // Listen for close event
    const handleClose = (e: CustomEvent) => {
      if (e.detail?.id === id) {
        this.close(id);
        element.removeEventListener("overlay-close", handleClose);
      }
    };
    element.addEventListener("overlay-close", handleClose);
  }

  close(id: string) {
    const element = document.querySelector(
      `${this.elementTagName}[id="${id}"], ui-drawer[id="${id}"], ui-modal[id="${id}"]`
    ) as any;

    if (!element) return;

    const parentId = element.parentId;

    // Add closing class for animation
    element.classList.add("closing");

    // Wait for animation to complete
    setTimeout(() => {
      // Hide the overlay
      element.isOpen = false;
      element.classList.remove("closing");

      // Remove from stack
      const index = this.overlayStack.indexOf(id);
      if (index > -1) {
        this.overlayStack.splice(index, 1);
      }

      // Reopen parent if exists
      if (parentId) {
        const parentElement = document.querySelector(
          `ui-drawer[id="${parentId}"], ui-modal[id="${parentId}"]`
        ) as any;
        if (parentElement) {
          parentElement.isOpen = true;
        }
      }
    }, 300);
  }

  closeAll() {
    const ids = [...this.overlayStack];
    ids.forEach((id) => this.close(id));
  }
}
