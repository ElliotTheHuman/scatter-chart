import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import styled from 'styled-components'


const Container = styled.div`
`;


export default class Scatter extends React.Component {
  constructor (props) {
    super(props)

    // Feed the highchart chart options here
    this.options = {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'The Greatest Scatter Chart Known to Mankind'
        },
        xAxis: {
            type: 'datetime',
            title: {
                enabled: true,
                text: 'X Axis Name'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            tickInterval: (24 * 3600 * 1000),
            labels: {
              formatter: function() {
                return Highcharts.dateFormat('%d-%b-%Y', (this.value));
              }
            }
        },
        yAxis: {
            title: {
                text: 'Y Axis Name'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                  headerFormat:'<b>{series.name}</b><br>'
                }
            }
        },
        series: [{
        
            data: null,
        }]
    }
  }

  // Render Function
  render() {

    // Assign options variable to the Sparkline object's options
    const options = { ...this.options }

    // Just dump all data points into one series for now
    options.series[0].data = this.props.data
    options.series[1].data = this.props.data[0]

    // Giving the one series a dummy name
    options.series[0].name = this.props.seriesName

    // Assign the first series' color (which will just be all points right now) to whatever color the user chooses
    options.series[0].color = this.props.config.color ? this.props.config.color[0] : null

    // Use the width and height that the user gives, or use default
    options.chart.width = this.props.config.chart_width
    options.chart.height = this.props.config.chart_height

    return (
      <Container>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </Container>
    )
  }
}
