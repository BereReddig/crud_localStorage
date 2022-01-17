import React from 'react'
import { Container } from 'semantic-ui-react';
//components
import Users from './components/Users';

function App() {
  return (
    <Container style={{ padding: "5% 0 5% 0" }}>
      <Users />
    </Container>
  );
}

export default App;
