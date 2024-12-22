"use client"
import { useEffect, useRef } from 'react';

function MyComponent() {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll into view on page load
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div>
      <div style={{ height: '100vh' }}>Scroll past this section</div>
      <div ref={targetRef} style={{ padding: '20px', backgroundColor: 'lightblue' }}>
        Focused Div
      </div>
      <div style={{ height: '100vh' }}>More content below</div>
    </div>
  );
}

export default MyComponent;