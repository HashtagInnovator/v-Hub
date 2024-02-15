// RegionFilter.js
import React, { useState, useEffect } from 'react';
import { fetchRegions, fetchDataByRegion } from '../db/FetchData';
import PieChart from '../Charts/PieChart';
import '../assets/card.css';
import '../components/Utils';
import { calculateChartData } from '../components/Utils';

const RegionFilter = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    // Fetch the list of regions
    fetchRegions()
      .then(data => setRegions(data))
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  const handleRegionClick = async (region) => {
    try {
      // Fetch data for the selected region
      const data = await fetchDataByRegion(region);
      setSelectedRegion({ region, data });
    } catch (error) {
      console.error(`Error fetching data for ${region} region:`, error);
    }
  };

  const handleStickyClick = () => {
    setSelectedRegion(null);
  };


  return (
    <div className='container'>
      <div className={`sticky-element ${selectedRegion ? 'visible' : ''}`} onClick={handleStickyClick}>
        {selectedRegion && (
          <div>
            <h5>{selectedRegion.region} Region</h5>
            {/* Show only the PieChart for regions */}
            <PieChart data={calculateChartData(selectedRegion.data, "pie")} />
          </div>
        )}
      </div>

      <h4 className='mt-5'>By Regions</h4>
      <div className="d-flex flex-wrap">
        {regions.map(region => (
          <div key={region} className={`card m-2 ${selectedRegion && selectedRegion.region === region ? 'selected' : ''}`} onClick={() => handleRegionClick(region)}>
            <div className="card-header">
              {region === "" ? "Other" : region}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionFilter;

