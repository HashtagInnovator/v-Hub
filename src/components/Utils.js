// Utils.js
export const calculateChartData = (data, chartType) => {
    if (chartType === 'pie') {
      const intensitySum = data.reduce((sum, entry) => sum + entry.intensity, 0);
      const relevanceSum = data.reduce((sum, entry) => sum + entry.relevance, 0);
      const likelihoodSum = data.reduce((sum, entry) => sum + entry.likelihood, 0);
  
      const averageIntensity = intensitySum / data.length;
      const averageRelevance = relevanceSum / data.length;
      const averageLikelihood = likelihoodSum / data.length;
  
      return [averageIntensity, averageRelevance, averageLikelihood];
    } else if (chartType === 'bar') {
      return data.map(entry => ({
        topic: entry.topic,
        value: entry[chartType] || 0, 
      }));
    } else {
      throw new Error('Invalid chart type');
    }
  };
  