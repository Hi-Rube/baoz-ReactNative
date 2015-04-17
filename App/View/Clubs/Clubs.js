'use strict';

var React = require('react-native');
var Clubs = require('../../Proxy/Clubs');
var ClubInfoView = require('../Clubs/ClubInfo');
var TopicListView = require('../Topics/TopicList');

var {
  Text,
  View,
  ListView,
  ActivityIndicatorIOS
  } = React;

var ClubView = React.createClass({
  getInitialState: function () {
    return {
      clubInfo: null,
      topicListInfo: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }),
      loaded: 0
    }
  },
  render: function () {
    if (this.state.loaded != 2) {
      return (
        <View style={Style.loadingContainer}>
          <ActivityIndicatorIOS color="#356DD0" style={{marginVertical: 30, marginBottom: 30}} />
        </View>
      );
    } else {
      return (
        <View style={Style.infoView}>
          <ClubInfoView
            data={this.state.clubInfo}/>
          <TopicListView
            data={this.state.topicListInfo}/>
        </View>
      )
    }
  },
  componentDidMount: function () {
    var that = this;
    Clubs.getClubsInfo(this.props.clubName, function (data) {
      that.setState({clubInfo: data, loaded: that.state.loaded + 1});
    }, function (err) {
      console.log(err.message);
    });
    Clubs.getClubsBBS(this.props.clubName, 0, function (data) {
      that.setState({topicListInfo: that.state.topicListInfo.cloneWithRows(data), loaded: that.state.loaded + 1});
    }, function (err) {
      console.log(err.message);
    })
  }
});


var Style = React.StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#eeeeee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoView: {
    top: 70
  }
});

module.exports = ClubView;