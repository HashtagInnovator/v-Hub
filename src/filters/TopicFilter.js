// TopicFilter.js
import React, { useState, useEffect } from 'react';
import { fetchTopics, fetchDataByTopic } from '../db/FetchData';
import '../assets/card.css';
import PieChart from '../Charts/PieChart';
import '../components/Utils';
import { calculateChartData } from '../components/Utils';

const TopicFilter = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    // Fetch the list of topics
    fetchTopics()
      .then(data => setTopics(data))
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  const handleTopicClick = async (topic) => {
    try {
      // Fetch data for the selected topic
      const data = await fetchDataByTopic(topic);
      setSelectedTopic({ topic, data });
    } catch (error) {
      console.error(`Error fetching data for ${topic} topic:`, error);
    }
  };

  const handleStickyClick = () => {
    setSelectedTopic(null);
  };

  return (
    <div className='container'>
      <div className={`sticky-element ${selectedTopic ? 'visible' : ''}`} onClick={handleStickyClick}>
        {selectedTopic && (
          <div>
            <h5>{selectedTopic.topic} Topic</h5>
            {/* Show only the PieChart for topics */}
            <PieChart data={calculateChartData(selectedTopic.data, "pie")} />
          </div>
        )}
      </div>

      <h4 className='mt-5'>By Topics</h4>
      <div className="d-flex flex-wrap">
        {topics.map(topic => (
          <div key={topic} className={`card m-2 ${selectedTopic && selectedTopic.topic === topic ? 'selected' : ''}`} onClick={() => handleTopicClick(topic)}>
            <div className="card-header">
              {topic === "" ? "Other" : topic}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicFilter;
