import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

@customElement("ui-avatar")
export class UiAvatar extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) src = "";
  @property({ type: String }) alt = "";
  @property({ type: String }) size = "md";
  @property({ type: String }) shape = "circle";

  private getInitials(): string {
    if (!this.alt) return "";
    return this.alt
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  render() {
    return html`
      <div class="avatar avatar--${this.size} avatar--${this.shape}">
        ${this.src
          ? html`<img src="${this.src}" alt="${this.alt}" />`
          : html`<span class="avatar-initials">${this.getInitials()}</span>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-avatar": UiAvatar;
  }
}
