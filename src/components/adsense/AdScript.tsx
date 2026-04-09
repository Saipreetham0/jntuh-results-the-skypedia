// AdSense script is now loaded via a plain <script> in <head> of layout.tsx
// to avoid the data-nscript attribute that next/script adds (unsupported by AdSense).
// This file kept for backwards compatibility with any imports.
const AdScript = () => null;
export default AdScript;
