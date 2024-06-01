import React, { useEffect, useState } from 'react';

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    // Initialize the Qt WebChannel
    new QWebChannel(qt.webChannelTransport, (channel) => {
      // Access the backend object
      window.backend = channel.objects.backend;

      // Send a message to the backend
      window.backend.process_data('Hello from React')
        .then(result => {
          console.log('Received response:', result);
          setResponse(result);
        });
    });
  }, []);

  return (
    <div>
      <h1>React Frontend</h1>
      <p>Response from backend: {response}</p>
    </div>
  );
}

export default App;
