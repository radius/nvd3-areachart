var AreaChart = function(url, selector) {
  this.url = url;
  this.selector = selector;
};
AreaChart.prototype.show = function() {
  var self = this;
  d3.json(self.url, function(data) {
    nv.addGraph(function() {
      var chart = nv.models.lineChart()
        .x(function(d) {
            return d[0]
        })
        .y(function(d) {
            return d[1]
        })
        .clipEdge(true)
        .useInteractiveGuideline(true)
        .transitionDuration(500)
        .showLegend(false);

      chart.xAxis
        .showMaxMin(false)
        .tickFormat(function(d) {
            return d3.time.format('%x')(new Date(d))
        });

      chart.yAxis.tickFormat(d3.format(',.2f'));

      d3.select(self.selector)
        .datum(data)
        .transition().duration(500).call(chart);

      nv.utils.windowResize(chart.update);
      return chart;
    });
  });  
}
