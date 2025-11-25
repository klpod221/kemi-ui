import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

@customElement("ui-progress")
export class UiProgress extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String }) label = "";
  @property({ type: Boolean }) showPercentage = true;
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";
  @property({ type: String }) variant: "default" | "success" | "warning" | "danger" = "default";
  @property({ type: Boolean }) striped = false;
  @property({ type: Boolean }) animated = false;
  @property({ type: String }) color = "";

  private get percentage(): number {
    const percent = (this.value / this.max) * 100;
    return Math.min(Math.max(percent, 0), 100);
  }

  private get variantColor(): string {
    if (this.color) return this.color;
    
    switch (this.variant) {
      case "success":
        return "var(--progress-success, #22c55e)";
      case "warning":
        return "var(--progress-warning, #eab308)";
      case "danger":
        return "var(--progress-danger, #ef4444)";
      default:
        return "var(--progress-primary, #3b82f6)";
    }
  }

  render() {
    const barClasses = [
      "progress-bar",
      this.striped ? "progress-bar--striped" : "",
      this.animated ? "progress-bar--animated" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <div class="progress-wrapper">
        ${this.label || this.showPercentage
          ? html`
              <div class="progress-header">
                ${this.label ? html`<span class="progress-label">${this.label}</span>` : ""}
                ${this.showPercentage
                  ? html`<span class="progress-percentage">${Math.round(this.percentage)}%</span>`
                  : ""}
              </div>
            `
          : ""}
        
        <div class="progress progress--${this.size}">
          <div
            class="${barClasses}"
            role="progressbar"
            aria-valuenow="${this.value}"
            aria-valuemin="0"
            aria-valuemax="${this.max}"
            style="width: ${this.percentage}%; background-color: ${this.variantColor}"
          ></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-progress": UiProgress;
  }
}
