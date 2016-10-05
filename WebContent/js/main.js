require.config({
  baseUrl: "js/",
shim : {
        "bootstrap" : { "deps" :['jquery'] },
        "tooltip":{ "deps" :['nx','bootstrap']} ,
        "MainView" : { "deps" :['nx'] },
        "TopologyView" : { "deps" :['nx','tooltip'] },
        "TopologyModel" : { "deps" :['nx'] },
        "MainView" : { "deps" :['nx'] },
        "ActionPanel":{ "deps" :['nx'] },
        "configurationEvents":{ "deps" :['jquery.spin'] }
    },
  paths: {
    "react": "react.min",
    "react-dom": "react-dom.min",
    "JSXTransformer": "JSXTransformer",
    "jquery": "jquery",
    "reactDnd": "react-dnd",
    "reactdndhtml5backend":"react-dnd-html5-backend.min",
    "bootstrap":"bootstrap.min",
    "nx":"next"
  },

  jsx: {
    fileExtension: '.jsx',
    harmony: true,
    stripTypes: true
  }
});

require(['react','react-dom', 'jsx!components/Container'], function(React,ReactDom, Container) {

Container = React.createFactory(Container);
ReactDom.render(
      Container(),
      document.getElementById('main'));
 
});
