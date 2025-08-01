declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.webp' {
  const url: string;
  export default url;
}

declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '*.pdf' {
  const url: string;
  export default url;
}
