var lineColour = '#' + getQSParam().lineColour;
    var vhlt = getQSParam().vhlt === "true";
    var hhlt = getQSParam().hhlt === "true";
    var vaxis = getQSParam().vaxis === "true";
    var haxis = getQSParam().haxis === "true";
    var doTransitions = getQSParam().doTransitions === "true";
    var highlightDates = getQSParam().highlightDates;
    var highlightCondition = getQSParam().highlightCondition;
    var displayTooltips = getQSParam().displayTooltips === "true";
    var dataSrc = decodeURIComponent(getQSParam().dataSrc);
    var offline = getQSParam().offline === "true";
    var maxValue; // this is set in fn addRankings;

    $('.mainContainer').ready(function () {

        if ((dataSrc && dataSrc !== "") || offline) {
            var width = $('body').width();
            var height = $('body').height();

            if (width > 0) {

                var $chartLoading = $('.chart-loading');
                $chartLoading.height(height);
                $chartLoading.css('color', lineColour);

                getData(dataSrc, function (data) {
                  drawChart(data, width, height);
                });
            }
        }
    });

    function drawChart(data, width, height) {
        // if (doTransitions) {
        //     draw5Bars(data);
        // } else {
            drawSparkLine(data, width, height);
        // }
    }

    function stripNullValues(dataArray) {
        var updatedArray = [];
        var dataset = {};

        for (var i = 0; i < dataArray.length; i++) {
            if (!isNaN(dataArray[i].value)) {
                updatedArray.push(dataArray[i]);
            }
        }

        dataset.allData = updatedArray;

        return dataset;
    }

    function addRankings(dataset) {

        // If compareFunction(a, b) is less than 0, sort a to a lower index than b, i.e. a comes first.
        // 
        var ranking_sort_desc = function(a, b) {
            // sorting for "most" or "top"
            // if a > b then it needs a lower index
            var diff = b.value - a.value;
            if (diff === 0) {
                // if a is earlier than b then it needs a lower index
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else {
                return diff;
            }
        };

        var ranking_sort_asc = function(a, b) {
            // sorting for "fewest" or "bottom"
            // if a < b then it needs a lower index
            var diff = a.value - b.value;
            if (diff === 0) {
                // if a is earlier than b then it needs a lower index
                diff = new Date(a.date).getTime() - new Date(b.date).getTime();
            // } else {
            //     return diff;
            }
            return diff;
        };

        dataset.sort(ranking_sort_asc);

        for (var i = 0; i < dataset.length; i++) {
            dataset[i].rankAsc = i;
        }

        dataset.sort(ranking_sort_desc);

        for (var j = 0; j < dataset.length; j++) {
            dataset[j].rankDesc = j;

            if (dataset[j].rankDesc === 0)
                maxValue = dataset[j].value;
        }
    }

    function highlightData(dataArray) {
        var highlightDatesArray = [];

        if (highlightDates) {
            highlightDatesArray = highlightDates.split(',');
        }

        for (var i = 0; i < dataArray.length; i++) {
            // if (highlightCondition === "bottom10" && dataArray[i].rankAsc === 0) {
            //     dataArray[i].highlight = "bottom10";
            // } else if (highlightCondition === "top10" && dataArray[i].rankDesc === 0) {
            //     dataArray[i].highlight = "top10";
            // }

            for (var k = 0; k < highlightDatesArray.length; k++) {
                if (highlightDatesArray[k] === dataArray[i].date) {
                    dataArray[i].highlight = "date";
                }
            }
        }

    }

    function getData(dataSrc, callback) {
        var sort_by_date = function(a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        };

        if (offline) {
            var data = {"data":[{"date":"2015-06-10","value":2},{"date":"2015-06-08","value":3},{"date":"2015-05-07","value":3},{"date":"2015-06-09","value":6},{"date":"2015-06-04","value":3},{"date":"2015-05-20","value":3},{"date":"2015-05-15","value":1},{"date":"2015-05-11","value":3},{"date":"2015-05-06","value":7},{"date":"2015-05-05","value":13},{"date":"2015-05-04","value":7},{"date":"2015-05-02","value":1},{"date":"2015-04-30","value":3}],"property":"pushId"};

            highlightDates = "2015-06-10";
            dataset = stripNullValues(data.data);
            dataset.allData.sort(sort_by_date);
            addRankings(dataset.allData);
            dataset.allData.sort(sort_by_date);
            highlightData(dataset.allData);
            dataset.property = data.property;
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
                    dataset.allData.sort(sort_by_date);
                    addRankings(dataset.allData);
                    dataset.allData.sort(sort_by_date);
                    highlightData(dataset.allData);
                    dataset.property = data.property;
                    callback(dataset);
                })
                .fail(function(data) {
                    console.log('error getting chart data', data);

                });
        }
    }

    function getColour(givenColour, offset) {
        // var colourArray = ['#dd2649', '#00a2d4', '#e93d31', '#f2ae1c', '#61b346', '#cf4b9a', '#367ec0', '#00ad87'];
        // var idx = 0;
        // for (var i in colourArray) {
        //     if (colourArray[i] === givenColour) {
        //         idx = i;
        //         break;
        //     }
        // }
        // return colourArray[(idx + offset) % colourArray.length];
        return givenColour;
    }

    function dataFormatType(dataProperty) {
        returnObj = {};

        if (dataProperty.indexOf("duration") > 0) {
            returnObj.isDuration = true;
        } else if (dataProperty.indexOf("percent") > 0) {
            returnObj.isPercentage = true;
        }

        return returnObj;
    }

    function dataTextFormat(data, property) {

        var isDuration = false;
        var isPercentage = false;
        var returnString = "";

        var dataFormat = dataFormatType(property);

        if (dataFormat.isDuration) {
            if (data <= 60) {
                returnString = Math.round(data) + "s";
            } else if (data > 60 && data <= 3600) {
                returnString = Math.floor(data / 60) + 'm ' + Math.round(data % 60) + 's';
            } else {
                returnString = Math.floor(data / 3600) + 'h ' + Math.round((data % 3600) / 60) + 'm';
            }
        } else if (dataFormat.isPercentage) {
            returnString = data + "%";
        } else {
            returnString = sigFigs(data, 4) + '';
        }
        return returnString;
    }

    function formatYAxisLabel(property) {
        return "";
    }

    function get5(dataset, highlightCondition) {
        var returnData = [];
        var getQty = 5;
        getQty = getQty > dataset.length ? dataset.length : getQty;

        var ranking_asc = function(a, b) {
            return a.rankAsc - b.rankAsc;
        };

        var ranking_desc = function(a, b) {
            return a.rankDesc - b.rankDesc;
        };

        if (highlightCondition === "top10") {
            dataset.sort(ranking_desc);
        } else if (highlightCondition === "bottom10") {
            dataset.sort(ranking_asc);
        }

        for (var i = 0; i < getQty; i++) {
            returnData.push(dataset[i]);
        }

        return returnData;
    }

    function draw5Bars(chartData, width, height) {
        var data = get5(chartData.allData, highlightCondition);

        console.log(data);

        var margin = {top: 20, right: 20, bottom: 20, left: 20};

        var rank = function(d) {
            return highlightCondition === "top10" ? d.rankDesc : d.rankAsc;
        };

        var x = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.value; })])
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return rank(d); })])
            .range([0, height]);

        var xMap = function(d) { return x(d.value); };
        var yMap = function(d) { return y(rank(d)); };
            
        // Adds the svg canvas
        var svg = d3.select(".mainContainer")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.selectAll(".five-bar")
            .data(data)
            .enter().append("line")
            .attr("class", "lolly-stick")
            .style("stroke", lineColour )
            .attr("y1", yMap)
            .attr("y2", yMap)
            .attr("x1", 0)
            .attr("x2", xMap);
    }

    function drawSparkLine(chartData, width, height) {

        var data = chartData.allData;

        // var width = $('body').width();
        // var height = $('body').height();

        var yAxisLabel = formatYAxisLabel(chartData.property);

        // Set the dimensions of the canvas / graph
        var margin = {top: 20, right: 20, bottom: 20, left: 20};
        if (vaxis) margin.left -= 0;
        
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        // Parse the date / time
        var parseDate = d3.time.format("%Y-%m-%d").parse,
            formatDate = d3.time.format("%d-%b"),
            bisectDate = d3.bisector(function(d) { return d.date; }).left,
            formatHighlightDate =d3.time.format("%a %e %b");

        data.forEach(function(d) {
            d.date = parseDate(d.date);
            // d.value = isNaN(d.value) ? 0 : d.value;
            // d.value = +d.value;
        });

        // Set the ranges
        var x = d3.time.scale()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([0, width]);

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.value; })])
            .range([height, 0]);

        // setup x 
        var xMap = function(d) { return x(d.date);}; // data -> display

        // setup y
        var yMap = function(d) { return y(d.value); }; // data -> display

        var zoom = d3.behavior.zoom()
            .x(x)
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

        // var drag = d3.behavior.drag()
        //     .origin(function(d) { return d; })
        //     .on("dragstart", dragstarted)
        //     .on("drag", dragged)
        //     .on("dragend", dragended);

        var rankText = function(d, convertMostFewest) {
            var returnText;
            if (highlightCondition === "bottom10") {
                returnText = (d.rankAsc === 0 && convertMostFewest) ? 'Fewest' : ordinal_suffix_of(d.rankAsc + 1);
            } else if (highlightCondition === "top10") {
                returnText = (d.rankDesc === 0 && convertMostFewest) ? 'Most' : ordinal_suffix_of(d.rankDesc + 1);
            }
            return returnText;
        };

        var highlightTextElements = [];

        var highlightTextStore = function(d) {
            if (d.highlight) {
                var highlightObj = {};
                highlightObj.value = d.value;
                highlightObj.rankAsc = d.rankAsc;
                highlightObj.date = d.date;
                highlightObj.psn = y(d.value);
                highlightObj.newPsn = y(d.value);
                highlightObj.highlight = d.highlight;
                highlightTextElements.push(highlightObj);
                // return doTransitions ? "highlight-text-active" : "highlight-text-hidden";
                return "highlight-text-hidden";
            } else {
                return "highlight-text-hidden";
            }
        };

        var updateOverlaps = function() {
            var top, bottom, overlap, difference;
            var diffCheck = 38;
            var padding = 0;

            if (highlightTextElements.length > 1) {
                difference = highlightTextElements[1].psn - highlightTextElements[0].psn;


                if (difference < diffCheck && difference > 0) {
                    overlap = true;
                    top = highlightTextElements[0];
                    bottom = highlightTextElements[1];
                } else if (difference <= 0 && difference > -diffCheck) {
                    overlap = true;
                    top = highlightTextElements[1];
                    bottom = highlightTextElements[0];
                }
                if (overlap) {
                    if (top.psn <= diffCheck) {
                        bottom.newPsn = top.psn + diffCheck + padding;
                    } else {
                        top.newPsn = bottom.psn - diffCheck - padding;
                    }
                }
            }
        };

        var repositionLabel = function(label) {
            for (var i = 0; i < highlightTextElements.length; i++) {
                if (label.getAttribute('rankAsc') === highlightTextElements[i].rankAsc + '') {
                    label.setAttribute('transform', 'translate(0,' + highlightTextElements[i].newPsn + ')');
                }
            }
        };

        $('.chart-loading').hide();

        var highlightTextDiv;
        var highlightPointer;
        if (!doTransitions) {
            highlightTextDiv = d3.select(".mainContainer").append("div")
                .attr("class", "highlight-text-div")
                .style("top", "30px")
                .style("border-color", getColour(lineColour, 1));

            highlightPointer = d3.select(".mainContainer").append("div")
                .attr("class", "highlight-pointer")
                .style("top", "35px")
                .style("border-color", "transparent transparent transparent " + getColour(lineColour, 1));
        }
            
        // Adds the svg canvas
        var svg = d3.select(".mainContainer")
            .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(zoom);

        var container = svg.append("g");

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(5);

        if (haxis) {
            addXAxis(xAxis, svg, height, false, null, width, margin.bottom);
        }

        function getTimeFormatter(dataPoint) {
            if (dataPoint <= 60) {
                returnString = "%Ss";
            } else if (dataPoint > 60 && dataPoint <= 3600) {
                returnString = '%Mm %Ss';
            } else {
                returnString = '%Hh %Mm';
            }
            return returnString;
        }

        var fnTickFormat;

        var dataFormat = dataFormatType(chartData.property);
        if (dataFormat.isDuration) {
            
            fnTickFormat = function(d) {
                var timeFormatter = getTimeFormatter(maxValue);
                var formatTime = d3.time.format(timeFormatter);
                
                return formatTime(new Date(2012, 0, 1, 0, 0, d)); // new Date(year, month, day, hours, minutes, seconds, milliseconds);
            };
        } else {
            fnTickFormat = function(d) { return d; };
        }

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(4)
            .tickSize(-(width + margin.right - margin.left))
            .tickFormat(fnTickFormat);

        if (vaxis) {
            addYAxis(yAxis, svg, width + margin.right - margin.left, margin.left, yAxisLabel);
        }

        drawLollySticks(container, data, height, width, xMap, yMap, lineColour, doTransitions, highlightCondition);

        // add highlight text (rank)
        container.selectAll(".highlight-text-selector")
            .data(data)
            .enter().append("text")
            .attr("class", highlightTextStore )
            .attr("rankAsc", function(d) { return d.rankAsc; } )
            .attr("dx", width + 13)
            .attr("dy", "-.3em")
            .text(function(d) { return rankText(d, true); } );


        if (doTransitions) {

        // Update position of highlight labels if necessary
            // updateOverlaps();

            // // add highlight text (value)
            // container.selectAll(".highlight-text-selector")
            //     .data(data)
            //     .enter().append("text")
            //     .attr("class", function(d) { return (d.highlight ? "highlight-text-active" : "highlight-text-hidden"); } )
            //     .attr("rankAsc", function(d) { return d.rankAsc; } )
            //     .attr("dx", width + 13)
            //     .attr("dy", "1em")
            //     .text(function(d) { return dataTextFormat(d.value, chartData.property); } );

            // // position labels as per updated position
            // container.selectAll(".highlight-text-active")
            //     .each( function() { repositionLabel(this); } );

            // // add highlight main horizontal line
            // container.selectAll(".highlight-text-selector")
            //     .data(highlightTextElements)
            //     .enter().append("line")
            //     .attr('class', "highlight-line")
            //     .style("stroke", lineColour)
            //     .style("stroke-dasharray", "4,2")
            //     .style("stroke-width", 2)
            //     .attr("x1", function(d) { return x(d.date); })
            //     .attr("x2", function(d) { return d.psn === d.newPsn ? width + 10 : width + 6; } )
            //     .attr("transform", function(d) { return "translate(0," + d.psn + ")"; } );


            // // add highlight final tick to label
            // container.selectAll(".highlight-text-selector")
            //     .data(highlightTextElements)
            //     .enter().append("line")
            //     .attr('class', "highlight-line")
            //     .style("stroke", lineColour)
            //     // .style("stroke-dasharray", "4,2")
            //     .style("stroke-width", 2)
            //     .attr("x1", width + 6)
            //     .attr("x2", width + 10 )
            //     .attr("transform", function(d) { return "translate(0," + d.newPsn + ")"; } );

            // // add highlight vertical line to join main line to tick
            // container.selectAll(".highlight-text-selector")
            //     .data(highlightTextElements)
            //     .enter().append("line")
            //     .attr('class', "highlight-line")
            //     .style("stroke", lineColour)
            //     .style("stroke-dasharray", "4,2")
            //     .style("stroke-width", 2)
            //     .attr("y1", function(d) { return d.newPsn; } )
            //     .attr("y2", function(d) { return d.psn; } )
            //     .attr("transform", "translate(" + (width + 6) + ",0)");

            // draw main highlight inner dot
            container.selectAll(".highlight-text-selector")
                .data(highlightTextElements)
                .enter().append("ellipse")
                .attr("class", "highlight-inner-dot")
                .attr("rx", 3.5)
                .attr("ry", 3.5)
                .style("fill", lineColour)
                .style("display", function(d) { return d.highlight === "date" ? "block" : "none" ; } )
                .attr("cx", -50)
                .attr("cy", yMap)
                .transition()
                .delay(1000)
                .duration(1000)
                .attr("cx", xMap)
                .each("end", function() {

                // draw main highlight inner dot - transition to correct size from big
                container.selectAll(".highlight-text-selector")
                    .data(highlightTextElements)
                    .enter().append("ellipse")
                    .attr("class", "highlight-outer-dot")
                    .attr("rx", 200)
                    .attr("ry", 200)
                    .attr("cx", xMap)
                    .attr("cy", yMap)
                    .style("fill", "none")
                    .style("stroke", lineColour)
                    .style("display", function(d) { return d.highlight === "date" ? "block" : "none" ; } )
                    .transition()
                    .duration(700)
                    .attr("rx", 6)
                    .attr("ry", 6);
                });
        } else {
        // draw main highlight inner dot
            container.selectAll(".highlight-text-selector")
                .data(highlightTextElements)
                .enter().append("ellipse")
                .attr("class", "highlight-inner-dot")
                .attr("rx", 3.5)
                .attr("ry", 3.5)
                .style("fill", lineColour)
                .style("display", function(d) { return d.highlight === "date" ? "block" : "none" ; } )
                .attr("cx", xMap)
                .attr("cy", yMap);

                // draw main highlight inner dot - transition to correct size from big
            container.selectAll(".highlight-text-selector")
                .data(highlightTextElements)
                .enter().append("ellipse")
                .attr("class", "highlight-outer-dot")
                .attr("rx", 6)
                .attr("ry", 6)
                .attr("cx", xMap)
                .attr("cy", yMap)
                .style("fill", "none")
                .style("stroke", lineColour)
                .style("display", function(d) { return d.highlight === "date" ? "block" : "none" ; } );
        }

        var focus = container.append("g") 
            .style("display", "none");

        // place the date at the intersection
        focus.append("text")
            .attr("class", "y3")
            .style("stroke", "#e7e9ee")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "1em");
        focus.append("text")
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", "1em");

       // append the x line
        focus.append("line")
            .attr("class", "x")
            .style("stroke", getColour(lineColour, 1))
            .style("stroke-dasharray", "4,2")
            .style("opacity", 0.5)
            .style("stroke-width", 2);
            // .attr("y1", 0)
            // .attr("y2", height);

        // append the y line
        focus.append("line")
            .attr("class", "y")
            .style("stroke", getColour(lineColour, 1))
            .style("stroke-dasharray", "4,2")
            .style("opacity", 0.5)
            .style("stroke-width", 2)
            .attr("x1", width)
            .attr("x2", width);

        // append the circle at the intersection
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "none")
            .style("stroke", getColour(lineColour, 1))
            .style("stroke-width", 2)
            .attr("r", 4);

        // place the value at the intersection
        focus.append("text")
            .attr("class", "y1")
            .style("stroke", "#e7e9ee")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "-.3em");
        focus.append("text")
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", "-.3em");

        // place the date at the intersection
        focus.append("text")
            .attr("class", "y3")
            .style("stroke", "#e7e9ee")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", "1em");
        focus.append("text")
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", "1em");

        var rect = container.append("rect")
            .attr("width", width * 2)
            .attr("height", height)
            .attr("x", -width)
            .style("fill", "none")
            .style("pointer-events", "all"); 

        // append the rectangle to capture mouse
        if (false) { //displayTooltips) {//
            rect.on("mouseover", function() { focus.style("display", null); });
            rect.on("mouseout", function() { focus.style("display", "none"); });
            rect.on("mousemove", mousemove);
        }

        var buildHighlightText = function (d) {
            var returnString = "";

            returnString += rankText(d, false) + ' position of ' + data.length + '<br>';
            returnString += dataTextFormat(d.value, chartData.property) + '<br>';
            returnString += formatHighlightDate(d.date);

            return returnString;
        };

        var doHighlightTextOffset = function() {
            var highlightOffset;
            var offsetPadding = 10;

            highlightOffset = +(highlightTextDiv.style("width").replace("px", ""));
            highlightOffset += (+(highlightTextDiv.style("padding").replace("px", "")) * 2);
            highlightOffset += offsetPadding;

            highlightTextDiv.style("left", (width + margin.left - highlightOffset) + "px");

            highlightPointer.style("left", (width + margin.left - offsetPadding + 2) + "px");         
        };

        if (!doTransitions) {
            svg.append("line")
                .attr("class", "main-highlight-line")
                .style("stroke", getColour(lineColour, 1))
                .style("stroke-dasharray", "4,2")
                .style("opacity", 0.5)
                .style("stroke-width", 1.5)
                .attr("x1", width)
                .attr("x2", width)
                .attr("y1", 0)
                .attr("y2", height);

            svg.append("circle")
                .attr("class", "main-highlight-circle")
                .style("fill", "none")
                .style("stroke", getColour(lineColour, 1))
                .style("stroke-width", 2)
                .attr("r", 4)
                .attr("cx", x(data[data.length-1].date))
                .attr("cy", y(data[data.length-1].value));

            highlightTextDiv.html(buildHighlightText(data[data.length-1]));

            doHighlightTextOffset();
        }

        var max = xMap(data[data.length-1]);
        var lastScale = 1;

        var zoomEventTid = 0;
        var panEventTid = 0;

        var sendZoomEvent = function(){
            var ev = {
                eventCategory: 'chart',
                eventAction: 'zoom-pan',
                eventLabel: 'zoom'
            };

            analytics.send('event', ev);
        };

        var sendPanEvent = function(){
            var ev = {
                eventCategory: 'chart',
                eventAction: 'zoom-pan',
                eventLabel: 'pan'
            };

            analytics.send('event', ev);
        };

        // ToDo: refactor this so that this function doesn't depend on being declared after container
        function zoomed() {
            
            var tx = d3.event.translate[0];

            var doneZoom = false;
            if (lastScale !== d3.event.scale) {
                doneZoom = true;
                max = xMap(data[data.length-1]) - tx;
            }

            lastScale = d3.event.scale;
            var ty = d3.event.translate[1];

            tx = Math.min(tx, width);
            tx = Math.max(tx, (width - max));
            
            if (!doneZoom) {
                if(panEventTid === 0){
                    console.log('sending pan event');
                    sendPanEvent();
                    var resetPanId = function(){
                        console.log('pan event reset');
                        panEventTid = 0;
                    };

                    panEventTid = window.setTimeout(resetPanId, 30000);
                }
                d3.event.target.translate([tx, ty]);
            }
            else{
                if(zoomEventTid === 0){
                    console.log('sending zoom event');
                    sendZoomEvent();
                    var resetZoomId = function(){
                        console.log('zoom event reset');
                        zoomEventTid = 0;
                    };

                    zoomEventTid = window.setTimeout(resetZoomId, 30000);
                }
            }

            container.attr("transform", "translate(" + tx + ",0)scale(" + d3.event.scale + ",1)");

            if (tx !== 0)
                svg.select(".x.axis").call(xAxis);

            container.selectAll('.dot, .highlight-inner-dot')
                .attr('rx', 3.5 / d3.event.scale );

            container.selectAll('.highlight-outer-dot')
                .style('stroke-width', 1 / d3.event.scale )
                .attr('rx', 6 / d3.event.scale );

            container.selectAll('.lolly-stick')
                .style('stroke-width', 1 / d3.event.scale );

            container.selectAll('.highlight-line, .highlight-text-active')
                .style('display', d3.event.scale === 1 && tx === 0 ? 'block' : 'none');

            var x0 = x.invert(width),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i];

            var d;
            if (!d1.date)
                d = d0;
            else if (!d0.date)
                d = d1;
            else
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            svg.select("circle.main-highlight-circle")
                .attr("cx", x(d.date))
                .attr("cy", y(d.value));


            highlightTextDiv.html(buildHighlightText(d));
            doHighlightTextOffset();
        }
    }
