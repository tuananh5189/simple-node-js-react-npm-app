import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div'); // ✅ Sửa 'div1' thành 'div'
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div); // ✅ Cleanup để tránh memory leaks
});