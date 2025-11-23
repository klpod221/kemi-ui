import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

export type TagVariant = "primary" | "success" | "warning" | "danger" | "info";

@customElement("ui-tag")
export class UiTag extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) variant: TagVariant = "primary";
  @property({ type: Boolean }) closable = false;
  @property({ type: String }) color = "";

  private handleClose(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("close", { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <span
        class="tag tag--${this.variant}"
        style="${this.color ? `background-color: ${this.color};` : ""}"
      >
        <slot></slot>
        ${this.closable
          ? html`
              <button class="tag-close" @click=${this.handleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
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
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-tag": UiTag;
  }
}
