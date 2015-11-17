// http://bl.ocks.org/stepheneb/1182434

var offline = false; // getQSParam().offline === "true";

function drawChart(datasets, dataConfig, $targetElement) {
    var svg;
    var width, height, selector;

    datasets.merged = mergeDatasets(datasets);
    console.log('datasets are', datasets);

    $targetElement.ready(function() {

        for (var i = 0; i < datasets.length; i++) {
            var data = datasets[i];

            if (data !== undefined && data.length > 0) {
                if (!dataConfig.series[i].lineColour) dataConfig.series[i].lineColour = '#000000';


                if (i === 0) {
                    width = $targetElement.width();
                    height = $targetElement.height();
                    selector = '.' + $targetElement.attr('class').split(' ').join('.');
                }

                dataConfig = getConfiguration(datasets, dataConfig, i, width, height);
                
                // Adds the svg canvas
                if (i === 0) {
                    if (dataConfig.yAxis.showAxis) {
                        createLegend(dataConfig, selector);
                    }
                    
                    svg = createSvg(dataConfig, selector, i);

                    var xAxisElem;
                    var yAxisElem;

                    if (dataConfig.series[i].chartTypeObj.xSeriesType !== 'arc') {
                        if (dataConfig.xAxis.showAxis)
                            xAxisElem = drawXAxis(dataConfig, svg, i);

                        if (dataConfig.yAxis.showAxis)
                            yAxisElem = drawYAxis(dataConfig, svg, xAxisElem, i);
                    }
                }

                if (dataConfig.series[i].chartType === 'spark-histogram') {
                    drawSparkColumn(data, dataConfig, i, svg);

                } else if (dataConfig.series[i].chartType === 'column') {
                    drawColumn(data, dataConfig, i, svg);

                } else if (dataConfig.series[i].chartType === 'line') {
                    drawLine(data, dataConfig, i, svg);

                } else if (dataConfig.series[i].chartType === 'match-sticks') {
                    drawMatchSticks(data, dataConfig, i, svg);
                    
                } else if (dataConfig.series[i].chartType === 'pie') {
                    drawPie(data, dataConfig, i, svg);
                }

                // if (dataConfig.yAxis.showAxis && yAxisElem !== undefined)
                    // appendYAxisLabel(yAxisElem, dataConfig);
            }
        }

    });
}

function mergeDatasets(datasets) {
    var merged = [];
    for (var i = 0; i < datasets.length; i++) {
        var dataset = datasets[i];
        for (var j = 0; j < dataset.length; j++) {
            var dataObj = findByDate(merged, dataset[j].date);
            var value = +dataset[j].value;
            if (dataObj === undefined) {
                dataObj = { date: dataset[j].date, values: [] };
                dataObj.values[i] = value;
                dataObj.maxValue = value;
                dataObj.minValue = value;
                merged.push(dataObj);
            } else {
                dataObj.maxValue = Math.max(dataObj.maxValue, value);
                dataObj.minValue = Math.max(dataObj.minValue, value);
                dataObj.values[i] = value;
            }
        }
    }
    return merged;
}

function findByDate(valuesArray, dateStr) {
    var returnObj;
    for (var i = 0; i < valuesArray.length; i++) {
        if (valuesArray[i].date === dateStr) {
            returnObj = valuesArray[i];
            break;
        }
    }
    return returnObj;
}

function stripNullValues(dataArray) {
    var updatedArray = [];

    for (var i = 0; i < dataArray.length; i++) {
        if (!isNaN(dataArray[i].value)) {
            updatedArray.push(dataArray[i]);
        }
    }

    return updatedArray;
}

