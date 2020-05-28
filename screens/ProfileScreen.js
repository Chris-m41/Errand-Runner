import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Button} from 'react-native';
import * as firebase from 'firebase';

export default class ProfileScreen extends React.Component{
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
      


    signOutUser = () => {
        firebase.auth().signOut();
    };

    render(){
        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>

                {/* User Information */}

                <Text>Hi {this.state.displayName}!</Text>
                <Text>Email: {this.state.email}</Text>
                <Text>Address: {this.state.address} {this.state.city} {this.state.State}, {this.state.zipCode}</Text>
                <Text>Phone Number: {this.state.phoneNumber}</Text>

                {/* Logout/ change info/ add job */}

                <TouchableOpacity style={styles.logout} onPress={() => this.props.navigation.navigate('Add')}>
                    <Text>Add Job</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logout} onPress={() => this.props.navigation.navigate('Info')}>
                    <Text>Add/Change Information</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logout} onPress={() => this.props.navigation.navigate('Messages')}>
                    <Text>View Messages</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logout} onPress={this.signOutUser}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logout: {
        marginTop: 32,
        backgroundColor: 'pink'
    }
})