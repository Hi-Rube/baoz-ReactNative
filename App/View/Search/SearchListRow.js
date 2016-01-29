'use strict';

var React = require('react-native');
var Images = require('../../Proxy/Images');
var AppData = require('../../AppData');
var {
  Text,
  View,
  Image
  } = React;

var SearchListRowView = React.createClass({
  render: function () {
    var data = this.props.data;
    if (data.msg) {
      return (
        <View style={styles.msgContainer}>
          <Text style={styles.name}>
          {data.msg}
          </Text>
        </View>
      );
    }
    if (data.title) {
      return (
        <View style={styles.topicContainer}>
          <Text style={styles.name}>
          {'帖子:'}
          </Text>
          <Text style={styles.intro}>
            {data.title}
          </Text>
        </View>
      );
    }
    if (data.clubs) {
      data.icon.source || (data.icon.source = AppData.Clubs.DEFAULT_ICON_URI);
      var t = {width: 60, height: 60};
      return (
        <View style={styles.container}>
          <Image
            style={styles.headImage}
            source={{uri: Images.getImageURL(data.icon.source, {t: t})}} />
          <View style={{flex: 1}}>
            <Text style={styles.name}>
          {'组群: ' + data.name}
            </Text>
            <Text style={styles.intro}>
            {'介绍: ' + data.intro.substr(0, 40) + '...'}
            </Text>
          </View>
        </View>
      );
    }
    if (data.name) {
      data.icon.source || (data.icon.source = AppData.Clubs.DEFAULT_ICON_URI);
      var t = {width: 60, height: 60};
      return (
        <View style={styles.container}>
          <Image
            style={styles.headImage}
            source={{uri: Images.getImageURL(data.icon.source, {t: t})}} />
          <Text style={styles.name}>
          {'用户: ' + data.name}
          </Text>
        </View>
      );
    }
  }
});

var styles = React.StyleSheet.create({
  msgContainer: {
    flex: 1,
    alignItems: 'center',
    height: 50
  },
  topicContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headImage: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  name: {
    color: '#666',
    fontWeight: 'bold'
  },
  intro: {
    color: '#666',
    fontSize: 12
  }
});

module.exports = SearchListRowView;