import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@customElement("ui-radio-group")
export class UiRadioGroup extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `radio-group-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: String }) value = "";
  @property({ type: String }) name = "";
  @property({ type: String }) label = "";
  @property({ type: Array }) options: RadioOption[] = [];
  @property({ type: Boolean }) disabled = false;
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

  public validate(allValues: any = {}): string {
    if (!this.rules) return "";

    const error = validate(this.value, this.rules, allValues);
    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  private handleRadioChange(optionValue: string) {
    this.value = optionValue;

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );

    // Trigger validation
    const form = this.closest("ui-form");
    if (form) {
      this.dispatchEvent(
        new CustomEvent("ui-input-validate", {
          detail: { id: this.id },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    return html`
      <div class="radio-group-wrapper">
        ${this.label
          ? html`<label class="group-label">
              ${this.label}
              ${this.isRequired ? html`<span class="required">*</span>` : ""}
            </label>`
          : ""}
        <div class="radio-group">
          ${this.options.map(
            (option) => html`
              <ui-radio
                .label=${option.label}
                .value=${option.value}
                .name=${this.name || this.id}
                .checked=${this.value === option.value}
                ?disabled=${this.disabled || option.disabled}
                @change=${() => this.handleRadioChange(option.value)}
              ></ui-radio>
            `
          )}
        </div>
        ${errorMsg ? html`<div class="error-message">${errorMsg}</div>` : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-radio-group": UiRadioGroup;
  }
}
