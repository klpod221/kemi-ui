import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markup"; // html
import styles from "./main.scss?inline";

@customElement("ui-code-display")
export class UiCodeDisplay extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) code = "";
  @property({ type: String }) language = "javascript";
  @property({ type: String }) label = "";

  @property({ type: Boolean }) showLineNumbers = true;

  @state() private _copied = false;

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("code") || changedProperties.has("language")) {
      this.highlight();
    }
  }

  private highlight() {
    // Prism highlights automatically if we use the correct class, 
    // but since we are in Shadow DOM, we might need to trigger it manually or just rely on innerHTML
    // Actually, Prism.highlightElement works on an element.
    // Or we can use Prism.highlight(text, grammar, language) to get HTML string.
    
    // Using Prism.highlight is safer and easier in Lit to just render the HTML.
  }

  private getHighlightedCode() {
    const lang = Prism.languages[this.language] || Prism.languages.javascript;
    return Prism.highlight(this.code, lang, this.language);
  }

  private async handleCopy() {
    try {
      await navigator.clipboard.writeText(this.code);
      this._copied = true;
      setTimeout(() => {
        this._copied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  private renderLineNumbers() {
    if (!this.showLineNumbers) return "";
    const lines = this.code.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  }

  render() {
    return html`
      <div class="code-display">
        <div class="code-display__header">
          <span class="code-display__language">
            ${this.label}
            ${this.label && this.language ? html`<span style="opacity: 0.5; margin-left: 8px;">${this.language}</span>` : this.language}
          </span>
          <button class="code-display__copy-btn" @click=${this.handleCopy}>
            ${this._copied
              ? html`
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Copied!
                `
              : html`
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  Copy
                `}
          </button>
        </div>
        <div class="code-display__body">
          ${this.showLineNumbers
            ? html`<div class="code-display__line-numbers">${this.renderLineNumbers()}</div>`
            : ""}
          <pre class="code-display__content language-${this.language}"><code class="language-${this.language}" .innerHTML=${this.getHighlightedCode()}></code></pre>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-code-display": UiCodeDisplay;
  }
}
