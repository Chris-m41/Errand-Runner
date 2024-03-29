import React from 'react';
import { Text, StyleSheet, View, TextInput, Picker, TouchableOpacity, Alert } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class AddJob extends React.Component {

    state = {
        zipCode: "",
        address: "",
        phoneNumber: "",
        State: "",
        city: "",
        title: "",
        description: "",
        price: "",
        category: "",
        user: "",
        name: "",
        email: ""
    }

    updateUser = (user) => {
        this.setState({user: user})
        
    }

    componentDidMount = () => {
        var userId = firebase.auth().currentUser.uid;
        const {email,displayName} = firebase.auth().currentUser;
        this.setState({name: displayName, email: email})
        firebase.database().ref('Users/' + userId).once('value').then(snapshot => {
            
            var zipCode = snapshot.child('zipCode').val();
            var address = snapshot.child('address').val();
            var phoneNumber = snapshot.child('phoneNumber').val();
            var State = snapshot.child('State').val();
            var city = snapshot.child('city').val();
            this.setState({zipCode: zipCode, address: address, phoneNumber: phoneNumber,State: State,city: city})
            
        })
    }

    createJobPost(){
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
            category: this.state.user, // new input
            title: this.state.title,
            name: this.state.name,
            email: this.state.email
            }
            console.log("this.state.user: after updates : " + this.state.user)
            // if(category == null || this.state.description == null || this.state.price == null || this.state.title == null){
            //     Alert.alert('Missing information')
            //     console.log("Missing information")
            //     return
            // } 
            
        return firebase.database().ref().update(updates)
    }

    addJobPost = () => {
        
        
        if(this.state.description == "" || this.state.price == "" || this.state.title == "" || this.state.user == ""){
            Alert.alert("Information not saved.\nMissing information")
            return;
        } else {
            this.createJobPost();
            Alert.alert('Information saved')
        this.props.navigation.navigate('Profile')
        }
    }
   

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                    <Ionicons style={{marginLeft: 50,marginTop: 50}} name='md-arrow-round-back' size={35}/>
                </TouchableOpacity>
                <View style={styles.form}>
                    <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold'}}>Add Job</Text>
                <View>
                    <Text style={styles.inputTitle}>Title</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize= 'words'
                        onChangeText={title => this.setState({title})}
                        maxLength={12}
                        value={this.state.title}
                    ></TextInput>
                </View>
                
                <View>
                    <Text style={styles.inputTitle}>Description</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='sentences'
                        onChangeText={description => this.setState({description})}
                        maxLength={100}
                        value={this.state.description}
                    ></TextInput>
                </View>

                <View>
                <Text style={styles.inputTitle}>Price</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={price => this.setState({price})}
                        maxLength={2}
                        value={this.state.price}
                    ></TextInput>
                </View>

            <View>
            <Text style={styles.inputTitle}>Category</Text>
            <Text style = {styles.input}>{this.state.user}</Text>
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
            
            </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.addJobPost}>
                    <Text style={{color: '#FFF', fontWeight: '500', fontSize: 22}}>Post Job</Text>
                </TouchableOpacity>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: '#fcfcfc'
    },
    text: {
        fontSize: 20,
        alignSelf: 'center'
     },
     button: {
        marginHorizontal: 30,
        backgroundColor: '#2971FF',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: 50
    }
})
