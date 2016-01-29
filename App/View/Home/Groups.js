'use strict';

var React = require('react-native');
var AppData = require('../../AppData');
var Groups = require('../../Proxy/Groups');
var GroupListView = require('../Groups/GroupList');
var ClubsView = require('../Clubs/Clubs');

var {
  Text,
  View,
  ListView,
  ActivityIndicatorIOS
  } = React;


var GroupsView = React.createClass({
  getInitialState: function () {
    return {
      loaded: false,
      selectGroup: '校园',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  },
  _renderGroupTitle: function () {
    var that = this;
    return (
      <View style={styles.itemTitle}>
      {AppData.Groups.groups.map(item => {
        return (
          <Text
            onPress = {() => {
              this.setState({loaded: false});
              this._fetchData(item);
            }}
            key={item}
            style={[styles.itemTitleText, function () {
              if (item == that.state.selectGroup) {
                return {color: '#0d5302'}
              }
            }()]}>
            {item}
          </Text>
        )
      })}
      </View>
    )
  },
  render: function () {
    if (this.state.loaded) {
      return (
        <View style={styles.container}>
        {this._renderGroupTitle()}
          <GroupListView
            selectClub={this.selectClub}
            data={this.state.dataSource}
            groupName={this.state.selectGroup}
            style={styles.groupList} />
        </View>
      );
    } else {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicatorIOS color="#356DD0" style={{marginVertical: 30, marginBottom: 30}} />
        </View>
      );
    }
  },
  componentDidMount: function () {
    this._fetchData(this.state.selectGroup);
  },
  _fetchData: function (groupName) {
    var that = this;
    Groups.getGroupClubs(groupName, function (data) {
      //console.log(data[0]);
      that.setState({
        dataSource: that.state.dataSource.cloneWithRows(data),
        selectGroup: groupName,
        loaded: true
      });
    }, function (err) {
      console.log(err);
    });
  },
  selectClub: function (clubName) {
    this.props.navigator.push({
      title: clubName,
      component: ClubsView,
      passProps: {clubName: clubName, navigator: this.props.navigator}
    });
  }
});

var styles = React.StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  itemTitle: {
    marginTop: 70,
    flexDirection: 'row'
  },
  itemTitleText: {
    flex: 1,
    color: '#2a2',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  groupList: {
    marginTop: 10
  }
});

module.exports = GroupsView;