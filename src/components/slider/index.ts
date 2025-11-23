import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

@customElement("ui-slider")
export class UiSlider extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `slider-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: String }) label = "";
  @property({ type: Boolean }) showValue = true;
  @property({ type: Boolean }) disabled = false;

  @property({ type: String }) rules = "";
  @property({ type: String }) errorMessage = "";
  @state() private _internalErrorMessage = "";

  @query("input") inputElement!: HTMLInputElement;

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(
      new CustomEvent("ui-form-register", {
        detail: {
          id: this.id,
          validate: this.validate.bind(this),
          getValue: () => this.value,
          element: this,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  public validate(allValues: any = {}): string {
    if (!this.rules) return "";

    // Slider usually has a value, so "required" is always true unless min is > value?
    // But let's support custom validation rules if any.
    const error = validate(this.value, this.rules, allValues);
    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = parseFloat(target.value);

    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = parseFloat(target.value);

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private get percentage(): number {
    return ((this.value - this.min) / (this.max - this.min)) * 100;
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  render() {
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    return html`
      <div class="slider-wrapper">
        ${this.label || this.showValue
          ? html`
              <div class="slider-header">
                ${this.label
                  ? html`<label class="label">
                      ${this.label}
                      ${this.isRequired
                        ? html`<span class="required">*</span>`
                        : ""}
                    </label>`
                  : ""}
                ${this.showValue
                  ? html`<span class="slider-value">${this.value}</span>`
                  : ""}
              </div>
            `
          : ""}

        <div class="slider-container">
          <input
            type="range"
            id=${this.id}
            class="slider"
            .value=${String(this.value)}
            min=${this.min}
            max=${this.max}
            step=${this.step}
            ?disabled=${this.disabled}
            @input=${this.handleInput}
            @change=${this.handleChange}
            style="--percentage: ${this.percentage}%"
          />
        </div>
        ${errorMsg ? html`<div class="error-message">${errorMsg}</div>` : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-slider": UiSlider;
  }
}