function getData(dataSrc, callback, bounceback) {
    var sort_by_date = function(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    };

    if (offline) {
        var data = {
            "data": [{
                "date": "2015-06-10",
                "value": 2
            }, {
                "date": "2015-06-08",
                "value": 3
            }, {
                "date": "2015-05-07",
                "value": 3
            }, {
                "date": "2015-06-09",
                "value": 6
            }, {
                "date": "2015-06-04",
                "value": 3
            }, {
                "date": "2015-05-20",
                "value": 3
            }, {
                "date": "2015-05-15",
                "value": 1
            }, {
                "date": "2015-05-11",
                "value": 3
            }, {
                "date": "2015-05-06",
                "value": 7
            }, {
                "date": "2015-05-05",
                "value": 13
            }, {
                "date": "2015-05-04",
                "value": 7
            }, {
                "date": "2015-05-02",
                "value": 1
            }, {
                "date": "2015-04-30",
                "value": 3
            }],
            "property": "pushId"
        };

        data = stripNullValues(data.data);
        data.sort(sort_by_date);
        callback(data, bounceback);
    } else {
        var apiURL = dataSrc;
        var jqxhr = $.getJSON(apiURL,
                function() {

                })
            .done(function(data) {

                console.log('chart data', data);
                data = stripNullValues(data);
                data.sort(sort_by_date);
                callback(data, bounceback);
            })
            .fail(function(data) {
                console.log('error getting chart data', data);

            });
    }
}

function getConfiguration(datasets, dataConfig, seriesId, width, height) {
    var series = dataConfig.series[seriesId];

    if (!series) {
        series = { chartType: 'line' };
        dataConfig.series[seriesId] = series;
    }


    series.chartTypeObj = getAvailableChartTypes(series.chartType);

    // Set the dimensions of the canvas / graph
    if (!dataConfig.margin) {
        dataConfig.margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };        
    }

    dataConfig.width = width - dataConfig.margin.left - dataConfig.margin.right;
    dataConfig.height = height - dataConfig.margin.top - dataConfig.margin.bottom;

    if (!dataConfig.xAxis) dataConfig.xAxis = {};
    if (!dataConfig.xAxis.parseFormat) dataConfig.xAxis.parseFormat = '%Y-%m-%d';

    if (!dataConfig.yAxis) dataConfig.yAxis = {};

    if (!dataConfig.parseDate) dataConfig.parseDate = d3.time.format(dataConfig.xAxis.parseFormat).parse;
    if (!dataConfig.formatDate) dataConfig.formatDate = d3.time.format("%d-%b");
    if (!dataConfig.bisectDate) dataConfig.bisectDate = d3.bisector(function(d) { return d.date; }).left;
    if (!dataConfig.formatHighlightDate) dataConfig.formatHighlightDate = d3.time.format("%a %e %b");

    if (seriesId === 0) {
        datasets.merged.forEach(function(d) {
            d.date = dataConfig.parseDate(d.date);
            // d.value = isNaN(d.value) ? 0 : d.value;
            // d.value = +d.value;
        });
    }

    datasets[seriesId].forEach(function(d) {
        d.date = dataConfig.parseDate(d.date);
        // d.value = isNaN(d.value) ? 0 : d.value;
        d.value = +d.value;
    });

    if (series.chartTypeObj.xSeriesType === 'arc') {
        series.radius = Math.min(dataConfig.width, dataConfig.height) / 2;

        series.color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        series.arc = d3.svg.arc()
            .outerRadius(series.radius - 10)
            .innerRadius(0);

        series.pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.value; });

    } else {

        if (series.chartTypeObj.xSeriesType === 'discrete') {
            series.x = d3.scale.ordinal()
                .domain(datasets.merged.map(function(d) { return d.date; }));
        } else {
            series.x = d3.time.scale()
                .domain(d3.extent(datasets.merged, function(d) {
                    return d.date;
                }));
        }

        setRange(series.x, 'x', dataConfig, seriesId);

        series.y = d3.scale.linear()
            .domain([0, d3.max(datasets.merged, function(d) {
                return d.maxValue;
            })]);

        setRange(series.y, 'y', dataConfig, seriesId);

        // setup x 
        series.xMap = function(d) {
            return series.x(d.date);
        }; // data -> display

        // setup y
        series.yMap = function(d) {
            return series.y(d.value);
        }; // data -> display        
    }

    return dataConfig;
}

