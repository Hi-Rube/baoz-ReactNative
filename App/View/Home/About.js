'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image
  } = React;

var AboutView = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <Image
          style={styles.titleImage}
          source={{uri:'http://3.as.baoz.cn/f/b3641b7059e0ceb9697bffda1fbf13cb.c0x0x298x180.t160x160.jpg'}}>
        </Image>
        <Text style={styles.titleText}>
          baoz社区React版客户端
        </Text>
      </View>
    );
  }
});


var styles = React.StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  titleText: {
    color: '#009688',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 50
  },
  titleImage: {
    width:100,
    height:100
  }
});

module.exports = AboutView;