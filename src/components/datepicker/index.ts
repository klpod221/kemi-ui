import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

@customElement("ui-datepicker")
export class UiDatepicker extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `datepicker-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: String }) value = "";
  @property({ type: String }) label = "";
  @property({ type: String }) placeholder = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) min = "";
  @property({ type: String }) max = "";
  @property({ type: String }) rules = "";
  @property({ type: String }) helperText = "";
  @property({ type: String }) errorMessage = "";
  @state() private _internalErrorMessage = "";

  @state() private _focused = false;

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

  disconnectedCallback() {
    super.disconnectedCallback();
    this.dispatchEvent(
      new CustomEvent("ui-form-unregister", {
        detail: { id: this.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleInput(e: Event) {
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

  private handleChange(e: Event) {
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

  public validate(allValues: any = {}): string {
    if (!this.rules) return "";

    // Import validate dynamically or assume it's available globally/imported
    const error = validate(this.value, this.rules, allValues);
    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  render() {
    const hasError = !!(this._internalErrorMessage || this.errorMessage);
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    const classes = {
      "datepicker-wrapper": true,
      "datepicker-wrapper--focused": this._focused,
      "datepicker-wrapper--error": hasError,
      "datepicker-wrapper--disabled": this.disabled,
    };

    return html`
      <div class="datepicker-container">
        ${this.label
          ? html`<label class="label" for=${this.id}>
              ${this.label}
              ${this.isRequired ? html`<span class="required">*</span>` : ""}
            </label>`
          : ""}

        <div class=${classMap(classes)}>
          <input
            type="date"
            id=${this.id}
            class="datepicker-input"
            .value=${this.value}
            min=${this.min}
            max=${this.max}
            ?disabled=${this.disabled}
            @input=${this.handleInput}
            @change=${this.handleChange}
            @focus=${() => (this._focused = true)}
            @blur=${() => (this._focused = false)}
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
    "ui-datepicker": UiDatepicker;
  }
}
