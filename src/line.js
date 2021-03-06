import React from 'react';
import { Line } from 'react-chartjs-2';

class LineClass extends React.Component {

  pointColors(data, metric_field, benchmark_field) {
    return data.map(point => {
      const ratio = point[metric_field]/point[benchmark_field];
      if(ratio <= 1.25) {
        return '#75c400'; //green
      }
      else if(ratio <= 1.5) {
        return '#e5a70b'; //yellow
      }
      else if(ratio > 1.5) {
        return '#e53a0b'; //red
      }

      return '#1c1c1c'; //whatever
    });
  }

  render() {
    /*
    Props:
      seriesName
      xField
      xFieldLabel
      yField
      yFieldLabel
      benchmarkField
    */

    let labels = this.props.data.map(item => item[this.props.xField]);
    return (
      <div className="chart-container">
        <Line
          legend={{ display: false }}
          data={{
            labels,
            datasets: [
              {
                label: this.props.seriesName,
                fill: false,
                lineTension: 0.1,
                pointBackgroundColor: this.pointColors(this.props.data, this.props.yField, this.props.benchmarkField),
                pointHoverRadius: 3,
                pointHoverBackgroundColor: this.pointColors(this.props.data, this.props.yField, this.props.benchmarkField),
                pointRadius: 3,
                pointHitRadius: 10,
                data: this.props.data.map(item => (item[this.props.yField] / 60).toFixed(2))
              },
              {
                label: `${this.props.seriesName}_benchmark`,
                data: this.props.data.map(item => item[this.props.benchmarkField]/60),
                pointRadius: 0
              }
            ]
          }}
          options={{
            responsive: true,
            title: {
              display: true,
              text: this.props.title,
              fontSize: 16
            },
            tooltips: {
              callbacks: {
                title: (tooltipItem, _) => {
                  return new Date(tooltipItem[0].xLabel).toLocaleTimeString();
                }
              }
            },
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: true,
                    fontSize: 14,
                    labelString: this.props.yFieldLabel
                  }
                }
              ],
              xAxes: [
                {
                  type: 'time',
                  scaleLabel: {
                    display: true,
                    fontSize: 14,
                    labelString: this.props.xFieldLabel
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default LineClass;
