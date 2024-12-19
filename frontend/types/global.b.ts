declare namespace NodeJS { // Remind typescript what these variables are
  interface ProcessEnv { // ProcessEnv is j ust a name for these "types"
    REACT_APP_API_URL: string // What the api url is (string)
    REACT_APP_ENV: 'development' | 'production' | 'test'
    REACT_APP_VERSION: string
  }
}

declare var process: { // Declare what process is
  env: NodeJS.ProcessEnv // The "type" of process.env is NodeJS.ProcessEnv (the structure we just defined above)
}
