import * as KemiUI from "/dist/kemi-ui.js";
window.KemiUI = KemiUI;

// Global helper functions for showcase interactions
window.openDrawer = function() {
  window.KemiUI.drawer.open('demo-drawer');
};

window.closeDrawer = function() {
  window.KemiUI.drawer.close('demo-drawer');
};

window.openModal = function() {
  window.KemiUI.modal.open('demo-modal');
};

window.closeModal = function() {
  window.KemiUI.modal.close('demo-modal');
};

window.showMessage = function() {
  // Find controls by their onchange/oninput attribute content
  // We use double quotes for the attribute selector to avoid escaping issues
  const typeControl = Array.from(document.querySelectorAll('ui-select')).find(el => el.getAttribute('onchange')?.includes("'type'"));
  const contentControl = Array.from(document.querySelectorAll('ui-input')).find(el => el.getAttribute('oninput')?.includes("'content'"));
  const durationControl = Array.from(document.querySelectorAll('ui-input')).find(el => el.getAttribute('oninput')?.includes("'duration'"));
  
  const type = typeControl?.value || 'success';
  const content = contentControl?.value || 'This is a message';
  const duration = Number(durationControl?.value || 3000);
  
  window.KemiUI.message.open(type, content, duration);
};

const COMPONENTS = [
  {
    name: "ui-button",
    props: [
      {
        name: "variant",
        type: "select",
        options: [
          "primary",
          "secondary",
          "success",
          "warning",
          "danger",
          "ghost",
          "outline",
        ],
        defaultValue: "primary",
      },
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "loading", type: "boolean", defaultValue: false },
      { name: "title", type: "string", defaultValue: "" },
      {
        name: "type",
        type: "select",
        options: ["button", "submit", "reset"],
        defaultValue: "button",
      },
    ],
    defaultValues: {
      content: "Button",
    },
  },
  {
    name: "ui-input",
    props: [
      { name: "label", type: "string", defaultValue: "Label" },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "Placeholder...",
      },
      { name: "value", type: "string", defaultValue: "" },
      {
        name: "type",
        type: "select",
        options: [
          "text",
          "password",
          "email",
          "number",
          "tel",
          "url",
          "search",
        ],
        defaultValue: "text",
      },
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "readonly", type: "boolean", defaultValue: false },
      { name: "helperText", type: "string", defaultValue: "Helper text" },
      { name: "errorMessage", type: "string", defaultValue: "" },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-badge",
    props: [
      {
        name: "variant",
        type: "select",
        options: ["primary", "success", "warning", "danger", "info"],
        defaultValue: "primary",
      },
      { name: "dot", type: "boolean", defaultValue: false },
      { name: "max", type: "number", defaultValue: 99 },
    ],
    defaultValues: {
      content: "100",
    },
  },
  {
    name: "ui-checkbox",
    props: [
      { name: "label", type: "string", defaultValue: "Checkbox Label" },
      { name: "checked", type: "boolean", defaultValue: false },
      { name: "disabled", type: "boolean", defaultValue: false },
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-avatar",
    props: [
      {
        name: "src",
        type: "string",
        defaultValue: "https://i.pravatar.cc/150",
      },
      { name: "alt", type: "string", defaultValue: "User Avatar" },
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg", "xl"],
        defaultValue: "md",
      },
      {
        name: "shape",
        type: "select",
        options: ["circle", "square"],
        defaultValue: "circle",
      },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-card",
    props: [
      { name: "title", type: "string", defaultValue: "Card Title" },
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
      { name: "hover", type: "boolean", defaultValue: false },
      { name: "noPadding", type: "boolean", defaultValue: false },
      { name: "spacing", type: "boolean", defaultValue: true },
      { name: "center", type: "boolean", defaultValue: false },
    ],
    defaultValues: {
      content: "This is the card content. You can put anything here.",
    },
  },
  {
    name: "ui-radio",
    props: [
      { name: "label", type: "string", defaultValue: "Radio Option" },
      { name: "checked", type: "boolean", defaultValue: false },
      { name: "disabled", type: "boolean", defaultValue: false },
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-select",
    props: [
      { name: "label", type: "string", defaultValue: "Select Label" },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "Select an option...",
      },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "searchable", type: "boolean", defaultValue: false },
      { name: "helperText", type: "string", defaultValue: "" },
    ],
    defaultValues: {
      content: "",
      options: [
        { value: "opt1", label: "Option 1" },
        { value: "opt2", label: "Option 2" },
        { value: "opt3", label: "Option 3" },
      ],
    },
  },
  {
    name: "ui-tag",
    props: [
      {
        name: "variant",
        type: "select",
        options: ["primary", "success", "warning", "danger", "info"],
        defaultValue: "primary",
      },
      { name: "closable", type: "boolean", defaultValue: false },
      { name: "color", type: "string", defaultValue: "" },
    ],
    defaultValues: {
      content: "Tag Label",
    },
  },
  {
    name: "ui-textarea",
    props: [
      { name: "label", type: "string", defaultValue: "Textarea Label" },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "Type here...",
      },
      { name: "rows", type: "number", defaultValue: 3 },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "readonly", type: "boolean", defaultValue: false },
      { name: "showCounter", type: "boolean", defaultValue: false },
      { name: "maxLength", type: "string", defaultValue: "" },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-breadcrumb",
    props: [],
    defaultValues: {
      items: [
        { label: "Home", href: "#" },
        { label: "Library", href: "#" },
        { label: "Data" },
      ],
    },
  },
  {
    name: "ui-colorpicker",
    props: [
      { name: "label", type: "string", defaultValue: "Color Picker" },
      { name: "value", type: "string", defaultValue: "#3b82f6" },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "helperText", type: "string", defaultValue: "" },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-datepicker",
    props: [
      { name: "label", type: "string", defaultValue: "Date Picker" },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "Select date...",
      },
      { name: "disabled", type: "boolean", defaultValue: false },
      { name: "min", type: "string", defaultValue: "" },
      { name: "max", type: "string", defaultValue: "" },
      { name: "helperText", type: "string", defaultValue: "" },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-dropdown",
    props: [
      {
        name: "placement",
        type: "select",
        options: ["bottom-start", "bottom-end", "top-start", "top-end"],
        defaultValue: "bottom-start",
      },
    ],
    defaultValues: {
      content: `
  <ui-button slot="trigger">Click me</ui-button>
  <div>
    <div style="padding: 8px; cursor: pointer;">Menu Item 1</div>
    <div style="padding: 8px; cursor: pointer;">Menu Item 2</div>
    <div style="padding: 8px; cursor: pointer;">Menu Item 3</div>
  </div>
`,
    },
  },
  {
    name: "ui-empty",
    props: [
      { name: "description", type: "string", defaultValue: "No Data" },
      { name: "image", type: "string", defaultValue: "" },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-keyboard-badge",
    props: [],
    defaultValues: {
      keys: ["Ctrl", "K"],
    },
  },
  {
    name: "ui-pagination",
    props: [
      { name: "total", type: "number", defaultValue: 50 },
      { name: "current", type: "number", defaultValue: 1 },
      { name: "pageSize", type: "number", defaultValue: 10 },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-popover",
    props: [
      { name: "title", type: "string", defaultValue: "Popover Title" },
      {
        name: "placement",
        type: "select",
        options: ["top", "bottom", "left", "right"],
        defaultValue: "top",
      },
      {
        name: "trigger",
        type: "select",
        options: ["hover", "click"],
        defaultValue: "hover",
      },
    ],
    defaultValues: {
      content: `
  <ui-button slot="trigger">Hover me</ui-button>
  <span>This is the popover content.</span>
`,
    },
  },
  {
    name: "ui-skeleton",
    props: [
      {
        name: "variant",
        type: "select",
        options: ["text", "circle", "rectangle", "list"],
        defaultValue: "text",
      },
      { name: "width", type: "string", defaultValue: "100%" },
      { name: "height", type: "string", defaultValue: "auto" },
      { name: "count", type: "number", defaultValue: 1 },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-slider",
    props: [
      { name: "label", type: "string", defaultValue: "Slider Label" },
      { name: "value", type: "number", defaultValue: 50 },
      { name: "min", type: "number", defaultValue: 0 },
      { name: "max", type: "number", defaultValue: 100 },
      { name: "step", type: "number", defaultValue: 1 },
      { name: "showValue", type: "boolean", defaultValue: true },
      { name: "disabled", type: "boolean", defaultValue: false },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-spin",
    props: [
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
      { name: "tip", type: "string", defaultValue: "Loading..." },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-table",
    props: [
      { name: "searchable", type: "boolean", defaultValue: true },
      { name: "pagination", type: "boolean", defaultValue: true },
    ],
    defaultValues: {
      columns: [
        { title: "Name", key: "name", sortable: true },
        { title: "Age", key: "age", sortable: true },
        { title: "Address", key: "address" },
      ],
      data: [
        {
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
        },
        {
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
        },
        {
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
        },
      ],
      content: "",
    },
  },
  {
    name: "ui-taginput",
    props: [
      { name: "label", type: "string", defaultValue: "Tags" },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "Add a tag...",
      },
      { name: "maxTags", type: "number", defaultValue: 5 },
      { name: "disabled", type: "boolean", defaultValue: false },
      {
        name: "helperText",
        type: "string",
        defaultValue: "Press Enter to add",
      },
    ],
    defaultValues: {
      value: ["Tag 1", "Tag 2"],
      content: "",
    },
  },
  {
    name: "ui-form",
    props: [],
    defaultValues: {
      content: `
        <ui-input label="Username" rules="required" placeholder="Enter username"></ui-input>
        <ui-input label="Password" type="password" rules="required|min:6" placeholder="Enter password"></ui-input>
        <ui-checkbox label="I agree to terms" rules="required"></ui-checkbox>
        <div style="margin-top: 1rem;">
          <ui-button type="submit">Submit</ui-button>
          <ui-button type="reset" variant="secondary">Reset</ui-button>
        </div>
      `,
    },
  },
  {
    name: "ui-message",
    previewWrapper: "div",
    targetSelector: "ui-message",
    props: [
      {
        name: "type",
        type: "select",
        options: ["success", "error", "info", "warning", "loading"],
        defaultValue: "success",
      },
      { name: "duration", type: "number", defaultValue: 3000 },
    ],
    defaultValues: {
      content: `
        <ui-button onclick="showMessage()">Show Message</ui-button>
      `,
    },
  },
  {
    name: "ui-drawer",
    previewWrapper: "div",
    targetSelector: "ui-drawer",
    props: [
      { name: "title", type: "string", defaultValue: "Drawer Title" },
      {
        name: "placement",
        type: "select",
        options: ["right", "left", "top", "bottom"],
        defaultValue: "right",
      },
      { name: "width", type: "string", defaultValue: "400px" },
    ],
    defaultValues: {
      content: `
        <ui-button onclick="openDrawer()">Open Drawer</ui-button>
        
        <ui-drawer id="demo-drawer" title="Drawer Title" placement="right">
          <p style="padding: 1rem;">This is the drawer content.</p>
          <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
            <ui-button variant="secondary" onclick="closeDrawer()">Cancel</ui-button>
            <ui-button onclick="closeDrawer()">Confirm</ui-button>
          </div>
        </ui-drawer>
      `,
    },
  },
  {
    name: "ui-modal",
    previewWrapper: "div",
    targetSelector: "ui-modal",
    props: [
      { name: "title", type: "string", defaultValue: "Modal Title" },
      { name: "width", type: "string", defaultValue: "500px" },
      { name: "closable", type: "boolean", defaultValue: true },
    ],
    defaultValues: {
      content: `
        <ui-button onclick="openModal()">Open Modal</ui-button>
        
        <ui-modal id="demo-modal" title="Modal Title" width="500px">
          <p style="padding: 1rem;">This is the modal content.</p>
          <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
            <ui-button variant="secondary" onclick="closeModal()">Cancel</ui-button>
            <ui-button onclick="closeModal()">Confirm</ui-button>
          </div>
        </ui-modal>
      `,
    },
  },
];

let activeComponent = COMPONENTS[0];
let currentProps = {};

function renderSidebar() {
  const navLinks = document.getElementById("nav-links");
  navLinks.innerHTML = COMPONENTS.map(
    (comp) => `
    <a class="nav-item ${
      comp.name === activeComponent.name ? "active" : ""
    }" 
       onclick="setActiveComponent('${comp.name}')">
      ${comp.name}
    </a>
  `
  ).join("");
}

function setActiveComponent(name) {
  activeComponent = COMPONENTS.find((c) => c.name === name);
  renderSidebar();
  renderShowcase();
}

function renderShowcase() {
  const container = document.getElementById("showcase-container");

  // reset props when switching components
  currentProps = {};
  activeComponent.props.forEach((prop) => {
    currentProps[prop.name] = prop.defaultValue;
  });

  // Merge with other default values (like content, options, etc.)
  if (activeComponent.defaultValues) {
    Object.assign(currentProps, activeComponent.defaultValues);
  }

  container.innerHTML = `
    <div class="showcase-block">
      <div class="preview" id="component-preview"></div>
      <div class="controls">
        <h3>Properties</h3>
        <div class="control-grid" id="controls-container"></div>
      </div>
      <pre class="code-block"><code id="code-snippet"></code></pre>
    </div>
  `;

  renderControls();
  updateComponent();
}

function renderControls() {
  const controlsContainer = document.getElementById("controls-container");
  if (activeComponent.props.length === 0) {
    controlsContainer.innerHTML = "<p>No configurable properties.</p>";
    return;
  }

  controlsContainer.innerHTML = activeComponent.props
    .map((prop) => {
      const value = currentProps[prop.name];
      let inputHtml = "";

      if (prop.type === "select") {
        // Convert simple string options to object array for ui-select
        const options = prop.options.map((opt) => ({
          label: opt,
          value: opt,
        }));
        const optionsJson = JSON.stringify(options).replace(
          /"/g,
          "&quot;"
        );

        inputHtml = `
          <ui-select 
            value="${value}" 
            options="${optionsJson}"
            onchange="updateProp('${prop.name}', event.detail.value)"
          ></ui-select>
        `;
      } else if (prop.type === "boolean") {
        inputHtml = `
          <ui-checkbox 
            ${value ? "checked" : ""} 
            onchange="updateProp('${prop.name}', event.detail.checked)"
          ></ui-checkbox>
        `;
      } else if (prop.type === "number") {
        inputHtml = `
          <ui-input 
            type="number"
            value="${value}" 
            oninput="updateProp('${prop.name}', Number(event.target.value))"
          ></ui-input>
        `;
      } else {
        inputHtml = `
          <ui-input 
            value="${value}" 
            oninput="updateProp('${prop.name}', event.target.value)"
          ></ui-input>
        `;
      }

      return `
        <div class="control-item">
          <label>${prop.name}</label>
          ${inputHtml}
        </div>
      `;
    })
    .join("");
}

window.updateProp = function (name, value) {
  currentProps[name] = value;
  updateComponent();
};

window.setActiveComponent = setActiveComponent;

function updateComponent() {
  const preview = document.getElementById("component-preview");
  const codeSnippet = document.getElementById("code-snippet");

  // Create component element
  let element;
  let targetElement;

  if (activeComponent.previewWrapper) {
    element = document.createElement(activeComponent.previewWrapper);
    // For wrapped components, content is the innerHTML of the wrapper
    if (currentProps.content) {
      element.innerHTML = currentProps.content;
    }
    // Find the actual component to apply props to
    if (activeComponent.targetSelector) {
      targetElement = element.querySelector(activeComponent.targetSelector);
    }
  } else {
    element = document.createElement(activeComponent.name);
    targetElement = element;
    // For standard components, content goes INSIDE
    if (currentProps.content) {
      element.innerHTML = currentProps.content;
    }
  }

  // Apply properties to targetElement
  if (targetElement) {
    Object.entries(currentProps).forEach(([key, value]) => {
      if (key === "content") return; // Content is already handled

      if (
        key === "options" ||
        key === "items" ||
        key === "columns" ||
        key === "data" ||
        key === "value" ||
        key === "keys"
      ) {
        // Complex properties need to be set as properties, not attributes
        targetElement[key] = value;
      } else {
        // Boolean attributes
        if (typeof value === "boolean") {
          if (value) {
            targetElement.setAttribute(key, "");
            targetElement[key] = true;
          } else {
            targetElement.removeAttribute(key);
            targetElement[key] = false;
          }
        } else {
          targetElement.setAttribute(key, value);
          targetElement[key] = value;
        }
      }
    });
  }

  // Clear and append
  preview.innerHTML = "";
  preview.appendChild(element);

  // Generate code snippet
  let code = `<${activeComponent.name}`;
  Object.entries(currentProps).forEach(([key, value]) => {
    if (
      key === "content" ||
      key === "options" ||
      key === "items" ||
      key === "columns" ||
      key === "data" ||
      key === "keys"
    )
      return;

    if (typeof value === "boolean") {
      if (value) code += ` ${key}`;
    } else if (
      value !==
      activeComponent.props.find((p) => p.name === key)?.defaultValue
    ) {
      code += ` ${key}="${value}"`;
    }
  });

  code += `>`;
  
  // For snippet, we usually want to show the inner content of the component
  // But for wrapped components, the 'content' prop is the wrapper content.
  // We might need a way to specify "snippet content".
  // For now, let's just show "..." if it's a wrapper, or try to extract relevant content.
  if (activeComponent.previewWrapper) {
     code += `\n  <!-- Content -->\n`;
  } else if (currentProps.content) {
    code += `\n  ${currentProps.content}\n`;
  }
  code += `</${activeComponent.name}>`;

  codeSnippet.textContent = code;
}

// Initial render
renderSidebar();
renderShowcase();
