'use strict';

var React = require('react-native');
var AppData = require('../../AppData');
var Groups = require('../../Proxy/Groups');
var GroupListView = require('../Groups/GroupList');

var {
  Text,
  View,
  ListView
  } = React;

var CACHE = [];

var GroupsView = React.createClass({
  getInitialState: function () {
    return {
      selectGroup: '院校',
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  },
  _renderGroupTitle: function () {
    var cxt = this;
    return (
      <View style={styles.itemTitle}>
      {AppData.Groups.groups.map(item => {
        return (
          <Text
            onPress = {() => {
              cxt.setState({selectGroup: item});
              this._fetchData(item);
            }}
            style={[styles.itemTitleText, function () {
              if (item == cxt.state.selectGroup) {
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
    return (
      <View style={styles.container}>
        {this._renderGroupTitle()}
        <GroupListView
          data={this.state.dataSource}
          groupName={this.state.selectGroup}
          style={styles.groupList} />
      </View>
    );
  },
  componentDidMount: function () {
    this._fetchData(this.state.selectGroup);
  },
  _fetchData: function (groupName) {
    var cxt = this;
    if (CACHE.length != 0) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(CACHE)
      });
    }
    Groups.getGroupClubs(groupName, function (data) {
      CACHE = [];
      for (var i in data) {
        CACHE.push(data[i]);
      }
      //console.log(data[0]);
      cxt.setState({dataSource: cxt.state.dataSource.cloneWithRows(CACHE)});
    }, function (err) {
      console.log(err);
    });
  }
});

var styles = React.StyleSheet.create({
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