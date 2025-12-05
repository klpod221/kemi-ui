import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

export type SpinSize = "sm" | "md" | "lg";

@customElement("ui-spin")
export class UiSpin extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) size: SpinSize = "md";
  @property({ type: String }) tip = "";

  render() {
    return html`
      <div class="spin-wrapper">
        <div class="spin spin--${this.size}">
          <svg class="spin-icon" viewBox="0 0 50 50">
            <circle
              class="spin-track"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="4"
            ></circle>
            <circle
              class="spin-circle"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke-width="4"
              stroke-linecap="round"
            ></circle>
          </svg>
        </div>
        ${this.tip ? html`<div class="spin-tip">${this.tip}</div>` : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-spin": UiSpin;
  }
}
