'use strict';

var React = require('react-native');
var Images = require('../../Proxy/Images');
var AppData = require('../../AppData');

var {
  Text,
  View,
  Image
  }=React;

var ClubInfoView = React.createClass({
  _renderLeader: function (data) {
    var adminsList = data.admins ? [].concat(data.admins) : [];
    adminsList.push(data.user);
    return adminsList.map(admin => {
      admin.user.icon || (admin.user.icon = {source: AppData.Clubs.DEFAULT_ICON_URI});
      return (
        <View style={styles.leader}>
          <Image
            style={styles.userHead}
            source={{uri: Images.getImageURL(admin.user.icon.source)}}/>
          <Text style={styles.userName}>
            {admin.user.name}
          </Text>
        </View>
      );
    });
  },
  render: function () {
    var data = this.props.data;
    data.icon || (data.icon = {source: AppData.Clubs.DEFAULT_ICON_URI});
    return (
      <View>
        <View style={styles.textContainer}>
          <Image
            style={styles.icon}
            source={{uri: Images.getImageURL(this.props.data.icon.source)}}/>
          <Text style={styles.intro}>{this.props.data.intro.replace('\n', '').replace('\r', '')}</Text>
        </View>
        <View style={styles.leaderContainer}>
          <Text style={styles.leaderTitle}>组长:</Text>
          {this._renderLeader(data)}
        </View>
      </View>
    );
  }
});

var styles = React.StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  leaderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10
  },
  leader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  leaderTitle: {
    marginTop: 10,
    fontSize: 10,
    lineHeight: 15,
    marginRight: 10,
    fontWeight: 'bold',
    color: '#666'
  },
  icon: {
    width: 50,
    height: 50
  },
  intro: {
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    fontSize: 9,
    color: '#333'
  },
  userHead: {
    width: 20,
    height: 20
  },
  userName: {
    fontSize: 10,
    color: '#2a2',
    marginLeft: 6,
    fontWeight: 'bold'
  }
});

module.exports = ClubInfoView;