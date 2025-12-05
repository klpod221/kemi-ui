// Re-export types from core library
export type {
  SelectOption,
  CheckboxOption,
  RadioOption,
  TableColumn,
  DataSourceParams,
  DataSourceResult,
} from '@klpod221/kemi-ui'

// Vue-specific prop types
export interface BaseComponentProps {
  id?: string
}

export interface FormControlProps extends BaseComponentProps {
  label?: string
  disabled?: boolean
  helperText?: string
  errorMessage?: string
  rules?: string
}

export interface InputProps extends FormControlProps {
  modelValue?: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  readonly?: boolean
  autocomplete?: string
  autofocus?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export interface TextareaProps extends FormControlProps {
  modelValue?: string
  placeholder?: string
  readonly?: boolean
  rows?: number
  autofocus?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  title?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface CheckboxProps extends BaseComponentProps {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  indeterminate?: boolean
}

export interface SwitchProps extends BaseComponentProps {
  modelValue?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export interface SelectProps extends FormControlProps {
  modelValue?: string
  options?: import('@klpod221/kemi-ui').SelectOption[]
  placeholder?: string
}

export interface SliderProps extends FormControlProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
}

// Event payload types
export interface InputEvent {
  value: string
}

export interface ChangeEvent {
  value: any
}
