import React from 'react';
import ChartistGraph from 'react-chartist';
export default class Search extends React.Component {
  render() {

    const data = {
      labels: this.props.data.labels,
      series: this.props.data.series,
    };

    const options = {
      high: this.props.data.max,
      low: 0,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 1 === 0 ? value : null;
        }
      }
    };

    const type = this.props.type
    console.log(this.props.type)
    return (
      <div>
        <ChartistGraph data={data} options={options} type={ type } />
      </div>
    )
  }
}