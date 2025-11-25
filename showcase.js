import * as KemiUI from "https://cdn.jsdelivr.net/npm/@klpod221/kemi-ui@latest/dist/kemi-ui.js";
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
  // === FORM INPUTS ===
  {
    name: "ui-input",
    description: "A versatile input component for text, numbers, and other data types.",
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
    name: "ui-textarea",
    description: "A multi-line text input component.",
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
      { name: "maxLength", type: "number", defaultValue: "" },
    ],
    defaultValues: {
      content: "",
    },
  },
  {
    name: "ui-checkbox",
    description: "A checkbox component for boolean selection.",
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
    name: "ui-checkbox-group",
    description: "A group of checkboxes for multiple selections.",
    props: [
      { name: "label", type: "string", defaultValue: "Select Options" },
      { name: "name", type: "string", defaultValue: "options" },
    ],
    defaultValues: {
      options: [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
        { label: "Option 3", value: "opt3" },
      ],
      value: ["opt1"],
    },
  },
  {
    name: "ui-radio",
    description: "A radio button component for single selection.",
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
    name: "ui-radio-group",
    description: "A group of radio buttons for single selection from a list.",
    props: [
      { name: "label", type: "string", defaultValue: "Select One" },
      { name: "name", type: "string", defaultValue: "choice" },
    ],
    defaultValues: {
      options: [
        { label: "Choice 1", value: "choice1" },
        { label: "Choice 2", value: "choice2" },
        { label: "Choice 3", value: "choice3" },
      ],
      value: "choice1",
    },
  },
  {
    name: "ui-switch",
    description: "A toggle switch component for boolean states.",
    props: [
      { name: "label", type: "string", defaultValue: "Switch Label" },
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
    description: "A dropdown selection component.",
    props: [
      { name: "label", type: "string", defaultValue: "Select Label" },
      {
        name: "placeholder",
        type: "string",
        defaultValue: "Select an option...",
      },
      { name: "disabled", type: "boolean", defaultValue: false },
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
    name: "ui-slider",
    description: "A range slider input component.",
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
    name: "ui-colorpicker",
    description: "A color picker input component.",
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
    description: "A date picker input component.",
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
    name: "ui-taginput",
    description: "A tag input component for managing multiple tags.",
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
    name: "ui-progress",
    description: "A progress bar component.",
    props: [
      { name: "value", type: "number", defaultValue: 50 },
      { name: "max", type: "number", defaultValue: 100 },
      { name: "showValue", type: "boolean", defaultValue: true },
      { name: "variant", type: "select", options: ["primary", "success", "warning", "danger"], defaultValue: "primary" },
    ],
    defaultValues: {},
  },
  {
    name: "ui-form",
    description: "A wrapper component for form validation and submission.",
    props: [],
    slots: [
      { name: "default", defaultValue: `
        <ui-input label="Username" rules="required" placeholder="Enter username"></ui-input>
        <ui-input label="Password" type="password" rules="required|min:6" placeholder="Enter password"></ui-input>
        <ui-checkbox label="I agree to terms" rules="required"></ui-checkbox>
        <div style="margin-top: 1rem;">
          <ui-button type="submit">Submit</ui-button>
          <ui-button type="reset" variant="secondary">Reset</ui-button>
        </div>`
      }
    ],
    defaultValues: {},
  },

  // === BUTTONS ===

  {
    name: "ui-button",
    description: "A clickable button component with various variants and sizes.",
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
    slots: [
      { name: "default", defaultValue: "Button" },
      { name: "icon", defaultValue: '<i class="fa-solid fa-check"></i>' },
      { name: "icon-right", defaultValue: '<i class="fa-solid fa-arrow-right"></i>' },
    ],
    defaultValues: {},
  },

  // === DISPLAY & CONTENT ===
  {
    name: "ui-card",
    description: "A container component for grouping content.",
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
    slots: [
      { name: "default", defaultValue: "This is the card content. You can put anything here." },
      { name: "header", defaultValue: "" },
      { name: "footer", defaultValue: '<div style="display: flex; justify-content: flex-end;"><ui-button variant="ghost" size="sm">Read More</ui-button></div>' },
      { name: "icon", defaultValue: '<i class="fa-solid fa-cube"></i>' },
      { name: "action", defaultValue: '<ui-button variant="ghost" size="sm" class="btn--icon-only"><i class="fa-solid fa-ellipsis"></i></ui-button>' },
    ],
    defaultValues: {},
  },
  {
    name: "ui-badge",
    description: "A small status indicator or label.",
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
    slots: [
      { name: "default", defaultValue: "100" },
    ],
    defaultValues: {},
  },
  {
    name: "ui-tag",
    description: "A tag component for labels and categorization.",
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
    slots: [
      { name: "default", defaultValue: "Tag Label" },
      { name: "icon", defaultValue: '<i class="fa-solid fa-star"></i>' },
    ],
    defaultValues: {},
  },
  {
    name: "ui-avatar",
    description: "A component to display user avatars or initials.",
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
    name: "ui-keyboard-badge",
    description: "A component to display keyboard shortcuts.",
    props: [],
    defaultValues: {
      keys: ["Ctrl", "K"],
    },
  },
  {
    name: "ui-tooltip",
    description: "A popup that displays information when hovering over an element.",
    props: [
      { name: "content", type: "string", defaultValue: "Tooltip content" },
      { name: "placement", type: "select", options: ["top", "bottom", "left", "right"], defaultValue: "top" },
    ],
    slots: [
      { name: "trigger", defaultValue: '<ui-button>Hover Me</ui-button>' },
    ],
    defaultValues: {},
  },
  {
    name: "ui-table",
    description: "A data table component with search and pagination.",
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
        {
          name: "Lily Brown",
          age: 32,
          address: "Sidney No. 1 Lake Park",
        },
        {
          name: "David Lee",
          age: 28,
          address: "Los Angeles No. 5 Ocean Drive",
        },
        {
          name: "Sophia Chen",
          age: 35,
          address: "Shanghai No. 10 River Road",
        },
        {
          name: "Mike Johnson",
          age: 40,
          address: "Chicago No. 7 Lake Shore",
        },
        {
          name: "Anna Smith",
          age: 29,
          address: "Boston No. 3 Beacon Street",
        },
        {
          name: "Peter Jones",
          age: 55,
          address: "Miami No. 12 Ocean Boulevard",
        },
        {
          name: "Linda Davis",
          age: 24,
          address: "Seattle No. 8 Pike Place",
        },
        {
          name: "Robert White",
          age: 38,
          address: "Houston No. 2 Energy Corridor",
        },
        {
          name: "Maria Garcia",
          age: 31,
          address: "San Francisco No. 9 Golden Gate",
        },
        {
          name: "William Martinez",
          age: 47,
          address: "Dallas No. 6 Commerce Street",
        },
        {
          name: "Susan Rodriguez",
          age: 26,
          address: "Denver No. 4 Rocky Mountain",
        },
        {
          name: "Charles Wilson",
          age: 60,
          address: "Phoenix No. 1 Desert Oasis",
        },
        {
          name: "Jessica King",
          age: 33,
          address: "Atlanta No. 11 Peach Tree",
        },
        {
          name: "Thomas Moore",
          age: 45,
          address: "Philadelphia No. 13 Liberty Bell",
        },
        {
          name: "Nancy Taylor",
          age: 50,
          address: "Washington D.C. No. 7 Capitol Hill",
        },
        {
          name: "Daniel Clark",
          age: 30,
          address: "Austin No. 2 Congress Avenue",
        },
        {
          name: "Karen Hall",
          age: 37,
          address: "Portland No. 5 Willamette River",
        },
      ],
      content: "",
    },
  },
  {
    name: "ui-code-editor",
    description: "A code editor component with syntax highlighting.",
    props: [
      { name: "language", type: "string", defaultValue: "javascript" },
      { name: "placeholder", type: "string", defaultValue: "Type your code here..." },
      { name: "readonly", type: "boolean", defaultValue: false },
      { name: "showLineNumbers", type: "boolean", defaultValue: true },
      { name: "value", type: "string", defaultValue: "function add(a, b) {\n  return a + b;\n}" },
    ],
    defaultValues: {},
  },
  {
    name: "ui-code-display",
    description: "A component to display code snippets with syntax highlighting.",
    props: [
      { name: "language", type: "string", defaultValue: "javascript" },
      { name: "code", type: "string", defaultValue: "console.log('Hello, World!');" },
      { name: "showLineNumbers", type: "boolean", defaultValue: true },
    ],
    defaultValues: {},
  },

  // === NAVIGATION ===
  {
    name: "ui-breadcrumb",
    description: "A breadcrumb navigation component.",
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
    name: "ui-pagination",
    description: "A navigation component for paginated content.",
    props: [
      { name: "total", type: "number", defaultValue: 50 },
      { name: "current", type: "number", defaultValue: 1 },
      { name: "pageSize", type: "number", defaultValue: 10 },
    ],
    defaultValues: {
      content: "",
    },
  },

  // === FEEDBACK & STATUS ===
  {
    name: "ui-spin",
    description: "A loading spinner component.",
    props: [
      {
        name: "size",
        type: "select",
        options: ["sm", "md", "lg"],
        defaultValue: "md",
      },
      { name: "tip", type: "string", defaultValue: "Loading..." },
    ],
    slots: [
      { name: "default", defaultValue: "" },
    ],
    defaultValues: {},
  },
  {
    name: "ui-skeleton",
    description: "A placeholder component for loading states.",
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
    name: "ui-empty",
    description: "An empty state component for no data scenarios.",
    props: [
      { name: "description", type: "string", defaultValue: "No Data" },
      { name: "image", type: "string", defaultValue: "" },
    ],
    slots: [
      { name: "default", defaultValue: "" },
    ],
    defaultValues: {},
  },
  {
    name: "ui-message",
    description: "A global toast message component for notifications.",
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

  // === OVERLAY & POPUPS ===
  {
    name: "ui-dropdown",
    description: "A toggleable menu for displaying lists of links or actions.",
    props: [
      {
        name: "placement",
        type: "select",
        options: ["bottom-start", "bottom-end", "top-start", "top-end"],
        defaultValue: "bottom-start",
      },
    ],
    slots: [
      { name: "trigger", defaultValue: '<ui-button>Options <i class="fa-solid fa-chevron-down"></i></ui-button>' },
      { name: "default", defaultValue: `
    <div style="padding: 8px; cursor: pointer;">Menu Item 1</div>
    <div style="padding: 8px; cursor: pointer;">Menu Item 2</div>
    <div style="padding: 8px; cursor: pointer;">Menu Item 3</div>` 
      },
    ],
    defaultValues: {},
  },
  {
    name: "ui-popover",
    description: "A popover component for displaying contextual information.",
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
    slots: [
      { name: "trigger", defaultValue: '<ui-button>Info <i class="fa-solid fa-circle-info"></i></ui-button>' },
      { name: "default", defaultValue: '<span>This is the popover content.</span>' },
    ],
    defaultValues: {},
  },
  {
    name: "ui-modal",
    description: "A dialog component that overlays the main content.",
    previewWrapper: "div",
    targetSelector: "ui-modal",
    props: [
      { name: "title", type: "string", defaultValue: "Modal Title" },
      { name: "width", type: "string", defaultValue: "500px" },
      { name: "closable", type: "boolean", defaultValue: true },
    ],
    slots: [
      { name: "default", defaultValue: '<p style="padding: 1rem;">This is the modal content.</p>' },
      { name: "footer", defaultValue: `
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <ui-button variant="secondary" onclick="closeModal()">Cancel</ui-button>
            <ui-button onclick="closeModal()">Confirm</ui-button>
          </div>` 
      },
    ],
    defaultValues: {
      content: `
        <ui-button onclick="openModal()">Open Modal</ui-button>
        
        <ui-modal id="demo-modal" title="Modal Title" width="500px">
          <!-- Slots will be injected here -->
        </ui-modal>
      `,
    },
  },
  {
    name: "ui-drawer",
    description: "A side navigation panel that slides in from the edge.",
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
    slots: [
      { name: "default", defaultValue: '<p style="padding: 1rem;">This is the drawer content.</p>' },
      { name: "footer", defaultValue: `
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <ui-button variant="secondary" onclick="closeDrawer()">Cancel</ui-button>
            <ui-button onclick="closeDrawer()">Confirm</ui-button>
          </div>` 
      },
    ],
    defaultValues: {
      content: `
        <ui-button onclick="openDrawer()">Open Drawer</ui-button>
        
        <ui-drawer id="demo-drawer" title="Drawer Title" placement="right">
          <!-- Slots will be injected here -->
        </ui-drawer>
      `,
    },
  },
];

