import './App.css';

import { Container } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Views/Home';
import Question from './Views/Question';

function App() {
  return (
    <Container h="full" w="full" padding="64px" centerContent>
      <BrowserRouter basename="/advent-of-code">
        <Routes>
          <Route index element={<Home />} />
          <Route path="question/:id" element={<Question />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
