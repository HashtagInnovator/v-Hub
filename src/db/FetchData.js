// FetchData.js
export async function fetchSectors() {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const data = await response.json();
  
      console.log('Raw data:', data);
  
      // Extract unique sectors with non-empty data
      const uniqueSectors = [...new Set(data.map(entry => entry.sector))].filter(sector => {
        // Check if there is non-empty data for the sector
        return data.some(entry => entry.sector === sector && entry.latency !== "" && entry.intensity !== "");
      });
  
      console.log('Unique sectors:', uniqueSectors);
  
      return uniqueSectors;
    } catch (error) {
      console.error('Error fetching sectors:', error);
      throw error;
    }
  }

export async function fetchDataBySector(sector) {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const data = await response.json();
  
      // Filter data for the specified sector and non-empty latency and intensity
      const sectorData = data.filter(entry => entry.sector === sector && entry.latency !== "" && entry.intensity !== "");
      return sectorData;
    } catch (error) {
      console.error(`Error fetching data for ${sector} sector:`, error);
      throw error;
    }
  }


export async function fetchTopics() {
    try {
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();

        console.log('Raw topic data:', data);

        // Extract unique topics with non-empty data
        const uniqueTopics = [...new Set(data.map(entry => entry.topic))].filter(topic => {
            // Check if there is non-empty data for the topic
            return data.some(entry => entry.topic === topic && entry.latency !== "" && entry.intensity !== "");
        });

        console.log('Unique topics:', uniqueTopics);

        return uniqueTopics;
    } catch (error) {
        console.error('Error fetching topics:', error);
        throw error;
    }
}

export async function fetchDataByTopic(topic) {
    try {
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();

        // Filter data for the specified topic and non-empty latency and intensity
        const topicData = data.filter(entry => entry.topic === topic && entry.latency !== "" && entry.intensity !== "");
        return topicData;
    } catch (error) {
        console.error(`Error fetching data for ${topic} topic:`, error);
        throw error;
    }
}

// FetchData.js
export async function fetchRegions() {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const data = await response.json();
  
      // Extract unique regions with non-empty data
      const uniqueRegions = [...new Set(data.map(entry => entry.region))].filter(region => {
        // Check if there is non-empty data for the region
        return data.some(entry => entry.region === region && entry.latency !== "" && entry.intensity !== "");
      });
  
      console.log('Unique regions:', uniqueRegions);
  
      return uniqueRegions;
    } catch (error) {
      console.error('Error fetching regions:', error);
      throw error;
    }
  }
  
  export async function fetchDataByRegion(region) {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const data = await response.json();
  
      // Filter data for the specified region and non-empty latency and intensity
      const regionData = data.filter(entry => entry.region === region && entry.latency !== "" && entry.intensity !== "");
      return regionData;
    } catch (error) {
      console.error(`Error fetching data for ${region} region:`, error);
      throw error;
    }
  }

  // FetchData.js
  export async function fetchYears() {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const data = await response.json();
  
      // Extract unique years with non-empty data
      const uniqueYears = [...new Set(
        data.reduce((years, entry) => {
          if (entry.start_year) years.push(entry.start_year.toString());
          if (entry.end_year) years.push(entry.end_year.toString());
          return years;
        }, [])
      )].filter(year => {
        // Check if there is non-empty data for the year
        return data.some(entry => (
          (entry.end_year && entry.end_year.toString() === year)
        ) && entry.latency !== "" && entry.intensity !== "");
      });
  
      console.log('Unique years:', uniqueYears);
  
      return uniqueYears;
    } catch (error) {
      console.error('Error fetching years:', error);
      throw error;
    }
  }
  

export async function fetchDataByYear(year) {
  try {
    const response = await fetch('http://localhost:5000/api/data');
    const data = await response.json();

    const yearData = data.filter(entry => (
      (entry.end_year && entry.end_year.toString() === year.toString())
    ));

    return yearData;
  } catch (error) {
    console.error(`Error fetching data for ${year} year:`, error);
    throw error;
  }
}

