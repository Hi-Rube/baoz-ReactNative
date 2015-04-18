'use strict';

var React = require('react-native');
var Images = require('../../Proxy/Images');
var AppData = require('../../AppData');
var {
  Text,
  View,
  Image
  } = React;

var TopicListRowView = React.createClass({
  _renderTag: function (tags) {
    if (tags)
      return tags.map((tag)=> {
        return (
          <Text style={styles[tag + 'Icon']}>
           {tag}
          </Text>
        );
      });
  },
  render: function () {
    var data = this.props.item.data;
    //baoz.cn's bug兼容
    data.message.user || (data.message.user = {user: {name: 'admin', icon: {crop: AppData.Clubs.DEFAULT_ICON_URI}}});
    data.message.user.user.icon || (data.message.user.user.icon = {crop: AppData.Clubs.DEFAULT_ICON_URI});
    return (
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
        <View>
          <View style={styles.contentReplyNum}>
            <Text style={styles.contentReplyNumText}>
            {data.comments.comment >= 100000 ? 'N +' : data.comments.comment}
            </Text>
          </View>
            {this._renderTag(this.props.item._tags)}
        </View>
      </View>
    );
  }
});

var styles = React.StyleSheet.create({
  container: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 10,
    paddingBottom: 10,
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
  },
  contentReplyNum: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    width: 30,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentReplyNumText: {
    fontSize: 10,
    color: '#2a2'
  },
  coolIcon: {
    color: '#fc0',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center'
  },
  topIcon: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'center'
  }
});

module.exports = TopicListRowView;