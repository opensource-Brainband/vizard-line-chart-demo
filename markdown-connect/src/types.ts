// CSV data parsing result
export interface CSVData {
  headers: string[];
  rows: string[][];
}


// One row of Line Chart data
export interface LineChartDatum {
  [key: string]: string | number;
}

// Line Chart full data
export interface LineChartSpec {
  title?: string;
  xAxisLabel: string;
  yAxisLabel: string;
  data: LineChartDatum[];
}

// Table visualization type (independent)
export interface TableSpec {
  type: 'table';
  options: {
    title?: string;
  };
  rows: string[][];
}
