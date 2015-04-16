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

var GroupListRow = React.createClass({
  render: function () {
    var data = this.props.item.data;
    var cxt = this;
    data.group.icon || (data.group.icon = {source: AppData.Clubs.DEFAULT_ICON_URI});
    data.group.intro || (data.group.intro = '');
    return (
      <TouchableHighlight
        underlayColor={'#ccc'}
        onPress={function () {
          cxt.props.selectClub(data.group.name);
        }}>
        <View
          style={styles.rowView}>
          <Image
            style={styles.rowImage}
            source={{uri: Images.getImageURL(data.group.icon.source)}}/>
          <View style={styles.rowText}>
            <Text style={styles.rowTextGroupName}>{data.group.name}</Text>
            <Text style={styles.rowTextGroupInfo}>{data.group.intro.substr(0, 20) + '...'}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = React.StyleSheet.create({
  rowImage: {
    width: 50,
    height: 50
  },
  rowView: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2'
  },
  rowText: {
    flex: 1,
    marginLeft: 10,
    alignSelf: 'center'
  },
  rowTextGroupName: {
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: 10
  },
  rowTextGroupInfo: {
    color: '#666'
  }
});

module.exports = GroupListRow;