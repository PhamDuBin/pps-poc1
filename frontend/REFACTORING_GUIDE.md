# Hướng Dẫn Refactoring Components

## Template: Refactor Modal Components

### Before (Ví dụ)
```typescript
import { useRef, useEffect } from "react";

type Props = {
  onClose: () => void;
  onSomeAction: (data: any) => void;
};

export default function MyModal({ onClose, onSomeAction }: Props) {
  const firstRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      // ... more keyboard handlers
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="bg-white p-6">
        {/* Content */}
        <button
          ref={firstRef}
          onClick={() => onSomeAction("value")}
          className="bg-[#EEEEEE] border border-black"
        >
          Button
        </button>
      </div>
    </div>
  );
}
```

### After (Optimized)
```typescript
import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { useKeyboardShortcuts } from "../../../hooks/useKeyboardShortcuts";

interface MyModalProps {
  onClose: () => void;
  onSomeAction: (data: string) => void;
}

const MyModal: React.FC<MyModalProps> = ({ onClose, onSomeAction }) => {
  const firstRef = useRef<HTMLButtonElement>(null);

  // Memoize handlers
  const handleAction = useCallback(
    (value: string) => {
      onSomeAction(value);
    },
    [onSomeAction]
  );

  // Keyboard shortcuts
  const shortcuts = useMemo(
    () => [
      { key: "Escape", handler: onClose },
      { key: "1", handler: () => handleAction("value"), ctrlKey: true },
    ],
    [onClose, handleAction]
  );

  useKeyboardShortcuts({ shortcuts });

  // Auto-focus
  useEffect(() => {
    firstRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50" role="dialog" aria-modal="true">
      <div className="bg-white p-6">
        <button
          ref={firstRef}
          onClick={() => handleAction("value")}
          className="bg-bg-gray border border-black"
          aria-label="アクションを実行"
        >
          Button
        </button>
      </div>
    </div>
  );
};

export default React.memo(MyModal);
```

---

## Checklist: Refactoring Một Component

### 1. Imports ✓
- [ ] Add `React` for `React.memo`
- [ ] Add `useCallback`, `useMemo` from react
- [ ] Import custom hooks if needed
- [ ] Remove unused imports

### 2. TypeScript ✓
- [ ] Replace `any` types với proper interfaces
- [ ] Create interface for Props: `ComponentNameProps`
- [ ] Type function return: `React.FC<Props>`
- [ ] Type all variables and functions

### 3. Performance ✓
- [ ] Wrap event handlers với `useCallback`
- [ ] Wrap computed values với `useMemo`
- [ ] Wrap static data với `useMemo`
- [ ] Wrap component với `React.memo`

### 4. Colors ✓
- [ ] Replace `bg-[#80bad7]` → `bg-label`
- [ ] Replace `bg-[#ebcec0]` → `bg-input`
- [ ] Replace `bg-[#d8dadc]` → `bg-bg-alt`
- [ ] Replace `bg-[#EEEEEE]` → `bg-bg-gray`
- [ ] Replace `bg-[#4770a5]` → `bg-button-primary`

### 5. Hooks ✓
- [ ] Replace keyboard event listeners → `useKeyboardShortcuts`
- [ ] Replace modal state → `useModal` (if applicable)
- [ ] Replace input transforms → `useTransformedInput` (if applicable)

### 6. Accessibility ✓
- [ ] Add `aria-label` to buttons
- [ ] Add `aria-label` to inputs
- [ ] Add `role` attributes
- [ ] Add `aria-modal="true"` to modals

### 7. Code Quality ✓
- [ ] Remove duplicate code
- [ ] Extract magic numbers to constants
- [ ] Extract long functions to separate functions
- [ ] Add comments for complex logic

---

## Pattern: useCallback vs useMemo

### useCallback
Dùng cho **functions**:
```typescript
// ❌ Bad - recreated every render
const handleClick = () => {
  doSomething();
};

// ✅ Good - memoized
const handleClick = useCallback(() => {
  doSomething();
}, [dependencies]);
```

### useMemo
Dùng cho **values**:
```typescript
// ❌ Bad - recalculated every render
const items = data.filter(x => x.active);

// ✅ Good - memoized
const items = useMemo(
  () => data.filter(x => x.active),
  [data]
);
```

---

## Pattern: Custom Hooks

