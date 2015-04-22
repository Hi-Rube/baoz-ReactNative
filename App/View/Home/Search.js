'use strict';

var React = require('react-native');
var Search = require('../../Proxy/Search');
var {
  View,
  Text
  } = React;

var SearchView = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <Text>Building...</Text>
      </View>
    );
  },
  componentDidMount:function(){
    Search.getSearchResult('s', function(data){
      console.log(data);
    }, function(err){
      console.log(err.message);
    });
  }
});


var styles = React.StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  }
});

module.exports = SearchView;