import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TouchableWithoutFeedback} from 'react-native';
import * as firebase from 'firebase';
import Ionicons from '@expo/vector-icons'
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


    // const getCircularReplacer = () => {
    //   const seen = new WeakSet();
    //   return (key, value) => {
    //     if (typeof value === "object" && value !== null) {
    //       if (seen.has(value)) {
    //         return;
    //       }
    //       seen.add(value);
    //     }
    //     return value;
    //   };
    // };


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
                    <Text>Go Back</Text>
                </TouchableOpacity>
               
                <Text>Display Jobs Screen: {global.MyVar}</Text>     
                <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', marginTop: 50}}>
                <FlatList
              data={this.state.dataSource}
              keyExtractor={this.keyExtractor}
              renderItem={({ item }) => (
                <View>
                  <ScrollView horizontal={true}>
                    {/* <TouchableWithoutFeedback>
                      <View style={{ paddingTop: 10 }}>
                        <Text
                          style={{ color: "#4B0082" }}
                          onPress={() => this.deleteItem(item)}
                        >
                          <Ionicons name="md-trash" size={20} />
                        </Text>
                      </View>
                    </TouchableWithoutFeedback> */}
                    
                      <View >
                        <TouchableOpacity style={{flexDirection: 'row'}} data-id={item.key} onPress={this.sendInfo.bind(this, item.key)}>
                        <Text>{item.title} </Text>
                        <Text>${item.price}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    }
})