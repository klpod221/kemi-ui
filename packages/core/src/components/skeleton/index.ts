import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

export type SkeletonVariant = "text" | "circle" | "rectangle" | "list";

@customElement("ui-skeleton")
export class UiSkeleton extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) variant: SkeletonVariant = "text";
  @property({ type: String }) width = "100%";
  @property({ type: String }) height = "auto";
  @property({ type: Number }) count = 1;

  private renderListItem() {
    return html`
      <div class="skeleton-list-item">
        <div
          class="skeleton skeleton--circle"
          style="width: 40px; height: 40px;"
        ></div>
        <div class="skeleton-list-content">
          <div
            class="skeleton skeleton--text"
            style="width: 60%; height: 12px;"
          ></div>
          <div
            class="skeleton skeleton--text"
            style="width: 40%; height: 10px; margin-top: 8px;"
          ></div>
        </div>
      </div>
    `;
  }

  private renderSkeleton() {
    if (this.variant === "list") {
      return this.renderListItem();
    }

    const style = `width: ${this.width}; height: ${this.height};`;
    return html`<div
      class="skeleton skeleton--${this.variant}"
      style="${style}"
    ></div>`;
  }

  render() {
    return html`
      <div class="skeleton-wrapper">
        ${Array.from({ length: this.count }, () => this.renderSkeleton())}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-skeleton": UiSkeleton;
  }
}
