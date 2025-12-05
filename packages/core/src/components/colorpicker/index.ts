import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

@customElement("ui-colorpicker")
export class UiColorPicker extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `colorpicker-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: String }) value = "#3b82f6";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) helperText = "";

  @property({ type: String }) rules = "";
  @property({ type: String }) errorMessage = "";
  @state() private _internalErrorMessage = "";

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

    const error = validate(this.value, this.rules, allValues);
    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  private handleColorChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  render() {
    const hasError = !!(this._internalErrorMessage || this.errorMessage);
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    return html`
      <div class="colorpicker-wrapper">
        ${this.label
          ? html`<label for=${this.id} class="label">
              ${this.label}
              ${this.isRequired ? html`<span class="required">*</span>` : ""}
            </label>`
          : ""}

        <div
          class="colorpicker-container ${hasError
            ? "colorpicker-container--error"
            : ""}"
        >
          <div
            class="colorpicker-swatch"
            style="background-color: ${this.value}"
          >
            <input
              type="color"
              id=${this.id}
              class="colorpicker-input"
              .value=${this.value}
              ?disabled=${this.disabled}
              @change=${this.handleColorChange}
              @input=${this.handleInputChange}
            />
          </div>
          <input
            type="text"
            class="colorpicker-text"
            .value=${this.value}
            ?disabled=${this.disabled}
            @input=${this.handleInputChange}
            @change=${this.handleColorChange}
          />
        </div>

        ${errorMsg
          ? html`<div class="error-message">${errorMsg}</div>`
          : this.helperText
          ? html`<div class="helper-text">${this.helperText}</div>`
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-colorpicker": UiColorPicker;
  }
}
