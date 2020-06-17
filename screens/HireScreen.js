import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as firebase from "firebase";

export default class HireScreen extends Component {
    state = {
        email: "",
        displayName: "",
        zipCode: "",
        address: "",
        phoneNumber: "",
        State: "",
        city: ""
    };

    componentDidMount() {
        const {email,displayName} = firebase.auth().currentUser;
        this.setState({email,displayName});


        var user = firebase.auth().currentUser;
        firebase.database().ref('Users/' + user.uid).once('value').then(snapshot => {
            console.log('User data: ', snapshot.val())
            console.log('Zip code(Single Object) ', snapshot.child('zipCode').val())
            var zipCode = snapshot.child('zipCode').val();
            var address = snapshot.child('address').val();
            var phoneNumber = snapshot.child('phoneNumber').val();
            var State = snapshot.child('State').val();
            var city = snapshot.child('city').val();
            this.setState({zipCode,address,phoneNumber,State,city})
        })

    };

    sendInformation =() => {
        var newPostKey = firebase.database().ref().child('Messages/' + global.uid).push().key;
        var updates = {};
        updates["/Messages/" + global.uid + "/" + newPostKey] = {
            State: this.state.State,
            address: this.state.address,
            city: this.state.city,
            phoneNumber: this.state.phoneNumber,
            zipCode: this.state.zipCode,
            name: this.state.displayName,
            email: this.state.email,
            title: global.title,
            price: global.price
        }
        // this.props.navigation.navigate('Jobs')
        // console.log("name " + displayName)
        return firebase.database().ref().update(updates)
        
    }

    sendMessage= () =>{
        this.sendInformation();
        Alert.alert('Information successfully sent')
        this.props.navigation.navigate('Jobs')
    }

    render() {
        return (
            <View style={styles.container}>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('JobInfo')}>
                <Ionicons style={{marginLeft: 50, marginTop: 50}} name='md-arrow-round-back' size={35}/>
                </TouchableOpacity>
                <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 75}}> Hire Screen </Text>
                <View style={styles.form}>
                <Text style={styles.title}>Message</Text>
        <Text style={{fontSize: 20}}>Hi {global.name}, I would like to hire you for the {global.title} job at ${global.price}/hour.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.sendMessage}>
            <Text style={{color: '#FFF', fontWeight: '500', fontSize: 22}}>Send Request</Text>
        </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        // justifyContent: 'center',
        backgroundColor: '#fcfcfc'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#2971ff',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase'
    }
})