function setRange(objectToRange, xOrY, dataConfig, seriesId) {
    var rangeStart;
    if (xOrY === 'x') {
        rangeStart = dataConfig.yAxis.width === undefined ? 0 : dataConfig.yAxis.width;
        if (dataConfig.series[seriesId].chartTypeObj.xSeriesType === 'discrete') {
            objectToRange.rangeRoundBands([rangeStart, dataConfig.width], 0.1);
        } else {
            objectToRange.range([rangeStart, dataConfig.width]);
        }
    } else {
        objectToRange.range([dataConfig.height, 0]);
    }
}

function createLegend(dataConfig, targetElementSelector) {
    var legend = d3.select(targetElementSelector).append("div")
        .attr("class", "chart-legend");

    var legendHtml = '';
    for (var i = 0; i < dataConfig.series.length; i++) {

        var series = dataConfig.series[i];
        var row = legend.append('div')
            .attr("class", "chart-legend-row");

        var rowLeft = row.append('div')
            .attr("class", "row-left");

        var rowRight = row.append('div')
            .attr("class", "row-right");

        rowRight.append('div')
            .attr("class", "row-right-item")
            .html(series.dataLabel);

        rowLeft.append('div')
            .attr("class", "row-left-item")
            .style("background-color", series.lineColour)
            .style('height', '100%')
            .style('width', '100%')
            .html('&nbsp;');
    }
}

function createSvg(dataConfig, targetElementSelector, seriesId) {
    console.log(dataConfig);
    var svg = d3.select(targetElementSelector)
        .append("svg")
        .attr("width", dataConfig.width + dataConfig.margin.left + dataConfig.margin.right)
        .attr("height", dataConfig.height + dataConfig.margin.top + dataConfig.margin.bottom)
        .append("g");

    if (dataConfig.series[seriesId].chartType === 'pie') {
        svg.attr("transform", "translate(" + dataConfig.width / 2 + "," + dataConfig.height / 2 + ")");
    } else {
        svg.attr("transform", "translate(" + dataConfig.margin.left + "," + dataConfig.margin.top + ")");
    }

    return svg;  
}

function drawXAxis(dataConfig, svg, seriesId) {
    var series = dataConfig.series[seriesId];

    dataConfig.xAxis.fn = d3.svg.axis()
        .scale(series.x)
        .orient("bottom");

    dataConfig.xAxis.fn.tickFormat(function (d) {
        var formatDate = d3.time.format("%d-%b");
        return formatDate(d);
    });

    var g = svg.append("g")
        .attr("class", "x axis")
        .call(dataConfig.xAxis.fn);

    dataConfig.xAxis.height = g.node().getBBox().height;
    dataConfig.margin.bottom += dataConfig.xAxis.height;
    dataConfig.height -= dataConfig.xAxis.height;

    setRange(series.y, 'y', dataConfig, seriesId);

    g.attr("transform", "translate(0," + dataConfig.height + ")");

    return g;
}

function drawYAxis(dataConfig, svg, xElem, seriesId) {
    var series = dataConfig.series[seriesId];

    dataConfig.yAxis.fn = d3.svg.axis()
        .scale(series.y)
        .orient("left")
        .ticks(10);

    var g = svg.append("g")
        .attr("class", "y axis")
        .call(dataConfig.yAxis.fn);

    // console.log(dataConfig);

    dataConfig.yAxis.width = g.node().getBBox().width;
    dataConfig.margin.left += dataConfig.yAxis.width;
    dataConfig.width -= dataConfig.yAxis.width;

    setRange(series.x, 'x', dataConfig, seriesId);

    // console.log(dataConfig);

    g.attr("transform", "translate(" + dataConfig.yAxis.width + ",0)");

    if (xElem !== undefined)
        xElem.call(dataConfig.xAxis.fn);

    return g;
}

function appendYAxisLabel(yElem, dataConfig) {
    yElem.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(dataConfig.yAxis.label);
}

