import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./main.scss?inline";

export type DropdownPlacement =
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top-end";

@customElement("ui-dropdown")
export class UiDropdown extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) placement: DropdownPlacement = "bottom-start";
  @state() private isOpen = false;

  private handleTriggerClick(e: Event) {
    e.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleOutsideClick);
  }

  private handleOutsideClick = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this.isOpen = false;
    }
  };

  private handleMenuItemClick = () => {
    this.isOpen = false;
  };

  render() {
    return html`
      <div class="dropdown-wrapper">
        <div class="dropdown-trigger" @click=${this.handleTriggerClick}>
          <slot name="trigger"></slot>
        </div>
        ${this.isOpen
          ? html`
              <div
                class="dropdown dropdown--${this.placement}"
                @click=${this.handleMenuItemClick}
              >
                <slot></slot>
              </div>
            `
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-dropdown": UiDropdown;
  }
}
