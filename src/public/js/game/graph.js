// Create the input graph
var g = new dagreD3.graphlib.Graph({ compound: true})
  .setGraph({})
  .setDefaultEdgeLabel(function() { return {}; });

    // Create a group to hold subcategories of supercat
    g.setNode('TCATA01', { style: 'fill: #d3d7e8; border: 1px solid black;' });
    
// This cat has incoming nodes so it should not be in the top group
    g.setNode("TCAT005",  { labelType: "html", label: "<p class='name'>TCAT005</p>", class: "Category" });
    g.setNode('TCAT005G', { class: 'Category', style: 'fill: #d3d7e8; border: 1px solid black;' });
    g.setParent('TCAT005', 'TCAT005G');

    // Super category mode, create nodes for all subcategories
    g.setNode("TCAT001",  { labelType: "html", label: "<p class='name'>TCAT001</p>", class: "Category" });
    g.setNode('TCAT001G', { style: 'fill: #d3d7e8; border: 1px solid black;' });
    g.setParent('TCAT001', 'TCATA01');


    g.setNode("TCAT002",  { labelType: "html", label: "<p class='name'>TCAT002</p>", class: "Category" });
    g.setNode('TCAT002G', { style: 'fill: #d3d7e8; border: 1px solid black;' });
    g.setParent('TCAT002', 'TCATA01');

    g.setNode("TCAT003",  { labelType: "html", label: "<p class='name'>TCAT003</p>", class: "Category" });
    g.setNode('TCAT003G', { style: 'fill: #d3d7e8; border: 1px solid black;' });
    g.setParent('TCAT003', 'TCATA01');

    g.setNode("TCAT004",  { labelType: "html", label: "<p class='name'>TCAT004</p>", class: "Category" });
    g.setNode('TCAT004G', { style: 'fill: #d3d7e8; border: 1px solid black;' });
    g.setParent('TCAT004', 'TCATA01');

    // Put the Siemens groups in the siemens general group. (HOw to specify?)
    g.setParent('TCAT001G', 'TCAT005G');
    g.setParent('TCAT002G', 'TCAT005G');

    


