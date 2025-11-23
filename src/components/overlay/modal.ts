import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./modal.scss?inline";

@customElement("ui-modal")
export class UiModal extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = "";
  @property({ type: String }) parentId = "";
  @property({ type: String }) title = "";
  @property({ type: String }) width = "500px";
  @property({ type: String }) maxWidth = "90vw";
  @property({ type: Boolean }) closable = true;
  @property({ type: Boolean }) closeOnBackdrop = true;
  @property({ type: Object }) props: Record<string, any> = {};
  @state() isOpen = false;

  connectedCallback() {
    super.connectedCallback();
    // Hide by default
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
    if (this.closable && this.closeOnBackdrop) {
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
    return html`
      <div class="modal-backdrop" @click=${this.handleBackdropClick}></div>
      <div
        class="modal"
        style="width: ${this.width}; max-width: ${this.maxWidth}"
        @click=${(e: Event) => e.stopPropagation()}
      >
        <div class="modal-header">
          <h3 class="modal-title">${this.title}</h3>
          ${this.closable
            ? html`
                <button class="modal-close" @click=${this.handleClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
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
        <div class="modal-content">
          <slot></slot>
        </div>
        <div
          class="modal-footer"
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
    "ui-modal": UiModal;
  }
}
