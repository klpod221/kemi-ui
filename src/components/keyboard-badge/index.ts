import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

@customElement("ui-keyboard-badge")
export class UiKeyboardBadge extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Array }) keys: string[] = [];

  render() {
    return html`
      <div class="kbd-wrapper">
        ${this.keys.map(
          (key, index) => html`
            ${index > 0 ? html`<span class="kbd-separator">+</span>` : ""}
            <kbd class="kbd">${key}</kbd>
          `
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-keyboard-badge": UiKeyboardBadge;
  }
}
