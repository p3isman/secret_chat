import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './components/Chat';
import Join from './components/Join';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Join />}></Route>
        <Route path='/chat' element={<Chat />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