### useKeyboardShortcuts
```typescript
import { useKeyboardShortcuts } from "../../../hooks/useKeyboardShortcuts";

const shortcuts = useMemo(
  () => [
    { key: "Escape", handler: onClose },
    { key: "s", handler: onSave, ctrlKey: true },
    { key: "1", handler: () => selectOption(1), altKey: true },
  ],
  [onClose, onSave, selectOption]
);

useKeyboardShortcuts({ shortcuts });
```

### useModal
```typescript
import { useModal } from "../../../hooks/useModal";

const { isOpen, open, close, firstElementRef } = useModal({
  onClose: () => console.log("Modal closed"),
  autoFocus: true,
});

// Use in JSX
<button ref={firstElementRef} onClick={close}>Close</button>
```

### useTransformedInput
```typescript
import { useTransformedInput } from "../../../hooks/useTransformedInput";
import { toHalfWidth } from "../../../utils/InputHandlers";

const { handleChange, handlePaste } = useTransformedInput({
  transformFn: toHalfWidth,
  onChange: setValue,
});

// Use in JSX
<input onChange={handleChange} onPaste={handlePaste} />
```

---

## Ví Dụ Thực Tế: Refactor File Lớn

### Trước: LeftPanel.tsx (760 dòng)
```typescript
// Một file giant với tất cả logic
export default function LeftPanel() {
  // 100 lines of state
  // 200 lines of handlers
  // 300 lines of JSX
  // 160 lines of utility functions
}
```

### Sau: Tách thành nhiều files

#### `LeftPanel/index.tsx`
```typescript
import SearchForm from './SearchForm';
import KanaButtons from './KanaButtons';
import ResultsTable from './ResultsTable';

const LeftPanel: React.FC<LeftPanelProps> = (props) => {
  return (
    <div>
      <SearchForm {...searchProps} />
      <KanaButtons {...kanaProps} />
      <ResultsTable {...tableProps} />
    </div>
  );
};

export default React.memo(LeftPanel);
```

#### `LeftPanel/SearchForm.tsx`
```typescript
const SearchForm: React.FC<SearchFormProps> = ({ fields, onSubmit }) => {
  // Only search form logic
  return <form>...</form>;
};

export default React.memo(SearchForm);
```

#### `LeftPanel/types.ts`
```typescript
export interface LeftPanelProps {
  onSearch: (query: string) => void;
  results: SearchResult[];
}

export interface SearchFormProps {
  fields: FormField[];
  onSubmit: (data: FormData) => void;
}
```

---

## Quick Commands

### Run color replacement script
```bash
node scripts/replaceColors.js
```

### Check TypeScript errors
```bash
npx tsc --noEmit
```

### Test build
```bash
npm run build
```

### Start dev server
```bash
npm start
```

---

## Common Pitfalls

### ❌ Inline Functions in JSX
```typescript
// Bad
<button onClick={() => handleClick(id)}>Click</button>

// Good
const handleButtonClick = useCallback(() => handleClick(id), [id]);
<button onClick={handleButtonClick}>Click</button>
```

### ❌ Missing Dependencies
```typescript
// Bad
const handler = useCallback(() => {
  doSomething(data); // 'data' not in deps!
}, []);

// Good
const handler = useCallback(() => {
  doSomething(data);
}, [data]);
```

### ❌ Useless Memoization
```typescript
// Bad - memoizing primitive
const count = useMemo(() => 5, []);

// Good - no need to memoize
const count = 5;
```

---

## Priority Order

### High Priority (Do First)
1. Fix `any` types → proper interfaces
2. Replace hardcoded colors → theme colors
3. Add `React.memo` to frequently rendered components
4. Add `useCallback` to event handlers passed as props

### Medium Priority
5. Extract large components → smaller pieces
6. Use custom hooks → reduce duplication
7. Add accessibility attributes
8. Add error boundaries

### Low Priority
9. Optimize rarely changed components
10. Add comprehensive comments
11. Extract utilities

---

## Testing After Refactoring

### Manual Testing Checklist
- [ ] App starts without errors
- [ ] All buttons work
- [ ] Keyboard shortcuts work
- [ ] Modals open/close correctly
- [ ] Forms submit correctly
- [ ] Navigation works
- [ ] No console errors
- [ ] No memory leaks (check DevTools)

### Automated Testing
```bash
npm test
npm run build
```

---

## Need Help?

### Files to Reference
- ✅ `CurrentMonthDetails.tsx` - Optimized component example
- ✅ `CategorySelectionModal.tsx` - Optimized modal example
- ✅ `src/hooks/` - Custom hooks
- ✅ `src/types/` - TypeScript types
- ✅ `OPTIMIZATION_REPORT.md` - Full report

---

**Happy Refactoring! 🚀**
