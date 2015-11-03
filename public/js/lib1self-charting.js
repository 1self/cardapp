// http://bl.ocks.org/stepheneb/1182434

var offline = true; // getQSParam().offline === "true";

function drawChart(data, dataConfig, $targetElement, chartType) {

    var dataset = stripNullValues(data);
    if (!dataConfig.lineColour) dataConfig.lineColour = '#000000';

    $targetElement.ready(function() {

        var width = $targetElement.width();
        var height = $targetElement.height();
        var selector = '.' + $targetElement.attr('class').split(' ').join('.');

        dataConfig = getConfiguration(dataset, dataConfig, width, height);

        if (chartType === 'spark-bar') {
            drawSparkBar(dataset, dataConfig, width, height, selector);
        } else if (chartType === 'line') {
            drawLine(dataset, dataConfig, width, height, selector);
        }

    });
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

        dataset = stripNullValues(data.data);
        dataset.sort(sort_by_date);
        callback(dataset);
    } else {
        var apiURL = dataSrc;
        // alert(apiURL);
        var jqxhr = $.getJSON(apiURL,
                function() {

                })
            .done(function(data) {

                console.log('chart data', data);
                dataset = stripNullValues(data.data);
                dataset.sort(sort_by_date);
                callback(dataset);
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

    dataConfig.parseDate = d3.time.format("%Y-%m-%d").parse;
    dataConfig.formatDate = d3.time.format("%d-%b");
    dataConfig.bisectDate = d3.bisector(function(d) { return d.date; }).left;
    dataConfig.formatHighlightDate = d3.time.format("%a %e %b");

    chartData.forEach(function(d) {
        d.date = dataConfig.parseDate(d.date);
        // d.value = isNaN(d.value) ? 0 : d.value;
        d.value = +d.value;
    });

    dataConfig.x = d3.time.scale()
        .domain(d3.extent(chartData, function(d) {
            return d.date;
        }))
        .range([0, dataConfig.width]);

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

function drawLine(chartData, dataConfig, width, height, targetElementSelector) {

    var line = d3.svg.line()
        .x(function(d) { return dataConfig.x(d.date); })
        .y(function(d) { return dataConfig.y(d.value); });

    // Adds the svg canvas
    var svg = createSvg(dataConfig, targetElementSelector);

    svg.append("path")
        .datum(chartData)
        .attr("class", "line")
        .style("stroke", dataConfig.lineColour)
        .style("fill", "none")
        .attr("d", line);
}

function drawSparkBar(chartData, dataConfig, width, height, targetElementSelector) {

    // Adds the svg canvas
    var svg = createSvg(dataConfig, targetElementSelector);

    var container = svg.append("g");

    container.selectAll(".bar-spark")
        .data(chartData)
        .enter().append("line")
        .attr("class", "bar-spark")
        .style("stroke", dataConfig.lineColour)
        .attr("y1", dataConfig.height)
        .attr("y2", dataConfig.yMap)
        .attr("x1", dataConfig.xMap)
        .attr("x2", dataConfig.xMap);

}
