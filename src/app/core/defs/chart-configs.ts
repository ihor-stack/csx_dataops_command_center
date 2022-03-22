import { SimpleObject } from '@defs/common';

const chartFont = 'Nunito';
const chartBg = '#ccceda';
// const chartPlotColor = '#3b426e';
const chartFontColor = '#000';

export const defLineChartLayout: SimpleObject = {
  paper_bgcolor: 'transparent',
  plot_bgcolor: chartBg,
  margin: {
    l: 40,
    r: 10,
    b: 50,
    t: 10,
    pad: 0,
  },
  autosize: true,
  xaxis: {
    tickfont: {
      family: chartFont,
      size: 12,
      color: chartFontColor,
    },
  },
  yaxis: {
    tickfont: {
      family: chartFont,
      size: 12,
      color: chartFontColor,
    },
  },
  showlegend: false,
  legend: {
    x: 0,
    y: 1,
    traceorder: 'normal',
    font: {
      family: chartFont,
      size: 12,
      color: '#000',
    },
  },
};

export const defLineChartConfig: SimpleObject = {
  displayModeBar: false,
  responsive: true,
};

export const defGaugeChartConfig: SimpleObject[] = [{
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

export const defGaugeChartLayout: SimpleObject = {
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
    family: chartFont,
    size: 14,
    color: '#000',
  },
};
