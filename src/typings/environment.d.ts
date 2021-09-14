declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    WS_KEY: string;
    WS_CLUSTER: string;
    WS_HOST: string;
    WS_PORT: string;
    WS_TLS: string;
    NODE_ENV: string;
    VUE_ROUTER_BASE: string | undefined;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
  }
}
