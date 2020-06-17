import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class DisplayJobScreen extends React.Component {
    
    constructor(props) {
      global.key ='key_value_here'
        super(props);
        
        this.tasksRef = firebase.database().ref("/Jobs/" + global.MyVar);
        
        const dataSource = [];
        this.state = {
          dataSource: dataSource,
          selecteditem: null,
          snackbarVisible: false,
          confirmVisible: false
        };
      }

    componentDidMount() {
        this.listenForTasks(this.tasksRef);
    };
    
    listenForTasks(tasksRef) {
        tasksRef.on("value", dataSnapshot => {
            var tasks = [];
            dataSnapshot.forEach(child => {
                console.log("name: " + child.child('title').val()),
                console.log("key: " + child.key)
              tasks.push({
                title: child.child('title').val(),
                key: child.key,
                price: child.child('price').val()
              });
              global.key = child.key;
              console.log("global key with listen for tasks"+global.key)
            });
      
            this.setState({
              dataSource: tasks
            });
          });
    }

    sendInfo = (key) => {
      console.log("1234 key 1234" + key)
      global.key = key
      console.log("1234 key string? 1234" + global.key)
      // global.key = key;
      this.props.navigation.navigate('JobInfo')
    }

    render() {
        return (
            <View style={styles.container}>
          
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Jobs')}>
                <Ionicons style={{marginLeft: 50, marginTop: 50}} name='md-arrow-round-back' size={35}/>
                </TouchableOpacity>
               
                <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Display Jobs Screen: {global.MyVar}</Text>     
                <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginTop: 50}}>
                <FlatList
              data={this.state.dataSource}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) => (
                <View>
                  <ScrollView>
                      <View style={styles.touchJob}>
                        <TouchableOpacity style={{flexDirection: 'row'}} data-id={item.key} onPress={this.sendInfo.bind(this, item.key)}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.title} </Text>
                        <Text style={{color:'#f2f2f2'}}> {item.key} </Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>${item.price}/hr  </Text>
                        </TouchableOpacity>
                      </View>
                
                  </ScrollView>
                </View>
              )}
              ItemSeparatorComponent={this.renderSeparator}
            />
                </View>  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginTop: 100,
        backgroundColor: '#FCFCFC',
    },
    touchJob: {
      // backgroundColor: '#f2f2f2',
      borderBottomColor: '#8A8F9E',
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 50,
      backgroundColor: '#f2f2f2',
      justifyContent: 'center'
    },
})