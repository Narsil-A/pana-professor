import InteractiveChart from '../components/InteractiveChart';
import { ChartData, ChartOptions } from 'chart.js';

const TestChartPage = () => {
  // Data for the bar chart
  // implement logic to retrieve data from the backend...
  const studentScoresData: ChartData<'bar'> = {
    labels: ['Math', 'Language', 'Arts', 'Programming'],
    datasets: [
      {
        label: 'Student Scores',
        data: [85, 92, 78, 88],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(153, 102, 255, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <InteractiveChart 
        data={studentScoresData} 
        options={chartOptions} 
        type="bar" 
        width="800px" 
        height="500px" 
      />
    </div>
  );
};

export default TestChartPage;











