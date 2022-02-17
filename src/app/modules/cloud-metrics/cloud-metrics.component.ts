import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cloud-metrics',
  templateUrl: './cloud-metrics.component.html',
  styleUrls: ['./cloud-metrics.component.scss'],
})
export class CloudMetricsComponent implements OnInit {
  readonly chartFont = 'Nunito';
  readonly chartBg = '#ccceda';
  readonly chartPlotColor = '#3b426e';
  readonly chartFontColor = '#000';

  public graphData = {
    line: { color: '#3B426E', width: 3 },
    name: 'historical',
    type: 'scatter',
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
  };

  public graphLayout = {
    title: {
      text: 'Title',
      font: {
        family: this.chartFont,
        size: 14,
        // color: this.chartFontColor
      },
      xref: 'paper',
      xanchor: 'center',
    },
    width: 300,
    height: 250,
    paper_bgcolor: 'transparent',
    plot_bgcolor: this.chartBg,
    margin: {
      l: 20,
      r: 20,
      b: 20,
      t: 50,
      pad: 0,
    },
    xaxis: {
      tickfont: {
        family: this.chartFont,
        size: 12,
        color: this.chartFontColor,
      },
    },
    yaxis: {
      tickfont: {
        family: this.chartFont,
        size: 12,
        color: this.chartFontColor,
      },
    },
    showlegend: true,
    legend: {
      x: 0,
      y: 1,
      traceorder: 'normal',
      font: {
        family: this.chartFont,
        size: 12,
        color: '#000',
      },
    },
  };

  public graphConfig = {
    displayModeBar: false,
    responsive: true,
  };

  public indicator1 = [{
    domain: {
      x: [0, 1],
      y: [0, 1],
    },
    value: 450,
    title: {
      text: 'Max TaskInstanceFailures',
      color: '#000',
      font: {
        size: 14,
      },
    },
    type: 'indicator',
    mode: 'gauge+number',
    delta: {
      reference: 400,
    },
    gauge: {
      axis: {
        range: [null, 500],
      },
      steps: [{
        range: [0, 250],
        color: 'lightgray',
      }, {
        range: [250, 400],
        color: 'gray',
      }],
      threshold: {
        line: {
          color: 'red',
          width: 4,
        },
        thickness: 0.75,
        value: 490
      }
    }
  }];

  public indicatorsLayout = {
    width: 200,
    height: 170,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: {
      l: 30,
      r: 30,
      b: 20,
      t: 0,
      pad: 0,
    },
    font: {
      family: 'Nunito',
      size: 14,
      color: '#000',
    },
  };

  // constructor() { }

  dummy = 0;
  ngOnInit(): void {
    this.dummy = 1;
    // console.log('init');
  }
}
