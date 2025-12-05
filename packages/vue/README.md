# Kemi UI Vue

Vue 3 wrapper for [Kemi UI](../core) web components library.

## 📦 Installation

```bash
npm install @klpod221/kemi-ui-vue
```

## 🚀 Quick Start

### Global Installation

```typescript
import { createApp } from 'vue'
import KemiUI from '@klpod221/kemi-ui-vue'
import App from './App.vue'

const app = createApp(App)
app.use(KemiUI)
app.mount('#app')
```

### Individual Component Import

```vue
<script setup lang="ts">
import { KButton, KInput, KForm } from '@klpod221/kemi-ui-vue'
</script>

<template>
  <KButton variant="primary">Click me!</KButton>
  <KInput v-model="name" label="Your Name" />
</template>
```

## 📚 Components

All components support Vue's v-model directive and provide full TypeScript support.

### Form Components

#### KButton
```vue
<KButton variant="primary" size="md" @click="handleClick">
  Click me
</KButton>
```

Props:
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `type`: 'button' | 'submit' | 'reset'

#### KInput
```vue
<KInput
  v-model="email"
  type="email"
  label="Email"
  placeholder="Enter your email"
  rules="required|email"
/>
```

Props:
- `modelValue`: string (v-model)
- `type`: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
- `label`: string
- `placeholder`: string
- `rules`: string
- `disabled`: boolean
- `readonly`: boolean
- `size`: 'sm' | 'md' | 'lg'

Events:
- `update:modelValue`: emitted when value changes
- `input`: emitted on input
- `blur`: emitted on blur
- `focus`: emitted on focus

#### KTextarea
```vue
<KTextarea
  v-model="description"
  label="Description"
  rows="5"
  placeholder="Enter description"
/>
```

#### KSelect
```vue
<script setup>
const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' }
]
</script>

<template>
  <KSelect
    v-model="selected"
    :options="options"
    label="Choose an option"
  />
</template>
```

#### KCheckbox
```vue
<KCheckbox v-model="agreed" label="I agree to terms" />
```

#### KSwitch
```vue
<KSwitch v-model="enabled" size="md" />
```

#### KForm
```vue
<script setup>
import { ref } from 'vue'

const formRef = ref()

const handleSubmit = (values, valid) => {
  if (valid) {
    console.log('Form values:', values)
  }
}
</script>

<template>
  <KForm ref="formRef" @submit="handleSubmit">
    <KInput v-model="email" rules="required|email" label="Email" />
    <KButton type="submit">Submit</KButton>
  </KForm>
</template>
```

### Display Components

#### KCard
```vue
<KCard>
  <h3>Card Title</h3>
  <p>Card content</p>
</KCard>
```

## 🎯 Composables

### useMessage

```typescript
import { useMessage } from '@klpod221/kemi-ui-vue'

const message = useMessage()

message.success('Operation successful!')
message.error('An error occurred')
message.warning('Warning message')
message.info('Information message')
```

### useModal

```typescript
import { useModal } from '@klpod221/kemi-ui-vue'

const modal = useModal()

modal.open({
  title: 'Confirmation',
  content: 'Are you sure?',
  width: '400px'
})
```

### useDrawer

```typescript
import { useDrawer } from '@klpod221/kemi-ui-vue'

const drawer = useDrawer()

drawer.open({
  title: 'Settings',
  position: 'right',
  width: '300px'
})
```

## 🔧 Form Validation

```typescript
import { validate, registerRule, setMessage } from '@klpod221/kemi-ui-vue'

// Built-in rules: required, email, min, max, minLength, maxLength, pattern

// Register custom rule
registerRule('phone', (value) => {
  return /^\d{10}$/.test(value)
})

setMessage('phone', 'Please enter a valid 10-digit phone number')
```

## 💪 TypeScript Support

All components are fully typed with TypeScript:

```typescript
import type { InputProps, SelectOption } from '@klpod221/kemi-ui-vue'

const inputProps: InputProps = {
  modelValue: '',
  type: 'email',
  label: 'Email Address'
}

const options: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2', disabled: true }
]
```

## 📖 Differences from Web Components

The Vue wrapper provides several improvements over using the web components directly:

1. **v-model Support**: All form components support Vue's v-model directive
2. **TypeScript Types**: Full type definitions for props and events
3. **Better IDE Support**: Autocomplete and type checking in Vue templates
4. **Vue DevTools Integration**: Components appear in Vue DevTools
5. **Scoped Slots**: Better slot handling with Vue's scoped slots
6. **Composables**: Vue composables for imperative APIs like modals and messages

## 📝 License

MIT © [Bùi Thanh Xuân](https://klpod221.com)
