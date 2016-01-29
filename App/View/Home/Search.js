'use strict';

var React = require('react-native');
var Search = require('../../Proxy/Search');
var SearchListView = require('../Search/SearchList');
var {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ListView,
  AlertIOS,
  ActivityIndicatorIOS
  } = React;

var SearchView = React.createClass({
  getInitialState: function () {
    return {
      loaded: true,
      selectItem: '用户',
      searchPage: 1,
      searchContent: '',
      searchResult: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  },
  render: function () {
    var that = this;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Image
            style={styles.logo}
            source={{uri: 'http://baoz.chekun.me/public/assets/logo.png'}}
          />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
        {function () {
          return ['用户', '组群', '帖子'].map((item)=> {
            return (
              <TouchableOpacity onPress={()=> {
                that.setState({selectItem: item});
              }
                }
              key={item}>
                <View style={[styles.selectButton, function () {
                  if (item == that.state.selectItem) {
                    return {backgroundColor: '#dcedc8'}
                  }
                }()]}>
                  <Text style={{color: '#2a2', fontWeight: 'bold', lineHeight: 20}}>{item}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        }()}
          </View>
        </View>
        <View style={styles.searchLine}>
          <TextInput
            onChange={(event) => this.setState({searchContent: event.nativeEvent.text})}
            style={styles.searchText}/>
          <TouchableOpacity onPress={this._search}>
            <View style={styles.searchButton}>
              <Text style={{color: '#fff', lineHeight: 16}}>搜索</Text>
            </View>
          </TouchableOpacity>
        </View>
      {function () {
        if (that.state.loaded) {
          return (
            <SearchListView
              style={{flex: 1}}
              data={that.state.searchResult}
            />
          );
        } else {
          return (
            <View style={styles.loadingContainer}>
              <ActivityIndicatorIOS color="#356DD0" style={{marginVertical: 30, marginBottom: 30}} />
            </View>
          );
        }
      }()}
      </View>
    );
  },
  _search: function () {
    if (this.state.searchContent == '') {
      return AlertIOS.alert(
        '内容不能为空'
      );
    }
    var that = this;
    this.setState({loaded: false});
    var errLog = function (err) {
      console.log(err.message);
    };
    switch (this.state.selectItem) {
      case '用户':
        Search.searchPeople(this.state.searchContent, this.state.searchPage, function (data) {
          if (data.length == 0) {
            data[0] = {msg: '没有相应用户~'};
          }
          that.setState({loaded: true, searchResult: that.state.searchResult.cloneWithRows(data)});
        }, errLog);
        break;
      case '组群':
        Search.searchClub(this.state.searchContent, this.state.searchPage, function (data) {
          if (data.length == 0) {
            data[0] = {msg: '没有相应组群~'};
          }
          that.setState({loaded: true, searchResult: that.state.searchResult.cloneWithRows(data)});
        }, errLog);
        break;
      case '帖子':
        Search.searchTopic(this.state.searchContent, this.state.searchPage, function (data) {
          if (data.length == 0) {
            data[0] = {msg: '没有相应帖子~'};
          }
          that.setState({loaded: true, searchResult: that.state.searchResult.cloneWithRows(data)});
        }, errLog);
        break;
    }
  }
});


var styles = React.StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 10,
    marginTop: 55
  },
  title: {
    flexDirection: 'row',
    height: 30
  },
  logo: {
    width: 40,
    height: 26,
    marginRight: 10
  },
  searchText: {
    height: 26,
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#2a2',
    padding: 4,
    fontSize: 13
  },
  searchLine: {
    height: 26,
    flexDirection: 'row',
    marginBottom: 6
  },
  searchButton: {
    height: 26,
    backgroundColor: '#2a2',
    padding: 3
  },
  selectButton: {
    height: 30,
    flex: 1,
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = SearchView;