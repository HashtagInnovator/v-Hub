// App.js
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Contact from './screens/Contact';
import Dashboard from './screens/Dashboard';
import SectorFilter from './filters/SectorFilter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopicFilter from './filters/TopicFilter';
import RegionFilter from './filters/RegionFilter';
import YearFilter from './filters/YearFilter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sector" element={<SectorFilter />} />
          <Route path='/topic' element={<TopicFilter/>}/>
          <Route path='/region' element={<RegionFilter/>}/>
          <Route path='/year' element={<YearFilter/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
