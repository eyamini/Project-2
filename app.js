//Plotly Belly Button Biodiversity
function buildData(id) {
    //Retrieve metadata using athletes_merged.json
        d3.json("athletes_merged.json").then (SampleData =>{
            var ids = SampleData.athletes_merged[0].Name;
            var input =  SampleData.athletes_merged[0].earnings_million.slice(0,10).reverse();
            var label =  SampleData.athletes_merged[0].otu_labels.slice(0,10);
            var otu = ( SampleData.athletes_merged[0].Name.slice(0, 10)).reverse();
            var otu_id = otu.map(d => "OTU " + d);
         // Organize data for building charts
            var label =  SampleData.athletes_merged[0].otu_labels.slice(0,10);
            console.log(`otu_labels: ${label}`)
            var trace = {
                x: input,
                y: otu_id,
                text: label,
                marker: {
                color: 'darkblue'},
                type:"bar",
                orientation: "h",
            };
            var data = [trace];
            var layout = {
                title: "Microbial Species",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 90,
                    r: 90,
                    t: 90,
                    b: 40
                }
            };
            // Build Bar Chart
        Plotly.newPlot("bar", data, layout);
            // Build Bubble Chart
            var trace1 = {
                x: SampleData.athletes_merged[0].Name,
                y: SampleData.athletes_merged[0].earnings_million,
                mode: "markers",
                marker: {
                    size: SampleData.athletes_merged[0].earnings_million,
                    color: SampleData.athletes_merged[0].Name
                },
                text:  SampleData.athletes_merged[0].otu_labels
            };
            var layout_2 = {
                xaxis:{title: "ID"},
                height: 600,
                width: 1000
            };
            var data1 = [trace1];
        Plotly.newPlot("bubble", data1, layout_2); 
        });
    }  
    // Data retrieval function
    function getInfo(id) {
        d3.json("athletes_merged.json").then((data)=> {
            var metadata = data.metadata;
            var result = metadata.filter(meta => meta.id.toString() === id)[0];
            var demographicInfo = d3.select("#sample-metadata");
            demographicInfo.html("");
            //Append demogragphic data
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    function optionChanged(id) {
        buildData(id);
        getInfo(id);
    }
    function init() {
        //Dropdown menu
        var dropdown = d3.select("#selDataset");
        d3.json("athletes_merged.json").then((data)=> {
            console.log(data)
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
            //Build Plotly plots from data
            buildData(data.names[0]);
            getInfo(data.names[0]);
        });
    }
    init();