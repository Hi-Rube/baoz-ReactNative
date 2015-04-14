'use strict';

var React = require('react-native');
var AppData = require('../../AppData');
var Groups = require('../../Proxy/Groups');
var GroupListView = require('../Groups/GroupList');

var {
  Text,
  View
  } = React;

var GroupsView = React.createClass({
  getInitialState: function () {
    return {
      selectGroup: '院校'
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
          groupName={this.state.selectGroup}
          style={styles.groupList} />
      </View>
    );
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
    marginTop:10
  }
});

module.exports = GroupsView;