let activeComponent = null;
let currentProps = {};
let currentSlots = {};

window.navigateTo = function(page, componentName = null) {
  const homePage = document.getElementById("home-page");
  const componentPage = document.getElementById("component-page");
  const navLinks = document.querySelectorAll(".nav-item");

  navLinks.forEach(link => link.classList.remove("active"));

  if (page === "home") {
    homePage.style.display = "block";
    componentPage.style.display = "none";
    activeComponent = null;
    
    // Set Home link active
    const homeLink = document.getElementById("nav-home");
    if (homeLink) homeLink.classList.add("active");
  } else if (page === "component" && componentName) {
    homePage.style.display = "none";
    componentPage.style.display = "block";
    
    setActiveComponent(componentName);
    
    // Set Component link active
    const link = document.getElementById(`nav-${componentName}`);
    if (link) link.classList.add("active");
  }
};

function setActiveComponent(name) {
  activeComponent = COMPONENTS.find((c) => c.name === name);
  if (activeComponent) {
    document.getElementById("component-title").textContent = activeComponent.name;
    document.getElementById("component-description").textContent = activeComponent.description || "No description available.";
    renderShowcase();
  }
}

function renderSidebar() {
  const navLinksContainer = document.getElementById("nav-links");
  
  // Add Home link
  let html = `
    <a class="nav-item" id="nav-home" onclick="navigateTo('home')">
      <i class="fas fa-home" style="margin-right: 0.5rem;"></i> Home
    </a>
    <div style="height: 1px; background: var(--color-border); margin: 1rem 0;"></div>
  `;

  // Group components by category (if we had categories, but for now just list them)
  // We can use the existing order
  
  // Let's try to group them based on the previous reorganization if possible, 
  // but the COMPONENTS array is already flat. 
  // We can just render them as is for now, or add headers if we want.
  
  // For simplicity, let's just render the list as before but with the new onclick handler
  
  COMPONENTS.forEach((component) => {
    html += `
      <a class="nav-item" id="nav-${component.name}" onclick="navigateTo('component', '${component.name}')">
        ${component.name}
      </a>
    `;
  });

  navLinksContainer.innerHTML = html;
}

