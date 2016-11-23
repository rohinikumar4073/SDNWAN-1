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
        "configurationEvents":{ "deps" :['jquery.spin','properties'] }
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
    "three":"three.min"
  },

  jsx: {
    fileExtension: '.jsx',
    harmony: true,
    stripTypes: true
  }
});

require(['react','react-dom', 'jsx!components/Routing'], function(React,ReactDom,  RoutingFile) {
//'react-jsonschema-form',

RoutingFile = React.createFactory(RoutingFile);
ReactDom.render(
      RoutingFile(),
      document.getElementById('main'));

});
//const Form = JSONSchemaForm.default;

// or
//const {default: Form} = JSONSchemaForm;
