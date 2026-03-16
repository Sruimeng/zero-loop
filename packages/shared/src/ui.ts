import { z } from 'zod'

// ============================================================================
// UI Slot: 9-grid layout
// ============================================================================

export const UISlotSchema = z.enum([
  'TOP_LEFT',
  'TOP_CENTER',
  'TOP_RIGHT',
  'MIDDLE_LEFT',
  'CENTER',
  'MIDDLE_RIGHT',
  'BOTTOM_LEFT',
  'BOTTOM_CENTER',
  'BOTTOM_RIGHT',
  'OVERLAY',
]).describe('Screen position (9-grid + overlay)')

export type UISlot = z.infer<typeof UISlotSchema>

// ============================================================================
// Basic Components
// ============================================================================

// Icon
const IconComponentSchema = z.object({
  component: z.literal('Icon'),
  props: z.object({
    icon: z.string().describe('UnoCSS icon class (e.g., i-nexus:arrow)'),
    className: z.string().optional().describe('Additional CSS classes'),
  }),
})

// Button
const ButtonComponentSchema = z.object({
  component: z.literal('Button'),
  props: z.object({
    text: z.string().describe('Button label'),
    variant: z.enum(['solid', 'hollow', 'plain']).default('solid'),
    size: z.enum(['small', 'middle', 'large']).default('large'),
    disabled: z.boolean().default(false),
    action: z.string().describe('Event name to trigger'),
  }),
})

// IconButton
const IconButtonComponentSchema = z.object({
  component: z.literal('IconButton'),
  props: z.object({
    icon: z.string().describe('UnoCSS icon class'),
    text: z.string().optional().describe('Button text'),
    variant: z.enum(['solid', 'hollow', 'plain']).default('solid'),
    size: z.enum(['small', 'middle', 'large']).default('large'),
    disabled: z.boolean().default(false),
    action: z.string().describe('Event name to trigger'),
  }),
})

// Badge
const BadgeComponentSchema = z.object({
  component: z.literal('Badge'),
  props: z.object({
    textBind: z.string().describe('Template binding (e.g., Score: {score})'),
  }),
})

// Progress
const ProgressComponentSchema = z.object({
  component: z.literal('Progress'),
  props: z.object({
    valueBind: z.string().describe('Game variable binding (e.g., player.hp)'),
    indicator: z.string().optional().describe('Custom indicator class'),
  }),
})

// ============================================================================
// Input Components
// ============================================================================

// Slider
const SliderComponentSchema = z.object({
  component: z.literal('Slider'),
  props: z.object({
    valueBind: z.string().describe('Game variable binding'),
    min: z.number().default(0),
    max: z.number().default(100),
    step: z.number().default(1),
    showValue: z.boolean().default(false).describe('Show input field'),
    disabled: z.boolean().default(false),
    onChange: z.string().optional().describe('Event name on change'),
  }),
})

// Switch
const SwitchComponentSchema = z.object({
  component: z.literal('Switch'),
  props: z.object({
    checkedBind: z.string().describe('Game variable binding'),
    disabled: z.boolean().default(false),
    onChange: z.string().optional().describe('Event name on change'),
  }),
})

// Checkbox
const CheckboxComponentSchema = z.object({
  component: z.literal('Checkbox'),
  props: z.object({
    checkedBind: z.string().describe('Game variable binding'),
    label: z.string().optional().describe('Checkbox label'),
    disabled: z.boolean().default(false),
    onChange: z.string().optional().describe('Event name on change'),
  }),
})

// Toggle
const ToggleComponentSchema = z.object({
  component: z.literal('Toggle'),
  props: z.object({
    pressedBind: z.string().describe('Game variable binding'),
    variant: z.enum(['button', 'navigation', 'icon']).default('button'),
    text: z.string().optional().describe('Toggle label'),
    icon: z.string().optional().describe('UnoCSS icon class'),
    disabled: z.boolean().default(false),
    onChange: z.string().optional().describe('Event name on change'),
  }),
})

// ToggleGroup
const ToggleGroupComponentSchema = z.object({
  component: z.literal('ToggleGroup'),
  props: z.object({
    valueBind: z.string().describe('Game variable binding'),
    type: z.enum(['single', 'multiple']).default('single'),
    items: z.array(z.object({
      value: z.string(),
      label: z.string().optional(),
      icon: z.string().optional(),
      variant: z.enum(['button', 'navigation', 'icon']).default('icon'),
    })).describe('Toggle items'),
    disabled: z.boolean().default(false),
    onChange: z.string().optional().describe('Event name on change'),
  }),
})

// ============================================================================
// Composite Components
// ============================================================================

