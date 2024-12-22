import React from "react";
import { useToast } from "./ToastContext";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            marginBottom: "10px",
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
          }}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