function drawLine(chartData, dataConfig, seriesId, svg) {
    var series = dataConfig.series[seriesId];

    var line = d3.svg.line()
        // .interpolate('basis')
        .x(series.xMap)
        .y(series.yMap);


    var path = svg.append("path")
        .datum(chartData)
        .attr("class", "line")
        .style("stroke", series.lineColour)
        .style("fill", "none")
        .attr("d", line);

    if (seriesId !== 0)
        path.style("stroke-dasharray", ("3,3"));
}

function drawMatchSticks(chartData, dataConfig, seriesId, svg) {
    var series = dataConfig.series[seriesId];

    svg.selectAll(".match-stick-" + seriesId)
        .data(chartData)
        .enter().append("line")
        .attr("class", "match-stick")
        .style("stroke", series.lineColour )
        .attr("y1", dataConfig.height)
        .attr("y2", series.yMap)
        .attr("x1", series.xMap)
        .attr("x2", series.xMap);

    // draw dots
    svg.selectAll(".dot-" + seriesId)
        .data(chartData)
        .enter().append("ellipse")
        .attr("class", "dot")
        .attr("rx", 3.5)
        .attr("ry", 3.5)
        .attr("cx", series.xMap)
        .attr("cy", series.yMap)
        .style("fill", series.lineColour );
}

function drawSparkColumn(chartData, dataConfig, seriesId, svg) {
    var series = dataConfig.series[seriesId];

    var container = svg.append("g");

    container.selectAll(".histogram-spark")
        .data(chartData)
        .enter().append("line")
        .attr("class", "histogram-spark")
        .style("stroke", series.lineColour)
        .attr("y1", dataConfig.height)
        .attr("y2", series.yMap)
        .attr("x1", series.xMap)
        .attr("x2", series.xMap);

}

function drawColumn(chartData, dataConfig, seriesId, svg) {
    var series = dataConfig.series[seriesId];

    var container = svg.append("g");

    container.selectAll(".column")
        .data(chartData)
        .enter().append("rect")
        .attr("class", "column")
        .style("fill", series.lineColour)
        .attr("x", series.xMap)
        .attr("width", series.x.rangeBand())
        .attr("y", series.yMap)
        .attr("height", function(d) { return dataConfig.height - series.y(d.value); });
}

function drawPie(chartData, dataConfig, seriesId, svg) {
    var series = dataConfig.series[seriesId];

    var data = series.pie(chartData);

    var g = svg.selectAll(".arc")
        .data(data)
    .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", series.arc)
        .style("fill", function(d) { return series.color(d.data.date); });

    g.append("text")
        .attr("transform", function(d, i) { return "translate(" + series.arc.centroid(d, i) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return dataConfig.formatDate(d.data.date); });
}



function getAvailableChartTypes(chartType) {
    var chartTypes = [
        { name: 'Spark histogram', identifier: 'spark-histogram', displayType: 'small', xSeriesType: 'continuous' },
        { name: 'Line', identifier: 'line', displayType: 'any', xSeriesType: 'continuous' }, 
        { name: 'Column', identifier: 'column', displayType: 'large', xSeriesType: 'discrete' },
        { name: 'Pie', identifier: 'pie', displayType: 'large', xSeriesType: 'arc' },
        { name: 'Match sticks', identifier: 'match-sticks', displayType: 'large', xSeriesType: 'continuous' }
    ];

    if (chartType === undefined) {
        return chartTypes;
    } else {
        for (var i = 0; i < chartTypes.length; i++) {
            if (chartTypes[i].identifier === chartType) {
                return chartTypes[i];
            }
        }
    }
}

function filterChartTypesBySeriesType(xSeriesType) {
    var allTypes = getAvailableChartTypes();
    var returnArray = [];
    for (var i = 0; i < allTypes.length; i++) {
        if (allTypes[i].xSeriesType === xSeriesType) {
            returnArray.push(allTypes[i]);
        }
    }
    return returnArray;
}
