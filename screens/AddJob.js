import React from 'react';
import { Text, StyleSheet, View, TextInput, Picker, TouchableOpacity, Alert } from 'react-native';
import * as firebase from 'firebase';
import database from '@react-native-firebase/database';

export default class AddJob extends React.Component {

    // state = {
    //     description: "",
    //     city: "",
    //     State: "",
    //     zipCode: "",
    //     price: "",
    //     userId: "",
    //     phoneNumber: "",
    //     category: "",
    //     user: ""
    // }

    state = {
        zipCode: "",
        address: "",
        phoneNumber: "",
        State: "",
        city: "",
        description: "",
        price: "",
        category: "",
        user: ""
    }

    updateUser = (user) => {
        this.setState({user: user})
        
    }

    componentDidMount = () => {
        var userId = firebase.auth().currentUser.uid;

        firebase.database().ref('Users/' + userId).once('value').then(snapshot => {
            
            var zipCode = snapshot.child('zipCode').val();
            var address = snapshot.child('address').val();
            var phoneNumber = snapshot.child('phoneNumber').val();
            var State = snapshot.child('State').val();
            var city = snapshot.child('city').val();
            this.setState({zipCode: zipCode, address: address, phoneNumber: phoneNumber,State: State,city: city})
            
        })
    }

    createJobPost = () => {
        var userId = firebase.auth().currentUser.uid;
        var category = this.state.user;
        var newPostKey = firebase.database().ref().child('Jobs/' + category).push().key;

        var updates = {};
        updates["/Jobs/" + category + "/" + newPostKey] = {
            description: this.state.description, // new input
            city: this.state.city, // from database
            State: this.state.State, // from database
            zipCode: this.state.zipCode, // from database
            phoneNumber: this.state.phoneNumber, // from database
            price: this.state.price, // new input
            userId: userId, // From database
            category: this.state.user // new input
            }
            if(category == null || this.statedescription == null || this.state.price == null){
                Alert.alert('Missing information')
                return
            }
        return firebase.database().ref().update(updates)
    }

   

    render() {
        return (
            <View style={styles.container}>
                <Text> Add Job Screen </Text>
     
                <View>
                    <Text>description:</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={description => this.setState({description})}
                        value={this.state.description}
                    ></TextInput>
                </View>

                <View>
                <Text>price:</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={price => this.setState({price})}
                        value={this.state.price}
                    ></TextInput>
                </View>

            <View>
            <Picker style={styles.pickerStyle} selectedValue = {this.state.user} onValueChange = {this.updateUser}>
               <Picker.Item label = "Lawn" value = "Lawn" />
               <Picker.Item label = "Grocery" value = "Grocery" />
               <Picker.Item label = "Car" value = "Car" />

               <Picker.Item label = "Utilities" value = "Utilities" />
               <Picker.Item label = "House Care" value = "House Care" />
               <Picker.Item label = "Dry Cleaning" value = "Dry Cleaning" />
               <Picker.Item label = "Catering" value = "Catering" />
               <Picker.Item label = "Pet Care" value = "Pet Care" />
            </Picker>
            <Text style = {styles.text}>{this.state.user}</Text>
            </View>
            

            <TouchableOpacity style={styles.button} onPress={this.createJobPost}>
                    <Text style={{color: '#FFF', fontWeight: '500'}}>Sign up</Text>
                </TouchableOpacity>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    text: {
        fontSize: 20,
        alignSelf: 'center'
     },
     button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
