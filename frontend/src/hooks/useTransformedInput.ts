import { useCallback } from 'react';

type TransformFunction = (value: string) => string;

interface UseTransformedInputOptions {
  transformFn: TransformFunction;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

interface UseTransformedInputReturn {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
}

/**
 * Custom hook for handling transformed input (half-width, kana, etc.)
 * Consolidates duplicate logic from multiple input components
 */
export function useTransformedInput(
  options: UseTransformedInputOptions
): UseTransformedInputReturn {
  const { transformFn, onChange, onBlur } = options;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const transformedValue = transformFn(e.target.value);
      onChange(transformedValue);
    },
    [transformFn, onChange]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData('text');
      const transformedValue = transformFn(pastedText);
      onChange(transformedValue);
    },
    [transformFn, onChange]
  );

  const handleBlur = useCallback(() => {
    onBlur?.();
  }, [onBlur]);

  return {
    handleChange,
    handlePaste,
    handleBlur,
  };
}
