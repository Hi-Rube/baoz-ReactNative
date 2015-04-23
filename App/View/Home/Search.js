'use strict';

var React = require('react-native');
var Search = require('../../Proxy/Search');
var {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput
  } = React;

var SearchView = React.createClass({
  getInitialState: function () {
    return {
      selectItem: '用户'
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
                }>
                <View style={[styles.selectButton, function () {
                  console.log(1)
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
          <TextInput style={styles.searchText}/>
          <View style={styles.searchButton}>
            <TouchableOpacity>
              <Text style={{color: '#fff', lineHeight: 16}}>搜索</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
  componentDidMount: function () {
    Search.searchPeople('ss', 1, function (data) {
      //console.log(data);
    }, function (err) {
      console.log(err.message);
    });
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
    flex: 1,
    height: 26,
    flexDirection: 'row'
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
  }
});

module.exports = SearchView;