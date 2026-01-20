export const apiWorker = new Worker(
  new URL("./api.worker.ts", import.meta.url),
  { type: "module" },
);
export default apiWorker;