function renderShowcase() {
  if (!activeComponent) return;

  const container = document.getElementById("showcase-container");

  // reset props when switching components
  currentProps = {};
  activeComponent.props.forEach((prop) => {
    currentProps[prop.name] = prop.defaultValue;
  });

  // reset slots
  currentSlots = {};
  if (activeComponent.slots) {
    activeComponent.slots.forEach((slot) => {
      currentSlots[slot.name] = slot.defaultValue;
    });
  }

  // Merge with other default values (like content, options, etc.)
  if (activeComponent.defaultValues) {
    Object.assign(currentProps, activeComponent.defaultValues);
  }

  container.innerHTML = `
    <div class="preview" id="component-preview"></div>
    <ui-card>
      <h3>Properties</h3>
      <div class="control-grid" id="controls-container"></div>
      
      ${activeComponent.slots && activeComponent.slots.length > 0 ? `
        <h3 style="margin-top: 1.5rem;">Slots</h3>
        <div class="control-grid" id="slots-container"></div>
      ` : ''}
    </ui-card>
    <ui-code-display id="code-snippet" language="markup" label="Source Code"></ui-code-display>
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
        inputHtml = `
          <ui-select 
            value="${value}" 
            label="${prop.name}"
            onchange="updateProp('${prop.name}', event.detail.value)"
          >
            ${prop.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
          </ui-select>
        `;
      } else if (prop.type === "boolean") {
        inputHtml = `
          <ui-switch 
            label="${prop.name}"
            ${value ? "checked" : ""}
            onchange="updateProp('${prop.name}', event.detail.checked)"
          ></ui-switch>
        `;
      } else if (prop.type === "number") {
        inputHtml = `
          <ui-input 
            type="number"
            label="${prop.name}"
            value="${value}" 
            oninput="updateProp('${prop.name}', Number(event.target.value))"
          ></ui-input>
        `;
      } else {
        inputHtml = `
          <ui-input 
            label="${prop.name}"
            value="${value}" 
            oninput="updateProp('${prop.name}', event.target.value)"
          ></ui-input>
        `;
      }

      return `
        <div class="control-item">
          ${inputHtml}
        </div>
      `;
    })
    .join("");

  // Render Slots
  const slotsContainer = document.getElementById("slots-container");
  if (slotsContainer && activeComponent.slots) {
    slotsContainer.innerHTML = activeComponent.slots
      .map((slot) => {
        const value = currentSlots[slot.name];
        // Use code editor for slots as they often contain HTML
        return `
          <div class="control-item" style="grid-column: span 2;">
            <ui-code-editor 
              language="markup"
              label="${slot.name}"
              value="${value.replace(/"/g, '&quot;')}" 
              onchange="updateSlot('${slot.name}', event.detail.value)"
              showLineNumbers
            ></ui-code-editor>
          </div>
        `;
      })
      .join("");
  }
}

window.updateProp = function (name, value) {
  currentProps[name] = value;
  updateComponent();
};

window.updateSlot = function (name, value) {
  currentSlots[name] = value;
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
      // Skip content if it's meant to be innerHTML (not an attribute)
      // Components with slots typically use content as innerHTML
      // Components like tooltip use content as an attribute
      if (key === "content" && !activeComponent.slots) return; // Content is innerHTML for non-slot components

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

    // Apply Slots
    if (activeComponent.slots) {
      // Clear existing content if we are using slots system
      if (!activeComponent.previewWrapper) {
        targetElement.innerHTML = "";
      } else {
        targetElement.innerHTML = "";
      }

      activeComponent.slots.forEach(slot => {
        const slotContent = currentSlots[slot.name];
        if (!slotContent) return;

        const wrapper = document.createElement('div');
        if (slot.name !== 'default') {
          wrapper.setAttribute('slot', slot.name);
        }
        
        wrapper.innerHTML = slotContent;
        
        while (wrapper.firstChild) {
          const child = wrapper.firstChild;
          if (slot.name !== 'default' && child.nodeType === Node.ELEMENT_NODE) {
             child.setAttribute('slot', slot.name);
          }
          targetElement.appendChild(child);
        }
      });
    }
  }

  // Clear and append
  preview.innerHTML = "";
  preview.appendChild(element);

  // Generate code snippet
  let code = `<${activeComponent.name}`;
  
  const attrs = [];
  Object.entries(currentProps).forEach(([key, value]) => {
    if (
      key === "options" ||
      key === "items" ||
      key === "columns" ||
      key === "data" ||
      key === "keys"
    )
      return;

    // Skip content only for non-slot components (where content is innerHTML)
    if (key === "content" && !activeComponent.slots) return;

    if (typeof value === "boolean") {
      if (value) attrs.push(key);
    } else {
      attrs.push(`${key}="${value}"`);
    }
  });

  if (attrs.length > 0) {
    code += '\n  ' + attrs.join('\n  ');
    code += '\n>';
  } else {
    code += '>';
  }
  
  // Slot content generation
  if (activeComponent.name === "ui-select" && currentProps.options) {
    code += '\n';
    currentProps.options.forEach(opt => {
      if (typeof opt === 'object' && opt !== null) {
        code += `  <option value="${opt.value}">${opt.label}</option>\n`;
      } else {
        code += `  <option value="${opt}">${opt}</option>\n`;
      }
    });
  } else if (activeComponent.slots) {
    code += '\n';
    activeComponent.slots.forEach(slot => {
      const val = currentSlots[slot.name];
      if (val) {
        if (slot.name === 'default') {
          code += `  ${val}\n`;
        } else {
          if (val.trim().startsWith('<')) {
             code += `  <div slot="${slot.name}">${val}</div>\n`;
          } else {
             code += `  <span slot="${slot.name}">${val}</span>\n`;
          }
        }
      }
    });
  } else if (activeComponent.previewWrapper) {
     code += `\n  <!-- Content -->\n`;
  } else if (currentProps.content) {
    code += `\n  ${currentProps.content}\n`;
  }
  
  code += `</${activeComponent.name}>`;
  
  // Update the code display component
  if (codeSnippet) {
    codeSnippet.setAttribute('code', code);
    // Also set property directly to ensure update if attribute doesn't trigger it immediately or if complex
    codeSnippet.code = code;
  }
}

// Initial render
renderSidebar();
window.navigateTo('home');
