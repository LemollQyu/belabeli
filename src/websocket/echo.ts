import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Konfigurasi Laravel Echo
window.Pusher = Pusher;

let echo = new Echo({
  broadcaster: "reverb",
  key: "fczjvyml7wlqsb62hsun",
  wsHost: "29040-36-79-78-130.ngrok-free.app", //tanpa http
  wsPort: 443,
  wssPort: 443,
  forceTLS: true,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
});

// const pusher = new Pusher('fczjvyml7wlqsb62hsun', {
//   broadcaster: "reverb",
//   key: "fczjvyml7wlqsb62hsun",
//   wsHost: "127.0.0.1",
//   wsPort: 9000,
//   wssPort: 9000,
//   forceTLS: false,
//   enabledTransports: ["ws", "wss"],
//   authEndpoint: `${process.env.NEXT_PUBLIC_API_URL_2}/broadcasting/auth`,
//   auth: {
//     headers: {
//       Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzY0YWRkMDQzMDc4OWFmZjg1N2UzMWEzZjNlZGQ3NGVjZTI1ZTg4YTMxYzljNjc0MWM1MTM4NmY1ODhjNzc2ZTMwNWFiYzc2MjYyMDFjMWYiLCJpYXQiOjE3MzE5Mzg5ODEuNTg0NDMzLCJuYmYiOjE3MzE5Mzg5ODEuNTg0NDM5LCJleHAiOjE3MzE5NjA1ODEuNTMzODA5LCJzdWIiOiIwMTkzM2EyZC0xZmJjLTc1YzktYTJlNS1iY2Q0MzZhNTg2NzIiLCJzY29wZXMiOltdfQ.RuXMfEw9_v9ZxW3nfZBKa_vxpjEVXFzsZm-qT42TOAaKLHGVOSP5HYSQMhGJtR0vOXRKNyWmUjZYWpT1I-0UT2sl9mhnannuLOkALZjbw2yW9VWZDlf9j0YpOYin3oaQU-85A-Nmq0j0gxetAdGIvRFGclCQIyl6mxQBDPoWiqPGypcewYAtUnIx5SlCfYwqXouk06D7GA8DEIIvOnoSWKZKOFzl9Z0WgY1KZdQEPvqeBsQ7hp_3qrpBExi6dEXzkTzlSi3kamKqMphjtnW-Qf718Y3lOFpPOM33wrb2-mI41l28c0q9KQPgbYNpqYsW1nVOpLS9b5jzxZ_HtYfeX5Us_rnl-j2LQdz9ywGg1yunxcBQuO6boQBcgSEtu27MqSiKS8woPa7c84xL53pecruX-Aod-kHPU9lW81-KlVfwYIsGgaopwLjavkdo9uMj8Ii9XLMK19zwjZHc6ZbIs4DkEfAJmhfX8v4h1uDWKi3TTA1xzzrnVwAO_8Mlxr5dFCNRMCeS5kMcYDm2EtKUXzYMbekksQswt2jTQ3313pRPT8YrmHJ1dvlw4HYOCYPk_VWDpOCyWaE7CnLap-dem--jWAcWTHGWkIcoMv6uTHQZwoh8mq30vJlBCL86v7XCpAkYPyddmmWCsAXBQr2lMEAgYBSRIn5IPx_45GH7IgI`,
//     },
//   },
// })

// window.Echo = echo;

export default echo;
