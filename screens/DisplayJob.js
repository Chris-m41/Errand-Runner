import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TouchableWithoutFeedback} from 'react-native';
import * as firebase from 'firebase';
import Ionicons from '@expo/vector-icons'
export default class DisplayJobScreen extends React.Component {
    
    constructor(props) {
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
                console.log("name: " + child.child('description').val()),
                console.log("key: " + child.key)
              tasks.push({
                name: child.child('description').val(),
                key: child.key,
              });
              
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
                <Text>Display Jobs Screen: {global.MyVar}</Text>     
                <View>
                <FlatList
              data={this.state.dataSource}
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
                    
                      <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('JobInfo')}>
                        <Text>{item.name} </Text>
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
        alignItems: 'center',
        justifyContent: 'center'
    }
})