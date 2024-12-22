import React, { useState } from "react";

const Alert = ({ message }: { message: string }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center"
      role="alert"
    >
      <span className="mr-2">{message}</span>
      <button
        className="ml-auto text-white hover:text-gray-200"
        onClick={() => setVisible(false)}
      >
        ✖
      </button>
    </div>
  );
};

export default Alert;
