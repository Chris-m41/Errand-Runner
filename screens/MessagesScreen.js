import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ScrollView,TouchableWithoutFeedback } from 'react-native'
import * as firebase from 'firebase'

export default class MessagesScreen extends Component {
    constructor(props) {
        global.key ='key_value_here'
          super(props);
          const userId = firebase.auth().currentUser.uid;
          this.tasksRef = firebase.database().ref("/Messages/" + userId);
          
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
                  price: child.child('price').val(),
                  State: child.child('State').val(),
                  address: child.child('address').val(),
                  city: child.child('city').val(),
                  email: child.child('email').val(),
                  name: child.child('name').val(),
                  phoneNumber: child.child('phoneNumber').val(),
                  zipCode: child.child('zipCode').val(),
                });
                global.key = child.key;
                console.log("global key with listen for tasks"+global.key)
              });
        
              this.setState({
                dataSource: tasks
              });
            });
      }

      render() {
        return (
            <View style={styles.container}>
          
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Jobs')}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
               
                <Text>Messages Screen:</Text>     
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
                        {/* <TouchableOpacity style={{flexDirection: 'row'}} data-id={item.key} onPress={this.sendInfo.bind(this, item.key)}> */}
                        <Text> {item.title} ${item.price}/hr</Text>
                        <Text>{item.address} {item.city} {item.State}, {item.zipCode} </Text>
                        <Text>{item.name} {item.phoneNumber} {item.email}</Text>
                        {/* </TouchableOpacity> */}
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
    }
})
