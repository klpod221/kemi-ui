import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

@customElement("ui-breadcrumb")
export class UiBreadcrumb extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Array }) items: BreadcrumbItem[] = [];

  render() {
    return html`
      <nav class="breadcrumb">
        ${this.items.map(
          (item, index) => html`
            ${index > 0
              ? html`<span class="breadcrumb-separator">/</span>`
              : ""}
            ${item.href
              ? html`<a href="${item.href}" class="breadcrumb-link"
                  >${item.label}</a
                >`
              : html`<span class="breadcrumb-current">${item.label}</span>`}
          `
        )}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-breadcrumb": UiBreadcrumb;
  }
}