// Create a node for each Product

        g.setNode(
            "T0001", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Weinig-PLC-Ervaring/S7-Basis/p/T0001'>S7 Basis</a></p><p>Basis STEP7 en SIMATIC S7-300/400</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0001", 'TCAT001G');

        g.setNode(
            "T0002", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Weinig-PLC-Ervaring/S7-Service/p/T0002'>S7 Service</a></p><p>S7-300/400 Storingzoeken en inbedrijfname</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0002", 'TCAT001G');

        g.setNode(
            "T0007", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Weinig-PLC-Ervaring/S7-Profinet/p/T0007'>S7 Profinet</a></p><p>Profinet / Ethernet S7-300/400</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0007", 'TCAT005G');


        g.setNode(
            "T0006", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Weinig-PLC-Ervaring/S7-Safety/p/T0006'>S7-Safety</a></p><p>S7-300/400 Safety</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0006", 'TCAT005G');

    

        g.setNode(
            "T0010", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Weinig-PLC-Ervaring/WinCC-Flexibe/p/T0010'>WinCC-Flexibe</a></p><p>WinCC</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0010", 'TCAT005G');

    

        g.setNode(
            "T0009", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Weinig-PLC-Ervaring/S7-Graph/p/T0009'>S7-Graph</a></p><p>S7-300/400 Programmeren met S7-Graph</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0009", 'TCAT005G');

    

        g.setNode(
            "T0004", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Weinig-PLC-Ervaring/S7-Prog2/p/T0004'>S7-Prog2</a></p><p>S7-300/400 Programmeren voor gevorderden</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0004", 'TCAT005G');

    

        g.setNode(
            "T0003", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Weinig-PLC-Ervaring/S7-Prog1/p/T0003'>S7-Prog1</a></p><p>S7-300/400 Programmeren</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0003", 'TCAT001G');

    

        g.setNode(
            "T0005", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Weinig-PLC-Ervaring/S7-SCL/p/T0005'>S7-SCL</a></p><p>Programmeren in Structured Text S7-300/400</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0005", 'TCAT005G');

    

        g.setNode(
            "T0011", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-OPC-UA/OPC-Basis/p/T0011'>OPC Basis</a></p><p>OPC Basis (OLE for Process Control)</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0011", 'TCAT003G');


        g.setNode(
            "T0012", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-OPC-UA/OPC-UA/p/T0012'>OPC-UA</a></p><p>OPC Unified Architecture</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0012", 'TCAT003G');

    

        g.setNode(
            "T0008", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-SIMATIC-S7-300-400---Ruime-PLC-Ervaring/S7-Systeem/p/T0008'>S7-Systeem</a></p><p>S7-300/400 Systeemcursus</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0008", 'TCAT002G');

    

        g.setNode(
            "T0013", {
                labelType: "html",
                label: "<p class='name'><a href='/Siemens-STEP7-Classic/SIEMENS-NET-XML/-NET-XML/p/T0013'>.NET-XML</a></p><p>Vernieuwde communicatietechnologieen</p>",
                class: "Product"
        });

        // Add the Product Node to the Group of the Category
        g.setParent("T0013", 'TCAT004G');

// Create an edge for each relation...


        // If a node has no defined edges, add it to the category
        
            g.setEdge("TCAT001", "T0001", {  });
        
            // ... but only if the target is also visible
            if (g.node('T0001')) {
                g.setEdge("T0001", "T0002", {  });
            }
        

        // If a node has no defined edges, add it to the category
        
            // ... but only if the target is also visible
            /*if (g.node('T0003')) {
                g.setEdge("T0003", "T0007", {  });
            }
        
            // ... but only if the target is also visible
            if (g.node('T0008')) {
                g.setEdge("T0008", "T0007", {  });
            }*/

            g.setEdge("T0003", "TCAT005", {  });


        // If a node has no defined edges, add it to the category
        
            // ... but only if the target is also visible
            /*if (g.node('T0003')) {
                g.setEdge("T0003", "T0006", {  });
            }
        
            // ... but only if the target is also visible
            if (g.node('T0008')) {
                g.setEdge("T0008", "T0006", {  });
            }*/

            g.setEdge("TCAT005", "T0006", {  });


        // If a node has no defined edges, add it to the category
        
            // ... but only if the target is also visible
            /*if (g.node('T0003')) {
                g.setEdge("T0003", "T0010", {  });
            }
        
            // ... but only if the target is also visible
            if (g.node('T0008')) {
                g.setEdge("T0008", "T0010", {  });
            }*/

            g.setEdge("TCAT005", "T0010", {  });
        

        // If a node has no defined edges, add it to the category
        
            // ... but only if the target is also visible
            /*if (g.node('T0008')) {
                g.setEdge("T0008", "T0009", {  });
            }
        
            // ... but only if the target is also visible
            if (g.node('T0003')) {
                g.setEdge("T0003", "T0009", {  });
            }*/

            g.setEdge("T0008", "TCAT005", {  });

            g.setEdge("TCAT005", "T0009", {  });
            g.setEdge("TCAT005", "T0007", {  });
        

        // If a node has no defined edges, add it to the category
        
            // ... but only if the target is also visible
            /*f (g.node('T0003')) {
                g.setEdge("T0003", "T0004", {  });
            }
        
            // ... but only if the target is also visible
            if (g.node('T0008')) {
                g.setEdge("T0008", "T0004", {  });
            }*/

            g.setEdge("TCAT005", "T0004", {  });
        

        // If a node has no defined edges, add it to the category
        
            // ... but only if the target is also visible
            if (g.node('T0001')) {
                g.setEdge("T0001", "T0003", {  });
            }
        

        // If a node has no defined edges, add it to the category
        
            // ... but only if the target is also visible
            if (g.node('T0004')) {
                g.setEdge("T0004", "T0005", {  });
            }
        

        // If a node has no defined edges, add it to the category
        

        // If a node has no defined edges, add it to the category
        
            g.setEdge("TCAT003", "T0011", {  });
        
            // ... but only if the target is also visible
            if (g.node('T0011')) {
                g.setEdge("T0011", "T0012", {  });
            }
        

        // If a node has no defined edges, add it to the category
        

        // If a node has no defined edges, add it to the category
        
            g.setEdge("TCAT002", "T0008", {  });
        

        // If a node has no defined edges, add it to the category
        
            g.setEdge("TCAT004", "T0013", {  });
        

// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
    svgGroup = svg.append("g");

// Run the renderer. This is what draws the final graph.
render(d3.select("svg g"), g);

// Center the graph
var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);