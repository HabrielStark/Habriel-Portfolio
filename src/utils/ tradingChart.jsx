export const generateChartData = (points = 100) => {
    let data = [];
    let value = 100;
    
    for (let i = 0; i < points; i++) {
      value += (Math.random() - 0.5) * 10;
      data.push({
        x: i,
        y: value
      });
    }
    
    return data;
  };
  
  export const chartConfig = {
    lineColor: '#4A90E2',
    gridColor: 'rgba(74, 144, 226, 0.1)',
    textColor: '#666',
    candleColors: {
      up: '#4CAF50',
      down: '#F44336'
    }
  }; 