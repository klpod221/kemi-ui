import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./drawer.scss?inline";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";

@customElement("ui-drawer")
export class UiDrawer extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = "";
  @property({ type: String }) parentId = "";
  @property({ type: String }) title = "";
  @property({ type: String }) placement: DrawerPlacement = "right";
  @property({ type: String }) width = "400px";
  @property({ type: String }) height = "400px";
  @property({ type: Boolean }) closable = true;
  @property({ type: Object }) props: Record<string, any> = {};
  @state() isOpen = false;

  connectedCallback() {
    super.connectedCallback();
    
    this.style.display = "none";
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("isOpen")) {
      this.style.display = this.isOpen ? "block" : "none";
    }

    if (changedProperties.has("props") && this.isOpen) {
      this.interpolateSlotContent();
    }
  }

  private interpolateSlotContent() {
    const slot = this.shadowRoot?.querySelector("slot");
    if (!slot) return;

    const assignedNodes = slot.assignedNodes({ flatten: true });
    assignedNodes.forEach((node) => {
      this.interpolateNode(node);
    });
  }

  private interpolateNode(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const original = node.textContent || "";
      node.textContent = original.replace(/\{props\.([^}]+)\}/g, (_, path) => {
        return this.getNestedValue(this.props, path) ?? "";
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      Array.from(element.childNodes).forEach((child) => {
        this.interpolateNode(child);
      });
    }
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, prop) => current?.[prop], obj);
  }

  private handleBackdropClick() {
    if (this.closable) {
      this.close();
    }
  }

  private handleClose() {
    this.close();
  }

  private close() {
    this.dispatchEvent(
      new CustomEvent("overlay-close", {
        detail: { id: this.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private hasFooterContent(): boolean {
    const slot = this.shadowRoot?.querySelector(
      'slot[name="footer"]'
    ) as HTMLSlotElement;
    return slot?.assignedNodes().length > 0;
  }

  render() {
    const isHorizontal =
      this.placement === "left" || this.placement === "right";
    const size = isHorizontal ? this.width : this.height;

    return html`
      <div class="drawer-backdrop" @click=${this.handleBackdropClick}></div>
      <div
        class="drawer drawer--${this.placement}"
        style="${isHorizontal ? `width: ${size}` : `height: ${size}`}"
        @click=${(e: Event) => e.stopPropagation()}
      >
        <div class="drawer-header">
          <h3 class="drawer-title">${this.title}</h3>
          ${this.closable
            ? html`
                <button class="drawer-close" @click=${this.handleClose}>
                  <svg
                    xmlns="http:
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              `
            : ""}
        </div>
        <div class="drawer-content">
          <slot></slot>
        </div>
        <div
          class="drawer-footer"
          style="${this.hasFooterContent() ? "" : "display: none"}"
        >
          <slot name="footer" @slotchange=${() => this.requestUpdate()}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-drawer": UiDrawer;
  }
}
