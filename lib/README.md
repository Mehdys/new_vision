# Lib Folder - Utility Functions

This folder contains reusable utility functions that can be used throughout your application.

## Files

### `utils.ts`
Common utility functions for:
- Date formatting
- String manipulation
- Validation
- Number formatting
- Debouncing
- And more...

### `api.ts`
API helper functions for:
- Making HTTP requests
- Error handling
- Request/response handling

## How to Use

Import utilities where you need them:

```typescript
// In any component or API route
import { formatDate, isValidEmail, truncate } from '@/lib/utils';
import { post, get } from '@/lib/api';

// Example usage
const formatted = formatDate(new Date());
const isValid = isValidEmail('user@example.com');
const shortText = truncate('Long text here', 20);

// API example
const data = await post('/api/feedback', { name: 'John', email: 'john@example.com' });
```

## Why Use Utilities?

1. **DRY Principle**: Write once, use everywhere
2. **Consistency**: Same formatting/validation across the app
3. **Maintainability**: Update in one place, affects everywhere
4. **Testability**: Easy to test utility functions
5. **Organization**: Keep your components clean and focused

## Adding New Utilities

When you find yourself repeating code, extract it into a utility function here!

