export interface ChartType {
  id: string;
  name: string;
  category: string;
  description: string;
  observableUrl: string;
}

export interface ChartConfig {
  width?: number;
  height?: number;
  data?: any[];
  [key: string]: any;
}

export interface SavedChartCode {
  [chartId: string]: string;
}

export interface EcoreModel {
  name: string;
  elements: EcoreElement[];
}

export interface EcoreElement {
  type: string;
  name: string;
  attributes: { [key: string]: any };
  children?: EcoreElement[];
}