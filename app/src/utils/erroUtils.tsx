export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Wystąpił nieoczekiwany błąd";
};

export const getErrorMessageWithFallback = (
  error: unknown,
  fallback: string
): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return fallback;
};
