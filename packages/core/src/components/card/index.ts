import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./main.scss?inline";

@customElement("ui-card")
export class UiCard extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) title = "";
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";
  @property({ type: Boolean }) hover = false;
  @property({ type: Boolean }) noPadding = false;
  @property({ type: Boolean }) spacing = true;
  @property({ type: Boolean }) center = false;
  @property({ type: String }) iconBackground = "";
  @property({ type: String }) iconColor = "";
  @state() private _hasIconSlot = false;
  @state() private _hasHeaderSlot = false;


  private handleIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this._hasIconSlot = nodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.textContent && node.textContent.trim().length > 0)
    );
  }

  private handleHeaderSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this._hasHeaderSlot = nodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.textContent && node.textContent.trim().length > 0)
    );
  }

  private handleClick(e: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent("click", { detail: e, bubbles: true, composed: true })
    );
  }

  render() {
    const classes = {
      card: true,
      "card--hover": this.hover,
      "card-ripple": this.hover,
      "card--no-padding": this.noPadding,
      [`card--p-${this.size}`]: !this.noPadding,
    };

    const headerClasses = {
      card__header: true,
      "card__header--center": this.center,
    };

    const iconClasses = {
      card__icon: true,
      "card__icon--center": this.center,
      [this.iconBackground]: !!this.iconBackground,
      [this.iconColor]: !!this.iconColor,
    };

    const titleClasses = {
      card__title: true,
      [`card__title--${this.size}`]: true,
    };

    const titleWrapperClasses = {
      "card__title-wrapper": true,
      "card__title-wrapper--center": this.center,
    };

    const contentClasses = {
      card__content: true,
      "card__content--spacing": this.spacing,
      "card__content--center": this.center,
    };

    const footerClasses = {
      card__footer: true,
      "card__footer--center": this.center,
    };

    const showHeader = this._hasHeaderSlot || this.title || this._hasIconSlot;

    return html`
      <div class=${classMap(classes)} @click=${this.handleClick}>
        <!-- Header Section -->
        ${showHeader
          ? html`
              <div class=${classMap(headerClasses)}>
                <!-- Icon -->
                ${this._hasIconSlot
                  ? html`
                      <div class=${classMap(iconClasses)}>
                        <slot
                          name="icon"
                          @slotchange=${this.handleIconSlotChange}
                        ></slot>
                      </div>
                    `
                  : html`<slot
                      name="icon"
                      @slotchange=${this.handleIconSlotChange}
                    ></slot>`}

                <!-- Title -->
                <div class=${classMap(titleWrapperClasses)}>
                  <slot
                    name="header"
                    @slotchange=${this.handleHeaderSlotChange}
                  >
                    ${this.title
                      ? html`<h3 class=${classMap(titleClasses)}>
                          ${this.title}
                        </h3>`
                      : ""}
                  </slot>
                </div>

                <!-- Action Slot -->
                ${!this.center
                  ? html`<div class="card__action">
                      <slot name="action"></slot>
                    </div>`
                  : ""}
              </div>
            `
          : html`
              <!-- Hidden slots to track state if they are added later -->
              <div style="display: none;">
                <slot
                  name="icon"
                  @slotchange=${this.handleIconSlotChange}
                ></slot>
                <slot
                  name="header"
                  @slotchange=${this.handleHeaderSlotChange}
                ></slot>
              </div>
            `}

        <!-- Content Section -->
        <div class=${classMap(contentClasses)}>
          <slot></slot>
        </div>

        <!-- Footer Section -->
        <div class=${classMap(footerClasses)}>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-card": UiCard;
  }
}
