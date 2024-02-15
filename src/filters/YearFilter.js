// YearFilter.js
import React, { useState, useEffect } from 'react';
import { fetchYears, fetchDataByYear } from '../db/FetchData';
import YearChart from '../Charts/YearChart';
import '../assets/card.css';
import '../components/Utils';

const YearFilter = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    // Fetch the list of years
    fetchYears()
      .then(data => setYears(data))
      .catch(error => console.error('Error fetching years:', error));
  }, []);

  const handleYearClick = async (year) => {
    try {
      // Fetch data for the selected year
      const data = await fetchDataByYear(year);
      setSelectedYear({ year, data });
    } catch (error) {
      console.error(`Error fetching data for ${year} year:`, error);
    }
  };

  const handleStickyClick = () => {
    setSelectedYear(null);
  };

  return (
    <div className='container'>
      <div className={`sticky-element ${selectedYear ? 'visible' : ''}`} onClick={handleStickyClick}>
        {selectedYear && (
          <div>
            <h5>{selectedYear.year} Year</h5>
            {/* Show only the LineChart for years */}
            <YearChart data={selectedYear.data} />
          </div>
        )}
      </div>

      <h4 className='mt-5'>By Years</h4>
      <div className="d-flex flex-wrap">
      {years.map((year) => (
  <div key={year} className={`card m-2 ${selectedYear && selectedYear.year === year ? 'selected' : ''}`} onClick={() => handleYearClick(year)}>
    <div className="card-header">
      {year === "" ? "Other" : year}
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default YearFilter;
