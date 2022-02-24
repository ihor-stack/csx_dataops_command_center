export interface NsMetric {
  name: string;
  graphData?: {
    line: { color: '#3B426E', width: 3 },
    type: 'scatter',
    x: string[],
    y: number[]
  }
}

export interface Namespace {
  key: string;
  displayName: string;
  order: number;
}

export interface HiddenMetric {
  namespace: string;
  metric: string;
}
