import { ChartType } from '../types/chart';

export const chartTypes: ChartType[] = [
  // Animation & Transitions
  {
    id: 'animated-treemap',
    name: 'Animated Treemap',
    category: 'Animation & Transitions',
    description: 'Smooth transitions between treemap layouts',
    observableUrl: '@d3/animated-treemap'
  },
  {
    id: 'temporal-force-directed-graph',
    name: 'Temporal Force-Directed Graph',
    category: 'Animation & Transitions',
    description: 'Force-directed graph that evolves over time',
    observableUrl: '@d3/temporal-force-directed-graph'
  },
  {
    id: 'connected-scatterplot',
    name: 'Connected Scatterplot',
    category: 'Animation & Transitions',
    description: 'Animated scatterplot showing temporal connections',
    observableUrl: '@d3/connected-scatterplot/2'
  },
  {
    id: 'wealth-health-nations',
    name: 'The Wealth & Health of Nations',
    category: 'Animation & Transitions',
    description: 'Famous animated bubble chart by Hans Rosling',
    observableUrl: '@mbostock/the-wealth-health-of-nations'
  },
  {
    id: 'scatterplot-tour',
    name: 'Scatterplot Tour',
    category: 'Animation & Transitions',
    description: 'Guided tour through different data projections',
    observableUrl: '@d3/scatterplot-tour'
  },
  {
    id: 'bar-chart-race',
    name: 'Bar Chart Race',
    category: 'Animation & Transitions',
    description: 'Animated racing bar chart',
    observableUrl: '@d3/bar-chart-race'
  },
  {
    id: 'stacked-to-grouped-bars',
    name: 'Stacked to Grouped Bars',
    category: 'Animation & Transitions',
    description: 'Smooth transition between bar chart layouts',
    observableUrl: '@d3/stacked-to-grouped-bars'
  },
  {
    id: 'streamgraph-transitions',
    name: 'Streamgraph Transitions',
    category: 'Animation & Transitions',
    description: 'Animated streamgraph with smooth transitions',
    observableUrl: '@d3/streamgraph-transitions'
  },
  {
    id: 'bar-chart-transitions',
    name: 'Bar Chart Transitions',
    category: 'Animation & Transitions',
    description: 'Smooth bar chart transitions',
    observableUrl: '@d3/bar-chart-transitions/2'
  },
  {
    id: 'icelandic-population-by-age',
    name: 'Icelandic Population by Age',
    category: 'Animation & Transitions',
    description: 'Population pyramid animation over time',
    observableUrl: '@d3/icelandic-population-by-age-1841-2019'
  },
  {
    id: 'pie-chart-update',
    name: 'Pie Chart Update',
    category: 'Animation & Transitions',
    description: 'Animated pie chart updates',
    observableUrl: '@d3/pie-chart-update'
  },
  {
    id: 'arc-tween',
    name: 'Arc Tween',
    category: 'Animation & Transitions',
    description: 'Smooth arc transitions',
    observableUrl: '@d3/arc-tween'
  },

  // Zoom & Pan
  {
    id: 'smooth-zooming',
    name: 'Smooth Zooming',
    category: 'Zoom & Pan',
    description: 'Smooth zoom transitions on scatterplot',
    observableUrl: '@d3/smooth-zooming'
  },
  {
    id: 'zoom-to-bounding-box',
    name: 'Zoom to Bounding Box',
    category: 'Zoom & Pan',
    description: 'Smart zooming to specific regions',
    observableUrl: '@d3/zoom-to-bounding-box'
  },
  {
    id: 'orthographic-to-equirectangular',
    name: 'Orthographic to Equirectangular',
    category: 'Zoom & Pan',
    description: 'Map projection transitions',
    observableUrl: '@d3/orthographic-to-equirectangular'
  },
  {
    id: 'world-tour',
    name: 'World Tour',
    category: 'Zoom & Pan',
    description: 'Animated world map tour',
    observableUrl: '@d3/world-tour'
  },
  {
    id: 'walmarts-growth',
    name: "Walmart's Growth",
    category: 'Zoom & Pan',
    description: 'Animated expansion of Walmart stores',
    observableUrl: '@d3/walmarts-growth'
  },
  {
    id: 'versor-dragging',
    name: 'Versor Dragging',
    category: 'Zoom & Pan',
    description: 'Smooth globe rotation with versor interpolation',
    observableUrl: '@d3/versor-dragging'
  },
  {
    id: 'index-chart',
    name: 'Index Chart',
    category: 'Zoom & Pan',
    description: 'Zoomable index chart with focus and context',
    observableUrl: '@d3/index-chart/2'
  },
  {
    id: 'sequences-sunburst',
    name: 'Sequences Sunburst',
    category: 'Zoom & Pan',
    description: 'Interactive sequence sunburst with breadcrumbs',
    observableUrl: '@kerryrodden/sequences-sunburst'
  },
  {
    id: 'brushable-scatterplot',
    name: 'Brushable Scatterplot',
    category: 'Zoom & Pan',
    description: 'Scatterplot with brush selection',
    observableUrl: '@d3/brushable-scatterplot'
  },
  {
    id: 'brushable-scatterplot-matrix',
    name: 'Brushable Scatterplot Matrix',
    category: 'Zoom & Pan',
    description: 'Interactive scatterplot matrix with brushing',
    observableUrl: '@d3/brushable-scatterplot-matrix'
  },
  {
    id: 'pannable-chart',
    name: 'Pannable Chart',
    category: 'Zoom & Pan',
    description: 'Chart with pan functionality',
    observableUrl: '@d3/pannable-chart'
  },
  {
    id: 'zoomable-area-chart',
    name: 'Zoomable Area Chart',
    category: 'Zoom & Pan',
    description: 'Area chart with zoom and pan',
    observableUrl: '@d3/zoomable-area-chart'
  },
  {
    id: 'zoomable-bar-chart',
    name: 'Zoomable Bar Chart',
    category: 'Zoom & Pan',
    description: 'Bar chart with zoom functionality',
    observableUrl: '@d3/zoomable-bar-chart'
  },
  {
    id: 'seamless-zoomable-map-tiles',
    name: 'Seamless Zoomable Map Tiles',
    category: 'Zoom & Pan',
    description: 'Smooth map tile zooming',
    observableUrl: '@d3/seamless-zoomable-map-tiles'
  },

  // Statistical
  {
    id: 'moving-average',
    name: 'Moving Average',
    category: 'Statistical',
    description: 'Time series with moving average overlay',
    observableUrl: '@d3/moving-average'
  },
  {
    id: 'bollinger-bands',
    name: 'Bollinger Bands',
    category: 'Statistical',
    description: 'Stock chart with Bollinger bands',
    observableUrl: '@d3/bollinger-bands/2'
  },
  {
    id: 'box-plot',
    name: 'Box Plot',
    category: 'Statistical',
    description: 'Statistical box and whisker plot',
    observableUrl: '@d3/box-plot/2'
  },
  {
    id: 'histogram',
    name: 'Histogram',
    category: 'Statistical',
    description: 'Data distribution histogram',
    observableUrl: '@d3/histogram/2'
  },
  {
    id: 'kernel-density-estimation',
    name: 'Kernel Density Estimation',
    category: 'Statistical',
    description: 'Smooth density estimation curve',
    observableUrl: '@d3/kernel-density-estimation'
  },
  {
    id: 'density-contours',
    name: 'Density Contours',
    category: 'Statistical',
    description: '2D density contour plot',
    observableUrl: '@d3/density-contours'
  },
  {
    id: 'volcano-contours',
    name: 'Volcano Contours',
    category: 'Statistical',
    description: 'Topographic contour visualization',
    observableUrl: '@d3/volcano-contours/2'
  },
  {
    id: 'contours',
    name: 'Contours',
    category: 'Statistical',
    description: 'General contour plot visualization',
    observableUrl: '@d3/contours'
  },
  {
    id: 'hexbin',
    name: 'Hexbin',
    category: 'Statistical',
    description: 'Hexagonal binning for large datasets',
    observableUrl: '@d3/hexbin'
  },
  {
    id: 'hexbin-area',
    name: 'Hexbin Area',
    category: 'Statistical',
    description: 'Area-based hexagonal binning',
    observableUrl: '@d3/hexbin-area'
  },
  {
    id: 'hexbin-map',
    name: 'Hexbin Map',
    category: 'Statistical',
    description: 'Geographic hexagonal binning',
    observableUrl: '@d3/hexbin-map'
  },
  {
    id: 'q-q-plot',
    name: 'Q-Q Plot',
    category: 'Statistical',
    description: 'Quantile-quantile plot for distribution comparison',
    observableUrl: '@d3/q-q-plot'
  },
  {
    id: 'normal-quantile-plot',
    name: 'Normal Quantile Plot',
    category: 'Statistical',
    description: 'Normal probability plot',
    observableUrl: '@d3/normal-quantile-plot'
  },
  {
    id: 'parallel-sets',
    name: 'Parallel Sets',
    category: 'Statistical',
    description: 'Categorical data flow visualization',
    observableUrl: '@d3/parallel-sets'
  },

  // Hierarchical
  {
    id: 'hierarchical-bar-chart',
    name: 'Hierarchical Bar Chart',
    category: 'Hierarchical',
    description: 'Zoomable hierarchical bar chart',
    observableUrl: '@d3/hierarchical-bar-chart'
  },
  {
    id: 'zoomable-treemap',
    name: 'Zoomable Treemap',
    category: 'Hierarchical',
    description: 'Interactive zoomable treemap',
    observableUrl: '@d3/zoomable-treemap'
  },
  {
    id: 'zoomable-circle-packing',
    name: 'Zoomable Circle Packing',
    category: 'Hierarchical',
    description: 'Interactive circle packing diagram',
    observableUrl: '@d3/zoomable-circle-packing'
  },
  {
    id: 'collapsible-tree',
    name: 'Collapsible Tree',
    category: 'Hierarchical',
    description: 'Interactive collapsible tree diagram',
    observableUrl: '@d3/collapsible-tree'
  },
  {
    id: 'zoomable-icicle',
    name: 'Zoomable Icicle',
    category: 'Hierarchical',
    description: 'Interactive icicle diagram',
    observableUrl: '@d3/zoomable-icicle'
  },
  {
    id: 'zoomable-sunburst',
    name: 'Zoomable Sunburst',
    category: 'Hierarchical',
    description: 'Interactive sunburst diagram',
    observableUrl: '@d3/zoomable-sunburst'
  },
  {
    id: 'treemap',
    name: 'Treemap',
    category: 'Hierarchical',
    description: 'Basic treemap visualization',
    observableUrl: '@d3/treemap/2'
  },
  {
    id: 'cascaded-treemap',
    name: 'Cascaded Treemap',
    category: 'Hierarchical',
    description: 'Multi-level cascaded treemap',
    observableUrl: '@d3/cascaded-treemap'
  },
  {
    id: 'nested-treemap',
    name: 'Nested Treemap',
    category: 'Hierarchical',
    description: 'Nested treemap with multiple levels',
    observableUrl: '@d3/nested-treemap'
  },
  {
    id: 'pack',
    name: 'Circle Packing',
    category: 'Hierarchical',
    description: 'Basic circle packing layout',
    observableUrl: '@d3/pack/2'
  },
  {
    id: 'indented-tree',
    name: 'Indented Tree',
    category: 'Hierarchical',
    description: 'Indented tree layout',
    observableUrl: '@d3/indented-tree'
  },
  {
    id: 'tree',
    name: 'Tree',
    category: 'Hierarchical',
    description: 'Basic tree diagram',
    observableUrl: '@d3/tree/2'
  },
  {
    id: 'radial-tree',
    name: 'Radial Tree',
    category: 'Hierarchical',
    description: 'Radial tree layout',
    observableUrl: '@d3/radial-tree/2'
  },
  {
    id: 'cluster',
    name: 'Cluster',
    category: 'Hierarchical',
    description: 'Cluster dendrogram',
    observableUrl: '@d3/cluster/2'
  },
  {
    id: 'radial-cluster',
    name: 'Radial Cluster',
    category: 'Hierarchical',
    description: 'Radial cluster dendrogram',
    observableUrl: '@d3/radial-cluster/2'
  },
  {
    id: 'sunburst',
    name: 'Sunburst',
    category: 'Hierarchical',
    description: 'Basic sunburst diagram',
    observableUrl: '@d3/sunburst/2'
  },
  {
    id: 'icicle',
    name: 'Icicle',
    category: 'Hierarchical',
    description: 'Basic icicle diagram',
    observableUrl: '@d3/icicle/2'
  },
  {
    id: 'tangled-tree-visualization',
    name: 'Tangled Tree Visualization',
    category: 'Hierarchical',
    description: 'Complex tree with crossing branches',
    observableUrl: '@nitaku/tangled-tree-visualization-ii'
  },
  {
    id: 'tree-of-life',
    name: 'Tree of Life',
    category: 'Hierarchical',
    description: 'Phylogenetic tree visualization',
    observableUrl: '@d3/tree-of-life'
  },
  {
    id: 'force-directed-tree',
    name: 'Force-Directed Tree',
    category: 'Hierarchical',
    description: 'Tree layout with force simulation',
    observableUrl: '@d3/force-directed-tree'
  },

  // Networks
  {
    id: 'force-directed-graph',
    name: 'Force-Directed Graph',
    category: 'Networks',
    description: 'Interactive force-directed network',
    observableUrl: '@d3/force-directed-graph/2'
  },
  {
    id: 'disjoint-force-directed-graph',
    name: 'Disjoint Force-Directed Graph',
    category: 'Networks',
    description: 'Multiple disconnected network components',
    observableUrl: '@d3/disjoint-force-directed-graph/2'
  },
  {
    id: 'mobile-patent-suits',
    name: 'Mobile Patent Suits',
    category: 'Networks',
    description: 'Network of patent litigation',
    observableUrl: '@d3/mobile-patent-suits'
  },
  {
    id: 'arc-diagram',
    name: 'Arc Diagram',
    category: 'Networks',
    description: 'Network as arc connections',
    observableUrl: '@d3/arc-diagram'
  },
  {
    id: 'sankey',
    name: 'Sankey Diagram',
    category: 'Networks',
    description: 'Flow diagram showing connections',
    observableUrl: '@d3/sankey/2'
  },
  {
    id: 'hierarchical-edge-bundling',
    name: 'Hierarchical Edge Bundling',
    category: 'Networks',
    description: 'Bundled edge network visualization',
    observableUrl: '@d3/hierarchical-edge-bundling'
  },
  {
    id: 'hierarchical-edge-bundling-2',
    name: 'Hierarchical Edge Bundling II',
    category: 'Networks',
    description: 'Advanced edge bundling technique',
    observableUrl: '@d3/hierarchical-edge-bundling/2'
  },
  {
    id: 'chord-diagram',
    name: 'Chord Diagram',
    category: 'Networks',
    description: 'Circular relationship diagram',
    observableUrl: '@d3/chord-diagram'
  },
  {
    id: 'chord-diagram-2',
    name: 'Chord Diagram II',
    category: 'Networks',
    description: 'Enhanced chord diagram',
    observableUrl: '@d3/chord-diagram/2'
  },
  {
    id: 'directed-chord-diagram',
    name: 'Directed Chord Diagram',
    category: 'Networks',
    description: 'Directional chord relationships',
    observableUrl: '@d3/directed-chord-diagram/2'
  },
  {
    id: 'chord-dependency-diagram',
    name: 'Chord Dependency Diagram',
    category: 'Networks',
    description: 'Software dependency chord diagram',
    observableUrl: '@d3/chord-dependency-diagram/2'
  },

  // Bar Charts
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    category: 'Bar Charts',
    description: 'Simple vertical bar chart',
    observableUrl: '@d3/bar-chart/2'
  },
  {
    id: 'horizontal-bar-chart',
    name: 'Horizontal Bar Chart',
    category: 'Bar Charts',
    description: 'Simple horizontal bar chart',
    observableUrl: '@d3/horizontal-bar-chart/2'
  },
  {
    id: 'diverging-bar-chart',
    name: 'Diverging Bar Chart',
    category: 'Bar Charts',
    description: 'Bar chart with positive and negative values',
    observableUrl: '@d3/diverging-bar-chart/2'
  },
  {
    id: 'stacked-bar-chart',
    name: 'Stacked Bar Chart',
    category: 'Bar Charts',
    description: 'Vertical stacked bar chart',
    observableUrl: '@d3/stacked-bar-chart/2'
  },
  {
    id: 'stacked-horizontal-bar-chart',
    name: 'Stacked Horizontal Bar Chart',
    category: 'Bar Charts',
    description: 'Horizontal stacked bar chart',
    observableUrl: '@d3/stacked-horizontal-bar-chart/2'
  },
  {
    id: 'stacked-normalized-horizontal-bar',
    name: 'Stacked Normalized Horizontal Bar',
    category: 'Bar Charts',
    description: 'Normalized horizontal stacked bars',
    observableUrl: '@d3/stacked-normalized-horizontal-bar/2'
  },
  {
    id: 'grouped-bar-chart',
    name: 'Grouped Bar Chart',
    category: 'Bar Charts',
    description: 'Grouped bar chart for comparing categories',
    observableUrl: '@d3/grouped-bar-chart/2'
  },
  {
    id: 'diverging-stacked-bar-chart',
    name: 'Diverging Stacked Bar Chart',
    category: 'Bar Charts',
    description: 'Stacked bars with positive and negative values',
    observableUrl: '@d3/diverging-stacked-bar-chart/2'
  },
  {
    id: 'marimekko-chart',
    name: 'Marimekko Chart',
    category: 'Bar Charts',
    description: 'Variable-width stacked bar chart',
    observableUrl: '@d3/marimekko-chart'
  },
  {
    id: 'world-history-timeline',
    name: 'World History Timeline',
    category: 'Bar Charts',
    description: 'Historical timeline visualization',
    observableUrl: '@tezzutezzu/world-history-timeline'
  },
  {
    id: 'calendar',
    name: 'Calendar',
    category: 'Bar Charts',
    description: 'Calendar heatmap visualization',
    observableUrl: '@d3/calendar/2'
  },
  {
    id: 'impact-of-vaccines',
    name: 'The Impact of Vaccines',
    category: 'Bar Charts',
    description: 'Disease incidence heatmap',
    observableUrl: '@d3/the-impact-of-vaccines'
  },
  {
    id: 'electric-usage-2019',
    name: 'Electric Usage 2019',
    category: 'Bar Charts',
    description: 'Electricity usage patterns',
    observableUrl: '@mbostock/electric-usage-2019'
  },
  {
    id: 'revenue-by-music-format',
    name: 'Revenue by Music Format',
    category: 'Bar Charts',
    description: 'Music industry revenue over time',
    observableUrl: '@d3/revenue-by-music-format-1973-2018'
  },

  // Line Charts
  {
    id: 'line-chart',
    name: 'Line Chart',
    category: 'Line Charts',
    description: 'Simple line chart',
    observableUrl: '@d3/line-chart/2'
  },
  {
    id: 'line-chart-missing-data',
    name: 'Line Chart with Missing Data',
    category: 'Line Charts',
    description: 'Handling gaps in time series data',
    observableUrl: '@d3/line-chart-missing-data/2'
  },
  {
    id: 'multi-line-chart',
    name: 'Multi-line Chart',
    category: 'Line Charts',
    description: 'Multiple lines on one chart',
    observableUrl: '@d3/multi-line-chart/2'
  },
  {
    id: 'change-line-chart',
    name: 'Change Line Chart',
    category: 'Line Charts',
    description: 'Line chart highlighting changes',
    observableUrl: '@d3/change-line-chart/2'
  },
  {
    id: 'slope-chart',
    name: 'Slope Chart',
    category: 'Line Charts',
    description: 'Before and after comparison',
    observableUrl: '@d3/slope-chart/3'
  },
  {
    id: 'cancer-survival-rates',
    name: 'Cancer Survival Rates',
    category: 'Line Charts',
    description: 'Medical survival rate trends',
    observableUrl: '@d3/cancer-survival-rates/2'
  },
  {
    id: 'mareys-trains',
    name: "Marey's Trains",
    category: 'Line Charts',
    description: 'Train schedule visualization',
    observableUrl: '@d3/mareys-trains'
  },
  {
    id: 'candlestick-chart',
    name: 'Candlestick Chart',
    category: 'Line Charts',
    description: 'Financial candlestick chart',
    observableUrl: '@d3/candlestick-chart/2'
  },
  {
    id: 'variable-color-line',
    name: 'Variable Color Line',
    category: 'Line Charts',
    description: 'Line with color-coded segments',
    observableUrl: '@d3/variable-color-line'
  },
  {
    id: 'gradient-encoding',
    name: 'Gradient Encoding',
    category: 'Line Charts',
    description: 'Line chart with gradient encoding',
    observableUrl: '@d3/gradient-encoding'
  },
  {
    id: 'threshold-encoding',
    name: 'Threshold Encoding',
    category: 'Line Charts',
    description: 'Line chart with threshold highlighting',
    observableUrl: '@d3/threshold-encoding'
  },
  {
    id: 'parallel-coordinates',
    name: 'Parallel Coordinates',
    category: 'Line Charts',
    description: 'Multi-dimensional data visualization',
    observableUrl: '@d3/parallel-coordinates'
  },
  {
    id: 'inequality-in-american-cities',
    name: 'Inequality in American Cities',
    category: 'Line Charts',
    description: 'Income inequality visualization',
    observableUrl: '@d3/inequality-in-american-cities'
  },
  {
    id: 'new-zealand-tourists',
    name: 'New Zealand Tourists',
    category: 'Line Charts',
    description: 'Tourism data over time',
    observableUrl: '@d3/new-zealand-tourists-1921-2018'
  },
  {
    id: 'sea-ice-extent',
    name: 'Sea Ice Extent',
    category: 'Line Charts',
    description: 'Arctic sea ice trends',
    observableUrl: '@d3/sea-ice-extent-1978-2017'
  },

  // Area Charts
  {
    id: 'area-chart',
    name: 'Area Chart',
    category: 'Area Charts',
    description: 'Simple area chart',
    observableUrl: '@d3/area-chart/2'
  },
  {
    id: 'area-chart-missing-data',
    name: 'Area Chart with Missing Data',
    category: 'Area Charts',
    description: 'Area chart handling missing data',
    observableUrl: '@d3/area-chart-missing-data/2'
  },
  {
    id: 'stacked-area-chart',
    name: 'Stacked Area Chart',
    category: 'Area Charts',
    description: 'Multiple stacked areas',
    observableUrl: '@d3/stacked-area-chart/2'
  },
  {
    id: 'normalized-stacked-area-chart',
    name: 'Normalized Stacked Area Chart',
    category: 'Area Charts',
    description: 'Percentage-based stacked areas',
    observableUrl: '@d3/normalized-stacked-area-chart/2'
  },
  {
    id: 'us-population-by-state',
    name: 'US Population by State',
    category: 'Area Charts',
    description: 'Historical population data',
    observableUrl: '@d3/u-s-population-by-state-1790-1990'
  },
  {
    id: 'streamgraph',
    name: 'Streamgraph',
    category: 'Area Charts',
    description: 'Flowing stream-like area chart',
    observableUrl: '@d3/streamgraph/2'
  },
  {
    id: 'difference-chart',
    name: 'Difference Chart',
    category: 'Area Charts',
    description: 'Area chart showing differences',
    observableUrl: '@d3/difference-chart/2'
  },
  {
    id: 'band-chart',
    name: 'Band Chart',
    category: 'Area Charts',
    description: 'Confidence interval band chart',
    observableUrl: '@d3/band-chart/2'
  },
  {
    id: 'ridgeline-plot',
    name: 'Ridgeline Plot',
    category: 'Area Charts',
    description: 'Multiple density curves',
    observableUrl: '@d3/ridgeline-plot'
  },
  {
    id: 'horizon-chart',
    name: 'Horizon Chart',
    category: 'Area Charts',
    description: 'Space-efficient time series',
    observableUrl: '@d3/horizon-chart/2'
  },
  {
    id: 'realtime-horizon-chart',
    name: 'Realtime Horizon Chart',
    category: 'Area Charts',
    description: 'Live updating horizon chart',
    observableUrl: '@d3/realtime-horizon-chart'
  },

  // Scatterplots
  {
    id: 'scatterplot',
    name: 'Scatterplot',
    category: 'Scatterplots',
    description: 'Simple scatterplot',
    observableUrl: '@d3/scatterplot/2'
  },
  {
    id: 'scatterplot-with-shapes',
    name: 'Scatterplot with Shapes',
    category: 'Scatterplots',
    description: 'Scatterplot using different shapes',
    observableUrl: '@d3/scatterplot-with-shapes'
  },
  {
    id: 'splom',
    name: 'Scatterplot Matrix (SPLOM)',
    category: 'Scatterplots',
    description: 'Matrix of scatterplots',
    observableUrl: '@d3/splom/2'
  },
  {
    id: 'dot-plot',
    name: 'Dot Plot',
    category: 'Scatterplots',
    description: 'Cleveland dot plot',
    observableUrl: '@d3/dot-plot/2'
  },
  {
    id: 'global-temperature-trends',
    name: 'Global Temperature Trends',
    category: 'Scatterplots',
    description: 'Climate data visualization',
    observableUrl: '@d3/global-temperature-trends'
  },
  {
    id: 'bubble-map',
    name: 'Bubble Map',
    category: 'Scatterplots',
    description: 'Geographic bubble chart',
    observableUrl: '@d3/bubble-map/2'
  },
  {
    id: 'spike-map',
    name: 'Spike Map',
    category: 'Scatterplots',
    description: 'Geographic spike visualization',
    observableUrl: '@d3/spike-map/2'
  },
  {
    id: 'bubble-chart',
    name: 'Bubble Chart',
    category: 'Scatterplots',
    description: 'Scatterplot with sized bubbles',
    observableUrl: '@d3/bubble-chart/2'
  },
  {
    id: 'beeswarm',
    name: 'Beeswarm',
    category: 'Scatterplots',
    description: 'One-dimensional scatter plot',
    observableUrl: '@d3/beeswarm/2'
  },
  {
    id: 'beeswarm-mirrored',
    name: 'Beeswarm Mirrored',
    category: 'Scatterplots',
    description: 'Mirrored beeswarm plot',
    observableUrl: '@d3/beeswarm-mirrored/2'
  },
  {
    id: 'hertzsprung-russell-diagram',
    name: 'Hertzsprung-Russell Diagram',
    category: 'Scatterplots',
    description: 'Stellar classification diagram',
    observableUrl: '@d3/hertzsprung-russell-diagram'
  },

  // Pie Charts
  {
    id: 'pie-chart',
    name: 'Pie Chart',
    category: 'Pie Charts',
    description: 'Simple pie chart',
    observableUrl: '@d3/pie-chart/2'
  },
  {
    id: 'donut-chart',
    name: 'Donut Chart',
    category: 'Pie Charts',
    description: 'Pie chart with center hole',
    observableUrl: '@d3/donut-chart/2'
  },
  {
    id: 'radial-area-chart',
    name: 'Radial Area Chart',
    category: 'Pie Charts',
    description: 'Area chart in radial coordinates',
    observableUrl: '@d3/radial-area-chart/2'
  },
  {
    id: 'radial-stacked-bar-chart',
    name: 'Radial Stacked Bar Chart',
    category: 'Pie Charts',
    description: 'Stacked bars in radial layout',
    observableUrl: '@d3/radial-stacked-bar-chart/2'
  },
  {
    id: 'radial-stacked-bar-chart-2',
    name: 'Radial Stacked Bar Chart II',
    category: 'Pie Charts',
    description: 'Enhanced radial stacked bars',
    observableUrl: '@d3/radial-stacked-bar-chart/3'
  },

  // Labels & Annotations
  {
    id: 'inline-labels',
    name: 'Inline Labels',
    category: 'Labels & Annotations',
    description: 'Charts with inline labeling',
    observableUrl: '@d3/inline-labels/2'
  },
  {
    id: 'directly-labelling-lines',
    name: 'Directly Labelling Lines',
    category: 'Labels & Annotations',
    description: 'Smart line chart labeling',
    observableUrl: '@harrystevens/directly-labelling-lines'
  },
  {
    id: 'line-with-tooltip',
    name: 'Line with Tooltip',
    category: 'Labels & Annotations',
    description: 'Interactive line chart with tooltips',
    observableUrl: '@d3/line-with-tooltip/2'
  },
  {
    id: 'voronoi-labels',
    name: 'Voronoi Labels',
    category: 'Labels & Annotations',
    description: 'Voronoi-based label placement',
    observableUrl: '@d3/voronoi-labels'
  },
  {
    id: 'occlusion',
    name: 'Occlusion',
    category: 'Labels & Annotations',
    description: 'Label occlusion handling',
    observableUrl: '@fil/occlusion'
  },
  {
    id: 'graticule-labels-stereographic',
    name: 'Graticule Labels Stereographic',
    category: 'Labels & Annotations',
    description: 'Map graticule labeling',
    observableUrl: '@d3/graticule-labels-stereographic'
  },
  {
    id: 'styled-axes',
    name: 'Styled Axes',
    category: 'Labels & Annotations',
    description: 'Custom axis styling',
    observableUrl: '@d3/styled-axes'
  },
  {
    id: 'color-legend',
    name: 'Color Legend',
    category: 'Labels & Annotations',
    description: 'Color scale legends',
    observableUrl: '@d3/color-legend'
  },

  // Maps
  {
    id: 'choropleth',
    name: 'Choropleth Map',
    category: 'Maps',
    description: 'Color-coded geographic regions',
    observableUrl: '@d3/choropleth/2'
  },
  {
    id: 'bivariate-choropleth',
    name: 'Bivariate Choropleth',
    category: 'Maps',
    description: 'Two-variable choropleth map',
    observableUrl: '@d3/bivariate-choropleth'
  },
  {
    id: 'us-state-choropleth',
    name: 'US State Choropleth',
    category: 'Maps',
    description: 'US states choropleth map',
    observableUrl: '@d3/us-state-choropleth/2'
  },
  {
    id: 'world-choropleth',
    name: 'World Choropleth',
    category: 'Maps',
    description: 'World countries choropleth',
    observableUrl: '@d3/world-choropleth/2'
  },
  {
    id: 'world-map',
    name: 'World Map',
    category: 'Maps',
    description: 'Simple world map',
    observableUrl: '@d3/world-map'
  },
  {
    id: 'projection-transitions',
    name: 'Projection Transitions',
    category: 'Maps',
    description: 'Animated map projection changes',
    observableUrl: '@d3/projection-transitions'
  },
  {
    id: 'projection-comparison',
    name: 'Projection Comparison',
    category: 'Maps',
    description: 'Side-by-side projection comparison',
    observableUrl: '@d3/projection-comparison'
  },
  {
    id: 'antimeridian-cutting',
    name: 'Antimeridian Cutting',
    category: 'Maps',
    description: 'Handling antimeridian in maps',
    observableUrl: '@d3/antimeridian-cutting'
  },
  {
    id: 'tissots-indicatrix',
    name: "Tissot's Indicatrix",
    category: 'Maps',
    description: 'Map projection distortion visualization',
    observableUrl: '@d3/tissots-indicatrix'
  },
  {
    id: 'web-mercator-tiles',
    name: 'Web Mercator Tiles',
    category: 'Maps',
    description: 'Tiled web map visualization',
    observableUrl: '@d3/web-mercator-tiles'
  },
  {
    id: 'raster-tiles',
    name: 'Raster Tiles',
    category: 'Maps',
    description: 'Raster tile map implementation',
    observableUrl: '@d3/raster-tiles'
  },
  {
    id: 'vector-tiles',
    name: 'Vector Tiles',
    category: 'Maps',
    description: 'Vector tile map visualization',
    observableUrl: '@d3/vector-tiles'
  },
  {
    id: 'clipped-map-tiles',
    name: 'Clipped Map Tiles',
    category: 'Maps',
    description: 'Clipped tile boundaries',
    observableUrl: '@d3/clipped-map-tiles'
  },
  {
    id: 'raster-vector',
    name: 'Raster & Vector',
    category: 'Maps',
    description: 'Combined raster and vector layers',
    observableUrl: '@d3/raster-vector'
  },
  {
    id: 'vector-field',
    name: 'Vector Field',
    category: 'Maps',
    description: 'Vector field visualization',
    observableUrl: '@d3/vector-field'
  },
  {
    id: 'geotiff-contours',
    name: 'GeoTIFF Contours',
    category: 'Maps',
    description: 'Contours from GeoTIFF data',
    observableUrl: '@d3/geotiff-contours-ii'
  },
  {
    id: 'us-airports-voronoi',
    name: 'US Airports Voronoi',
    category: 'Maps',
    description: 'Airport coverage areas',
    observableUrl: '@d3/us-airports-voronoi'
  },
  {
    id: 'world-airports-voronoi',
    name: 'World Airports Voronoi',
    category: 'Maps',
    description: 'Global airport coverage',
    observableUrl: '@d3/world-airports-voronoi'
  },
  {
    id: 'solar-terminator',
    name: 'Solar Terminator',
    category: 'Maps',
    description: 'Day/night boundary on Earth',
    observableUrl: '@d3/solar-terminator'
  },
  {
    id: 'solar-path',
    name: 'Solar Path',
    category: 'Maps',
    description: 'Sun path visualization',
    observableUrl: '@d3/solar-path'
  },
  {
    id: 'star-map',
    name: 'Star Map',
    category: 'Maps',
    description: 'Celestial star chart',
    observableUrl: '@d3/star-map'
  },
  {
    id: 'non-contiguous-cartogram',
    name: 'Non-contiguous Cartogram',
    category: 'Maps',
    description: 'Area-distorted map visualization',
    observableUrl: '@d3/non-contiguous-cartogram'
  }
];

export const categories = Array.from(new Set(chartTypes.map(chart => chart.category)));