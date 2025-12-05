import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./main.scss?inline";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

@customElement("ui-tooltip")
export class UiTooltip extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) content = "";
  @property({ type: String }) placement: TooltipPlacement = "top";
  @state() private isVisible = false;

  private hideTimeout?: number;

  private handleMouseEnter() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
    this.isVisible = true;
  }

  private handleMouseLeave() {
    this.hideTimeout = window.setTimeout(() => {
      this.isVisible = false;
    }, 100);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  }

  render() {
    return html`
      <div class="tooltip-wrapper">
        <div
          class="tooltip-trigger"
          @mouseenter=${this.handleMouseEnter}
          @mouseleave=${this.handleMouseLeave}
        >
          <slot name="trigger"></slot>
        </div>
        ${this.isVisible
          ? html`
              <div class="tooltip tooltip--${this.placement}" role="tooltip">
                <div class="tooltip-content">${this.content}</div>
                <div class="tooltip-arrow"></div>
              </div>
            `
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-tooltip": UiTooltip;
  }
}
