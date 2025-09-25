// App.js
import React from 'react';

function App() {
  throw new Error('Test failed intentionally!'); // ❌ Đơn giản nhất
  
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;