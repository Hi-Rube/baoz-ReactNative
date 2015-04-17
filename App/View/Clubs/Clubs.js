'use strict';

var React = require('react-native');
var Clubs = require('../../Proxy/Clubs');
var ClubInfoView = require('../Clubs/ClubInfo');

var {
  Text,
  View,
  ActivityIndicatorIOS
  } = React;

var ClubView = React.createClass({
  getInitialState: function () {
    return {
      clubInfo: null,
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
        </View>
      )
    }
  },
  componentDidMount: function () {
    var that = this;
    Clubs.getClubsInfo(this.props.clubName, function (data) {
      that.setState({clubInfo: data, loaded: that.state.loaded + 2});
    }, function (err) {
      console.log(err);
    });
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