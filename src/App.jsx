import React, { useEffect, useState } from 'react';

const App = () => {

  const [response, setResponse] = useState('');

  useEffect(() => {
    // Ensure qt.webChannelTransport is available globally
    const setupQtWebChannel = () => {
      if (window.qt && window.qt.webChannelTransport) {
        new QWebChannel(window.qt.webChannelTransport, (channel) => {
          const backend = channel.objects.backend;

          // Example of calling a method on the backend object
          backend.process_data('Hello from React').then((response) => {
            console.log(response); // Processed Hello from React in Python
            setResponse(response);
          });

          // Example of handling a signal from the backend
          backend.someSignal.connect((message) => {
            console.log('Received signal from backend:', message);
          });
        });
      } else {
        console.error('qt.webChannelTransport is not available.');
      }
    };

    // Wait for qt to be available before setting up the web channel
    if (window.qt) {
      setupQtWebChannel();
    } else {
      window.addEventListener('qtReady', setupQtWebChannel);
    }

    // Cleanup event listener if needed
    return () => {
      window.removeEventListener('qtReady', setupQtWebChannel);
    };
  }, []);

  return (
    <div>
      <h1>React App with PySide6 Backend</h1>
      <p>Response from backend: {response}</p>
    </div>
  );
};

export default App;

