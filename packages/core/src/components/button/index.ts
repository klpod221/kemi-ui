import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./main.scss?inline";

@customElement("ui-button")
export class UiButton extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) variant:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "ghost"
    | "outline" = "primary";
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) title = "";
  @property({ type: String }) type: "button" | "submit" | "reset" = "button";

  @state() private _hasContent = true;

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    
    this._hasContent = nodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.textContent && node.textContent.trim().length > 0)
    );
  }

  private handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  }

  render() {
    const classes = {
      btn: true,
      [`btn--${this.variant}`]: true,
      [`btn--${this.size}`]: true,
      "is-loading": this.loading,
      "btn--icon-only": !this._hasContent,
    };

    return html`
      <button
        type="${this.type}"
        class=${classMap(classes)}
        ?disabled=${this.disabled || this.loading}
        title=${this.title}
        @click=${this.handleClick}
      >
        ${this.loading
          ? html`<div class="spinner" aria-hidden="true"></div>`
          : ""}
        ${!this.loading ? html`<slot name="icon"></slot>` : ""}

        <slot @slotchange=${this.handleSlotChange}></slot>

        ${!this.loading ? html`<slot name="icon-right"></slot>` : ""}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-button": UiButton;
  }
}
