# UI Theme System

This theme system provides a complete design system for React applications, including colors, typography, animations, and component styles.

## Quick Start

1. Copy the `test.jsx` file to your project's theme directory
2. Wrap your application with the ThemeProvider:

```jsx
import { ThemeProvider } from './theme/test';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

3. Use the theme in your components:

```jsx
import { useTheme, cn } from './theme/test';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <button 
      className={cn(
        theme.components.button.base,
        theme.components.button.variants.primary
      )}
    >
      Click Me
    </button>
  );
}
```

## Features

### 1. Animations
- Page transitions
- Container animations
- Item animations
- Modal animations
- Button hover effects

```jsx
import { motion } from 'framer-motion';
import { animations } from './theme/test';

function MyPage() {
  return (
    <motion.div
      variants={animations.pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Your content */}
    </motion.div>
  );
}
```

### 2. Color Scheme
- Primary colors
- Background colors
- Text colors
- Status colors

```jsx
import { colors } from './theme/test';

// Usage in Tailwind classes
<div className="bg-background text-primary">
  Content
</div>
```

### 3. Component Styles
Pre-built styles for:
- Buttons
- Inputs
- Cards
- Tables
- Badges

```jsx
import { components, cn } from './theme/test';

<button className={cn(
  components.button.base,
  components.button.sizes.md,
  components.button.variants.primary
)}>
  Click Me
</button>
```

### 4. Typography
- Font families
- Font sizes
- Font weights

```jsx
import { typography } from './theme/test';

// Usage in Tailwind
<h1 className="font-sans text-2xl font-bold">
  Heading
</h1>
```

### 5. Layout
- Container sizes
- Grid system
- Spacing system

```jsx
import { layout } from './theme/test';

<div className={layout.container.base}>
  <div className={layout.grid.base}>
    {/* Grid content */}
  </div>
</div>
```

## Required Dependencies

Add these to your project's package.json:

```json
{
  "dependencies": {
    "framer-motion": "^10.16.5",
    "classnames": "^2.3.2"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

## Tailwind Configuration

Add this to your tailwind.config.js:

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA',
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        background: {
          lighter: '#1F2937',
          DEFAULT: '#111827',
          darker: '#030712',
        },
      },
      boxShadow: {
        neumorph: '5px 5px 10px rgba(0, 0, 0, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

## Usage Examples

### Modal Component
```jsx
import { motion } from 'framer-motion';
import { animations, components } from './theme/test';

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={animations.modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={components.card.base}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### Animated List
```jsx
import { motion } from 'framer-motion';
import { animations } from './theme/test';

function List({ items }) {
  return (
    <motion.ul
      variants={animations.containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <motion.li
          key={item.id}
          variants={animations.itemVariants}
        >
          {item.content}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

## Best Practices

1. Always use the theme context for consistent styling
2. Utilize the provided animation variants for smooth transitions
3. Combine classes using the `cn` utility function
4. Follow the component style patterns for consistency
5. Use the predefined color scheme for accessibility
6. Implement responsive designs using the layout system

## Customization

You can extend or modify any part of the theme by editing the `test.jsx` file:

1. Add new color variants
2. Create custom animation variants
3. Define new component styles
4. Add custom typography settings
5. Extend the layout system
