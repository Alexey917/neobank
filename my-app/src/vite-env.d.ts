interface ImportMetaEnv {
  readonly VITE_CURRENCY_URL: string;
  readonly VITE_CURRENCY_KEY: string;
  readonly VITE_NEWS_URL: string;
  readonly VITE_NEWS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
