import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

export type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

@customElement("ui-badge")
export class UiBadge extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) variant: BadgeVariant = "primary";
  @property({ type: Boolean }) dot = false;
  @property({ type: Number }) max = 99;

  render() {
    if (this.dot) {
      return html`<span
        class="badge badge--dot badge--${this.variant}"
      ></span>`;
    }

    const content = this.textContent?.trim() || "";
    const count = parseInt(content);
    const displayText =
      !isNaN(count) && count > this.max ? `${this.max}+` : content;
    const isNumeric = !isNaN(count) || displayText.endsWith("+");
    const isShort = displayText.length <= 3;

    return html`
      <span
        class="badge badge--${this.variant}"
        style="${isNumeric && isShort
          ? "border-radius: 50%; aspect-ratio: 1; padding: var(--spacing-xs);"
          : ""}"
      >
        ${displayText}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-badge": UiBadge;
  }
}
