// Resolve public/ asset paths against Vite's base so they work on any route.
export const assetPath = (path) =>
  /^(https?:)?\/\//.test(path)
    ? path
    : `${import.meta.env.BASE_URL}${path.replace(/^\.?\//, "")}`;
