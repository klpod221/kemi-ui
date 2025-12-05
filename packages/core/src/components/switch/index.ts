import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

@customElement("ui-switch")
export class UiSwitch extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `switch-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: Boolean }) checked = false;
  @property({ type: String }) value = "";
  @property({ type: String }) name = "";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";

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
          getValue: () => this.checked,
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

    let error = "";
    if (this.rules.includes("required") && !this.checked) {
      error = "This field is required";
    } else {
      error = validate(this.checked, this.rules, allValues);
    }

    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  private handleChange(e: Event) {
    if (this.disabled) return;
    
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    const controlWrapperClasses = {
      "switch-wrapper": true, 
      "switch-wrapper--disabled": this.disabled,
    };

    const switchClasses = {
      switch: true,
      [`switch--${this.size}`]: true,
      "switch--checked": this.checked,
      "switch--disabled": this.disabled,
    };

    return html`
      <div class="switch-container">
        ${this.label
          ? html`
              <label class="label" for=${this.id}>
                ${this.label}
                ${this.isRequired ? html`<span class="required">*</span>` : ""}
              </label>
            `
          : ""}

        <label class=${classMap(controlWrapperClasses)}>
          <input
            type="checkbox"
            id=${this.id}
            name=${this.name}
            class="switch-input"
            .checked=${this.checked}
            .value=${this.value}
            ?disabled=${this.disabled}
            @change=${this.handleChange}
          />
          
          <div class=${classMap(switchClasses)}>
            <div class="switch-thumb"></div>
          </div>
        </label>

        ${errorMsg ? html`<span class="error-message">${errorMsg}</span>` : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-switch": UiSwitch;
  }
}