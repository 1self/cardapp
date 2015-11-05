// http://bl.ocks.org/stepheneb/1182434

var offline = false; // getQSParam().offline === "true";

function drawChart(data, dataConfig, $targetElement) {

    if (data.length > 0) {
        if (!dataConfig.lineColour) dataConfig.lineColour = '#000000';

        $targetElement.ready(function() {

            var width = $targetElement.width();
            var height = $targetElement.height();
            var selector = '.' + $targetElement.attr('class').split(' ').join('.');

            dataConfig = getConfiguration(data, dataConfig, width, height);

            // Adds the svg canvas
            var svg = createSvg(dataConfig, selector);

            if (dataConfig.xAxis.showAxis)
                drawXAxis(dataConfig, svg);

            if (dataConfig.yAxis.showAxis)
                drawYAxis(dataConfig, svg);

            if (dataConfig.chartType === 'spark-column') {
                drawSparkColumn(data, dataConfig, svg, selector);
            } else if (dataConfig.chartType === 'column') {
                drawColumn(data, dataConfig, svg, selector);
            } else if (dataConfig.chartType === 'line') {
                drawLine(data, dataConfig, svg, selector);
            }

        });
    }
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

function getData(dataSrc, callback) {
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
        callback(data);
    } else {
        var apiURL = dataSrc;
        var jqxhr = $.getJSON(apiURL,
                function() {

                })
            .done(function(data) {

                console.log('chart data', data);
                data = stripNullValues(data);
                data.sort(sort_by_date);
                callback(data);
            })
            .fail(function(data) {
                console.log('error getting chart data', data);

            });
    }
}

function getConfiguration(chartData, dataConfig, width, height) {
    if (!dataConfig)
        dataConfig = {};

    // Set the dimensions of the canvas / graph
    if (!dataConfig.margin) {
        dataConfig.margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };        
    }

    dataConfig.width = width;
    dataConfig.height = height;

    if (!dataConfig.xAxis) dataConfig.xAxis = {};
    if (!dataConfig.xAxis.parseFormat) dataConfig.xAxis.parseFormat = '%Y-%m-%d';

    if (!dataConfig.yAxis) dataConfig.yAxis = {};

    dataConfig.parseDate = d3.time.format(dataConfig.xAxis.parseFormat).parse;
    dataConfig.formatDate = d3.time.format("%d-%b");
    dataConfig.bisectDate = d3.bisector(function(d) { return d.date; }).left;
    dataConfig.formatHighlightDate = d3.time.format("%a %e %b");

    chartData.forEach(function(d) {
        d.date = dataConfig.parseDate(d.date);
        // d.value = isNaN(d.value) ? 0 : d.value;
        d.value = +d.value;
    });

    if (dataConfig.chartType === 'column') {
        dataConfig.x = d3.scale.ordinal()
            .domain(chartData.map(function(d) { return d.date; }))
            .rangeRoundBands([0, dataConfig.width], 0.1);
    } else {
        dataConfig.x = d3.time.scale()
            .domain(d3.extent(chartData, function(d) {
                return d.date;
            }))
            .range([0, dataConfig.width]);
    }

    dataConfig.y = d3.scale.linear()
        .domain([0, d3.max(chartData, function(d) {
            return d.value;
        })])
        .range([height, 0]);

    // setup x 
    dataConfig.xMap = function(d) {
        return dataConfig.x(d.date);
    }; // data -> display

    // setup y
    dataConfig.yMap = function(d) {
        return dataConfig.y(d.value);
    }; // data -> display

    return dataConfig;
}

function createSvg(dataConfig, targetElementSelector) {
    var svg = d3.select(targetElementSelector)
        .append("svg")
        .attr("width", dataConfig.width + dataConfig.margin.left + dataConfig.margin.right)
        .attr("height", dataConfig.height + dataConfig.margin.top + dataConfig.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + dataConfig.margin.left + "," + dataConfig.margin.top + ")");

    return svg;  
}

function drawXAxis(dataConfig, svg) {
    dataConfig.xAxis = d3.svg.axis()
        .scale(dataConfig.x)
        .orient("bottom");

    dataConfig.xAxis.tickFormat(function (d) {
        var formatDate = d3.time.format("%d-%b");
        return formatDate(d);
    });

    var g = svg.append("g")
        .attr("class", "x axis")
        .call(dataConfig.xAxis);

    dataConfig.xAxis.height = g.node().getBBox().height;
    dataConfig.margin.bottom += dataConfig.xAxis.height;
    dataConfig.height -= dataConfig.xAxis.height;

    g.attr("transform", "translate(0," + dataConfig.height + ")");
}

function drawYAxis(dataConfig, svg) {
    // dataConfig.xAxis = d3.svg.axis()
    //     .scale(dataConfig.x)
    //     .orient("bottom");

    // svg.append("g")
    //     .attr("class", "x axis")
    //     .attr("transform", "translate(0," + dataConfig.height + ")")
    //     .call(dataConfig.xAxis);
}

function drawLine(chartData, dataConfig, svg, targetElementSelector) {

    var line = d3.svg.line()
        .x(function(d) { return dataConfig.x(d.date); })
        .y(function(d) { return dataConfig.y(d.value); });


    svg.append("path")
        .datum(chartData)
        .attr("class", "line")
        .style("stroke", dataConfig.lineColour)
        .style("fill", "none")
        .attr("d", line);
}

function drawSparkColumn(chartData, dataConfig, svg, targetElementSelector) {

    var container = svg.append("g");

    container.selectAll(".column-spark")
        .data(chartData)
        .enter().append("line")
        .attr("class", "column-spark")
        .style("stroke", dataConfig.lineColour)
        .attr("y1", dataConfig.height)
        .attr("y2", dataConfig.yMap)
        .attr("x1", dataConfig.xMap)
        .attr("x2", dataConfig.xMap);

}

function drawColumn(chartData, dataConfig, svg, targetElementSelector) {

    var container = svg.append("g");

    container.selectAll(".column")
        .data(chartData)
        .enter().append("rect")
        .attr("class", "column")
        .attr("x", function(d) { return dataConfig.x(d.date); })
        .attr("width", dataConfig.x.rangeBand())
        .attr("y", function(d) { return dataConfig.y(d.value); })
        .attr("height", function(d) { return dataConfig.height - dataConfig.y(d.value); });
}



function availableChartTypes() {
    return ['spark-column', 'line', 'column' ];
}
