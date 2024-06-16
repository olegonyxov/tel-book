
import './App.css';
import Header from './components/Header';
import MainPage from './components/MainPage';
import PeopleList from './components/PeopleList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="list" element={<PeopleList/>} />
      </Routes>
  </BrowserRouter>
    
  );
}

export default App;
