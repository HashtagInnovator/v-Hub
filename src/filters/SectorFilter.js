// SectorFilter.js
import React, { useState, useEffect } from 'react';
import { fetchSectors, fetchDataBySector } from '../db/FetchData';
import BarChart from '../Charts/BarChart';
import '../assets/card.css'; 

const SectorFilter = () => {
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);

  useEffect(() => {
    // Fetch the list of sectors
    fetchSectors()
      .then(data => setSectors(data))
      .catch(error => console.error('Error fetching sectors:', error));
  }, []);

  const handleSectorClick = async (sector) => {
    try {
      // Fetch data for the selected sector
      const data = await fetchDataBySector(sector);
      setSelectedSector({ sector, data });
    } catch (error) {
      console.error(`Error fetching data for ${sector} sector:`, error);
    }
  };

  const handleStickyClick = () => {
    setSelectedSector(null);
  };

  return (
    <div className='container'>
      <div className={`sticky-element ${selectedSector ? 'visible' : ''}`} onClick={handleStickyClick}>
        {selectedSector && (
          <div>
            <h5>{selectedSector.sector} Sector</h5>
            {/* Show only the BarChart for sectors */}
            <BarChart data={selectedSector.data} />
          </div>
        )}
      </div>

      <h4 className='mt-5'>By Sectors</h4>
      <div className="d-flex flex-wrap">
        {sectors.map(sector => (
          <div key={sector} className={`card m-2 ${selectedSector && selectedSector.sector === sector ? 'selected' : ''}`} onClick={() => handleSectorClick(sector)}>
            <div className="card-header">
              {sector === "" ? "Other" : sector}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorFilter;
