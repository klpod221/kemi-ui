import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

@customElement("ui-empty")
export class UiEmpty extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) image = "";
  @property({ type: String }) description = "No data";

  render() {
    return html`
      <div class="empty">
        <div class="empty-image">
          ${this.image
            ? html`<img src="${this.image}" alt="Empty" />`
            : html`
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="currentColor"
                >
                  <path
                    d="M32 10a22 22 0 100 44 22 22 0 000-44zm0 2a20 20 0 110 40 20 20 0 010-40z"
                    opacity="0.3"
                  />
                  <path
                    d="M32 24a2 2 0 012 2v10a2 2 0 11-4 0V26a2 2 0 012-2zm0 16a2 2 0 110 4 2 2 0 010-4z"
                  />
                </svg>
              `}
        </div>
        <p class="empty-description">${this.description}</p>
        <div class="empty-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-empty": UiEmpty;
  }
}
