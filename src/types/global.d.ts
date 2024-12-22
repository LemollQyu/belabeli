declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: typeof Echo;
  }
}

export {};
