declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    NODE_ENV: string;
    VUE_ROUTER_BASE: string | undefined;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
  }
}
