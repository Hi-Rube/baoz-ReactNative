'use strict';

var React = require('react-native');
var Images = require('../../Proxy/Images');
var AppData = require('../../AppData');
var {
  Text,
  View,
  Image,
  TouchableHighlight
  } = React;

var TopicListRowView = React.createClass({
  render: function () {
    var data = this.props.item.data;
    data.message.user.user.icon || (data.message.user.user.icon = {crop: AppData.Clubs.DEFAULT_ICON_URI});
    return (
      <TouchableHighlight
        underlayColor={'#ccc'}>
        <View style={styles.container}>
          <Image
            style={styles.userHead}
            source={{uri: Images.getImageURL(data.message.user.user.icon.crop + '.fc')}}        //.fc为face型头像是圆形
          />
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={styles.userName}>
         {data.message.user.user.name}
            </Text>
            <Text style={styles.contentTitle}>
         {data.message.title}
            </Text>
            <Text style={styles.contentContent}>
         {data.message.content}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = React.StyleSheet.create({
  container: {
    padding: 6,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row'
  },
  userHead: {
    width: 40,
    height: 40
  },
  userName: {
    fontSize: 10,
    color: '#2a2',
    fontWeight: 'bold'
  },
  contentTitle: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold'
  },
  contentContent: {
    fontSize: 10,
    color: '#444'
  }
});

module.exports = TopicListRowView;