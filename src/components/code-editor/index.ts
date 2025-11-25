import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markup";
import styles from "./main.scss?inline";

@customElement("ui-code-editor")
export class UiCodeEditor extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) value = "";
  @property({ type: String }) language = "javascript";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) showLineNumbers = true;
  @property({ type: Boolean }) readonly = false;

  @query("textarea") textarea!: HTMLTextAreaElement;
  @query("pre") pre!: HTMLPreElement;
  @query(".code-editor__line-numbers") lineNumbers!: HTMLDivElement;

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
    this.requestUpdate();
  }

  private handleScroll() {
    if (this.textarea && this.pre) {
      this.pre.scrollTop = this.textarea.scrollTop;
      this.pre.scrollLeft = this.textarea.scrollLeft;
    }
    if (this.textarea && this.lineNumbers) {
      this.lineNumbers.scrollTop = this.textarea.scrollTop;
    }
  }

  
  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = this.textarea.selectionStart;
      const end = this.textarea.selectionEnd;

      
      this.value =
        this.value.substring(0, start) + "  " + this.value.substring(end);

      
      this.updateComplete.then(() => {
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
      });
      
      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private getHighlightedCode() {
    
    
    
    let code = this.value;
    if (code.endsWith("\n")) {
      code += " ";
    }
    
    const lang = Prism.languages[this.language] || Prism.languages.javascript;
    return Prism.highlight(code, lang, this.language);
  }

  private renderLineNumbers() {
    if (!this.showLineNumbers) return "";
    const lines = this.value.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  }

  render() {
    return html`
      <div class="code-editor-wrapper">
        ${this.label
          ? html`<label class="label">${this.label}</label>`
          : ""}
        <div class="code-editor">
          <div class="code-editor__container">
            ${this.showLineNumbers
              ? html`<div class="code-editor__line-numbers">${this.renderLineNumbers()}</div>`
              : ""}
            <div class="code-editor__content-wrapper">
              <textarea
                class="code-editor__textarea"
                .value=${this.value}
                @input=${this.handleInput}
                @scroll=${this.handleScroll}
                @keydown=${this.handleKeyDown}
                spellcheck="false"
                ?readonly=${this.readonly}
                placeholder=${this.placeholder}
              ></textarea>
              <pre class="code-editor__pre" aria-hidden="true"><code class="language-${this.language}" .innerHTML=${this.getHighlightedCode()}></code></pre>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-code-editor": UiCodeEditor;
  }
}
