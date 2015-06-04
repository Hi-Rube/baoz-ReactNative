'use strict';

var React = require('react-native');
var Comments = require('../../Proxy/Comments');
var CommentListRowView = require('./CommentListRow')

var {
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
  } = React;

var CommentListView = React.createClass({
  getInitialState: function () {
    return {
      loaded: false,
      commentList: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  },
  _renderCommentListRow: function (data) {
    return (
      <CommentListRowView
        item={data}
      />
    );
  },
  _renderFooter: function () {
    if (this.state.commentList.rowIdentities[0].length > 50) {
      return (
        <View style={Style.listFooter}>
          <TouchableHighlight
            style={Style.buttonContainer}
            underlayColor={'#fff'}
          >
            <Text style={Style.listFooterText}>刷新</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={Style.buttonContainer}
            underlayColor={'#fff'}
          >
            <Text style={Style.listFooterText}>下一页</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return null;
    }
  },
  render: function () {
    if (!this.state.loaded) {
      return (
        <View style={Style.loadingContainer}>
          <ActivityIndicatorIOS color="#356DD0" style={{marginVertical: 30, marginBottom: 30}} />
        </View>
      );
    } else {
      return (
        <View style={Style.commentListView}>
          <ListView
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            dataSource={this.state.commentList}
            renderFooter={this._renderFooter}
            renderRow={this._renderCommentListRow}
          />
        </View>
      );
    }
  },
  componentDidMount: function () {
    var that = this;
    Comments.getCommentsList(this.props.topicId, 0, function (data) {
      //add floor's id
      Array.prototype.forEach.call(data, (item, index)=> {
        item['floorId'] = index + 1;
      });
      that.setState({loaded: true, commentList: that.state.commentList.cloneWithRows(data)});
    }, function (error) {
      console.log(error.message);
    })
  },
  next: function () {

  },
  refresh: function () {

  }
});

var Style = React.StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#eeeeee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  commentListView: {
    marginTop: 65,
    flex: 1,
    marginBottom: 50
  },
  listFooter: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row'
  },
  listFooterText: {
    fontWeight: 'bold',
    color: '#777'
  },
  buttonContainer: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

module.exports = CommentListView;