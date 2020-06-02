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
                <View >
                    <Text style={styles.info}>Name: <Text style={{fontWeight:'400'}}>{this.state.displayName}</Text></Text>
                    <Text style={styles.info}>Email: <Text style={{fontWeight:'400'}}>{this.state.email}</Text></Text>
                    <Text style={styles.info}>Address: <Text style={{fontWeight:'400'}}>{this.state.address} {this.state.city} {this.state.State}, {this.state.zipCode}</Text></Text>
                    <Text style={styles.info}>Phone Number: <Text style={{fontWeight: '400'}}>{this.state.phoneNumber}</Text></Text>
                </View>
                {/* Logout/ change info/ add job */}

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Add')}>
                    <Text style={styles.text}>Add Job</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Info')}>
                    <Text style={styles.text}>Add/Change Information</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Messages')}>
                    <Text style={styles.text}>View Messages</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.signOutUser}>
                    <Text style={styles.text}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fcfcfc'
    },
    button: {
        marginTop: 10,
        backgroundColor: '#2971FF',
        borderWidth: 1,
        borderRadius: 4,
        height: 75,
        textAlign: 'center',
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: 10,
    },
    text: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '600',
        fontSize: 18
    },
    info: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})