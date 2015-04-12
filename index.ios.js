/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Groups = require('./App/Proxy/Groups');
var Images = require('./App/Proxy/Images');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = React;

var BaozReact = React.createClass({
  componentDidMount: function(){
    Groups.getGroupClubs('院校', function(data){
      console.log(data[0]);
    });
    console.log(Images.getImageURL('sdd'));
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Baoz React!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('BaozReact', () => BaozReact);
