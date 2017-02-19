require.config({
  baseUrl: "js/",
shim : {
        'd3': {
            exports: 'd3'
        },

        "bootstrap" : { "deps" :['jquery'] },
        "tooltip":{ "deps" :['nx','bootstrap','properties']} ,
        "MainView" : { "deps" :['nx'] },
        "TopologyView" : { "deps" :['nx','tooltip'] },
        "TopologyModel" : { "deps" :['nx'] },
        "MainView" : { "deps" :['nx'] },
        "ActionPanel":{ "deps" :['nx'] },
        "configurationEvents":{ "deps" :['jquery.spin','properties'] },
        "OrbitControls":{"deps":["three"]},
        "agGrid":{"deps":["reactFrameworkFactory"]},
        "reactCellRendererFactory":{"deps":["ag-grid","agReactComponent"]},
        "reactFrameworkFactory":{"deps":["ag-grid","reactCellRendererFactory","reactCellEditorFactory"]},
        "reactFilterFactory":{"deps":["agReactComponent"]},
        "agReactComponent":{"deps":["ag-grid"]},
        "reactCellEditorFactory":{"deps":["agReactComponent"]},
    },
  paths: {
    "react": "react.min",
    "react-dom": "react-dom.min",
    "JSXTransformer": "JSXTransformer",
    "jquery": "jquery",
    "reactDnd": "react-dnd",
    "reactdndhtml5backend":"react-dnd-html5-backend.min",
    "bootstrap":"bootstrap.min",
    "nx":"next",
    "properties":"properties/properties",
    "socket":"socket.io-1.4.5",
    "toastr":"toastr.min",
    "three":"three.min",
    "OrbitControls":"threejs/controls/OrbitControls",
    "Detector":"threejs/Detector",
    "fixedTable":"../fixed-data-table-master/dist/fixed-data-table",
    "agGrid":"../js/thirdParty/ag-grid-react-master/lib/agGridReact",
    "reactCellRendererFactory":"../js/thirdParty/ag-grid-react-master/lib/reactCellRendererFactory",
    "reactFilterFactory":"../js/thirdParty/ag-grid-react-master/lib/reactFilterFactory",
    "sockjs":"websocket/sockjs",
    "stomp":"websocket/stomp",
    'config':'properties/config',
    "ag-grid":"../js/thirdParty/ag-grid-react-master/lib/ag-grid",
    "reactFrameworkFactory":"../js/thirdParty/ag-grid-react-master/lib/reactFrameworkFactory",
    "reactCellEditorFactory":"../js/thirdParty/ag-grid-react-master/lib/reactCellEditorFactory",
    "agReactComponent":"../js/thirdParty/ag-grid-react-master/lib/agReactComponent",
    'd3':'thirdParty/d3/d3.v3.min',
    'axios':"thirdParty/axios/axios.min"
  },

  jsx: {
    fileExtension: '.jsx',
    harmony: true,
    stripTypes: true
  }
});

require(['react','react-dom', 'jsx!components/Routing','jquery'], function(React,ReactDom,  RoutingFile, $ ) {
//'react-jsonschema-form',
/*$( document ).on( "click", "legend", function(e) {
  e.preventDefault();
   $(this).siblings().toggle('slow');
    $(this).toggleClass('menu-open');

  // console.log( $.now() );

});*///'react-jsonschema-form',

$( document ).on( "click", ".policiesCreate > fieldset > legend", function(e) {
  e.preventDefault();
   $(this).siblings().toggle('slow');
    $(this).toggleClass('menu-open');
    $(this).closest('.array-item').find('.array-item-toolbox').toggle();
});

$( document ).on( "click", ".pathbundleCreate > fieldset > legend", function(e) {
  e.preventDefault();
   $(this).siblings().toggle('slow');
    $(this).toggleClass('menu-open');

});

RoutingFile = React.createFactory(RoutingFile);
var Dom=ReactDom.render(
      RoutingFile({"displayPage":"Container"}),
      document.getElementById('main'));
});
//const Form = JSONSchemaForm.default;

// or
//const {default: Form} = JSONSchemaForm;
