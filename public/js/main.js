require.config({
  baseUrl: "js/",
shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "tooltip":{ "deps" :['nx','bootstrap','properties']} ,
        "MainView" : { "deps" :['nx'] },
        "TopologyView" : { "deps" :['nx','tooltip'] },
        "TopologyModel" : { "deps" :['nx'] },
        "MainView" : { "deps" :['nx'] },
        "ActionPanel":{ "deps" :['nx'] },
        "configurationEvents":{ "deps" :['jquery.spin','properties'] },
        "OrbitControls":{"deps":["three"]}
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
    "sockjs":"websocket/sockjs",
    "stomp":"websocket/stomp",
    'config':'properties/config'

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
