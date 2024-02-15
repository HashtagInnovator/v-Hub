// Dashboard.js
import React, { useState} from 'react';
import '../assets/card.css';
import SectorFilter from '../filters/SectorFilter';
import TopicFilter from '../filters/TopicFilter';
import RegionFilter from '../filters/RegionFilter';

export default function Dashboard() {
    const [stickyVisible, setStickyVisible] = useState(false);

  const handleStickyClick = () => {
    setStickyVisible(false);
  };

  return (
    <div className=''>
      <div className={`sticky-element ${stickyVisible ? 'visible' : ''}`} onClick={handleStickyClick}>
      </div>

      
      <div className="d-flex flex-wrap">
        <SectorFilter/>
      </div>


      <div className="d-flex flex-wrap">
        <TopicFilter/>
      </div>

      
      <div className="d-flex flex-wrap">
        <RegionFilter/>
      </div>
      <div className="mt-5">&nbsp;</div>
    </div>
  );
}
