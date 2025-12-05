import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./main.scss?inline";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";
export type PopoverTrigger = "hover" | "click";

@customElement("ui-popover")
export class UiPopover extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) placement: PopoverPlacement = "top";
  @property({ type: String }) trigger: PopoverTrigger = "hover";
  @property({ type: String }) title = "";
  @state() private isOpen = false;

  private handleTriggerClick(e: Event) {
    if (this.trigger === "click") {
      e.stopPropagation();
      this.isOpen = !this.isOpen;
    }
  }

  private handleTriggerMouseEnter() {
    if (this.trigger === "hover") {
      this.isOpen = true;
    }
  }

  private handleTriggerMouseLeave() {
    if (this.trigger === "hover") {
      this.isOpen = false;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.trigger === "click") {
      document.addEventListener("click", this.handleOutsideClick);
    }
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

  render() {
    return html`
      <div class="popover-wrapper">
        <div
          class="popover-trigger"
          @click=${this.handleTriggerClick}
          @mouseenter=${this.handleTriggerMouseEnter}
          @mouseleave=${this.handleTriggerMouseLeave}
        >
          <slot name="trigger"></slot>
        </div>
        ${this.isOpen
          ? html`
              <div class="popover popover--${this.placement}">
                ${this.title
                  ? html`<div class="popover-title">${this.title}</div>`
                  : ""}
                <div class="popover-content">
                  <slot></slot>
                </div>
                <div class="popover-arrow"></div>
              </div>
            `
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-popover": UiPopover;
  }
}