// Tabs
const TabsComponentSchema = z.object({
  component: z.literal('Tabs'),
  props: z.object({
    valueBind: z.string().describe('Active tab binding'),
    tabs: z.array(z.object({
      value: z.string().describe('Tab identifier'),
      label: z.string().describe('Tab label'),
      content: z.string().describe('Content template or component ref'),
    })).describe('Tab definitions'),
    onChange: z.string().optional().describe('Event name on change'),
  }),
})

// Dialog (imperative)
const DialogComponentSchema = z.object({
  component: z.literal('Dialog'),
  props: z.object({
    title: z.string().optional().describe('Dialog title'),
    content: z.string().describe('Content template'),
    openBind: z.string().describe('Open state binding'),
    modal: z.boolean().default(true),
    onClose: z.string().optional().describe('Event name on close'),
  }),
})

// Confirm
const ConfirmComponentSchema = z.object({
  component: z.literal('Confirm'),
  props: z.object({
    title: z.string().describe('Confirm title'),
    description: z.string().optional().describe('Confirm description'),
    cancelText: z.string().default('Cancel'),
    confirmText: z.string().default('Confirm'),
    openBind: z.string().describe('Open state binding'),
    onCancel: z.string().optional().describe('Cancel event'),
    onConfirm: z.string().optional().describe('Confirm event'),
  }),
})

// Drawer
const DrawerComponentSchema = z.object({
  component: z.literal('Drawer'),
  props: z.object({
    title: z.string().optional().describe('Drawer title'),
    content: z.string().describe('Content template'),
    openBind: z.string().describe('Open state binding'),
    onClose: z.string().optional().describe('Event name on close'),
  }),
})

// Popover
const PopoverComponentSchema = z.object({
  component: z.literal('Popover'),
  props: z.object({
    trigger: z.string().describe('Trigger element ref'),
    content: z.string().describe('Popover content template'),
    side: z.enum(['top', 'right', 'bottom', 'left']).default('top'),
    openBind: z.string().optional().describe('Open state binding'),
  }),
})

// Tooltip
const TooltipComponentSchema = z.object({
  component: z.literal('Tooltip'),
  props: z.object({
    trigger: z.string().describe('Trigger element ref'),
    content: z.string().describe('Tooltip text'),
    side: z.enum(['top', 'right', 'bottom', 'left']).default('top'),
  }),
})

// Avatar
const AvatarComponentSchema = z.object({
  component: z.literal('Avatar'),
  props: z.object({
    srcBind: z.string().optional().describe('Image source binding'),
    fallback: z.string().optional().describe('Fallback text (e.g., initials)'),
    className: z.string().optional().describe('Size class (e.g., size-10)'),
  }),
})

// ============================================================================
// Nexus Component Union
// ============================================================================

export const NexusComponentSchema = z.discriminatedUnion('component', [
  // Basic
  IconComponentSchema,
  ButtonComponentSchema,
  IconButtonComponentSchema,
  BadgeComponentSchema,
  ProgressComponentSchema,
  // Input
  SliderComponentSchema,
  SwitchComponentSchema,
  CheckboxComponentSchema,
  ToggleComponentSchema,
  ToggleGroupComponentSchema,
  // Composite
  TabsComponentSchema,
  DialogComponentSchema,
  ConfirmComponentSchema,
  DrawerComponentSchema,
  PopoverComponentSchema,
  TooltipComponentSchema,
  AvatarComponentSchema,
])

export type NexusComponent = z.infer<typeof NexusComponentSchema>

// ============================================================================
// UI Layout
// ============================================================================

export const UIElementSchema = z.object({
  id: z.string().optional().describe('Element identifier for refs'),
  slot: UISlotSchema,
  content: NexusComponentSchema,
})

export type UIElement = z.infer<typeof UIElementSchema>

export const UILayoutSchema = z.object({
  elements: z.array(UIElementSchema).describe('UI elements'),
})

export type UILayout = z.infer<typeof UILayoutSchema>

// ============================================================================
// Re-exports
// ============================================================================

export {
  // Basic
  IconComponentSchema,
  ButtonComponentSchema,
  IconButtonComponentSchema,
  BadgeComponentSchema,
  ProgressComponentSchema,
  // Input
  SliderComponentSchema,
  SwitchComponentSchema,
  CheckboxComponentSchema,
  ToggleComponentSchema,
  ToggleGroupComponentSchema,
  // Composite
  TabsComponentSchema,
  DialogComponentSchema,
  ConfirmComponentSchema,
  DrawerComponentSchema,
  PopoverComponentSchema,
  TooltipComponentSchema,
  AvatarComponentSchema,
}
