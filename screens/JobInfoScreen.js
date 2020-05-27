import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TouchableWithoutFeedback, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';

export default class JobInfoScreen extends React.Component{
    constructor(props) {
        global.name ='name_value_here'
        global.title ='title_value_here'
        global.price ='price_value_here'
        global.uid = 'User_ID_Here'
        super(props);
    }
    state = {
        State: '', //
        category: '',
        city: '', //
        description: '',
        phoneNumber: '', //
        price: '',
        title: '',
        zipCode: '', //
        name: '',
        email: ''
    };

    componentDidMount() {
        const {email,displayName} = firebase.auth().currentUser;
        this.setState({email,displayName});

        const key = 'Jobs/' + global.MyVar + '/' + global.key
        console.log("globalkey: " + global.key)
        var user = firebase.auth().currentUser;
        firebase.database().ref(key).once('value').then(snapshot => {
            console.log('User data: ', snapshot.val())
            console.log('Zip code(Single Object) ', snapshot.child('zipCode').val())
            // Freelancer Information
            var zipCode = snapshot.child('zipCode').val();
            var phoneNumber = snapshot.child('phoneNumber').val();
            var State = snapshot.child('State').val();
            var city = snapshot.child('city').val();
            var name = snapshot.child('name').val();
            var email = snapshot.child('email').val();
            // Job information
            var category= snapshot.child('category').val();
            var description = snapshot.child('description').val();
            var price = snapshot.child('price').val();
            var title = snapshot.child('title').val();
            // Save information for next screen
            global.title = title
            global.uid = snapshot.child('userId').val();
            global.price = price
            global.name = name
            this.setState({zipCode,phoneNumber,State,city, category,description, price, title,name,email})
        })
        
    };
    render() {
        LayoutAnimation.easeInEaseOut();
        
        return (
            <View style={styles.container}>
                <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Display')}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
                </View>
                <Text>Job Info Screen</Text>
                {/* Job Information */}
                <View>
                    <Text>Job: {this.state.title} ${this.state.price}/hr in {this.state.category} jobs</Text>
                    <Text>description: {this.state.description}</Text>
                </View>
                {/* Freelancer Information */}
                <View>
                    <Text>Contact Info:</Text>
                    <Text>{this.state.name} </Text>
                    <Text>Phone: {this.state.phoneNumber} Email: {this.state.email}</Text>
                </View>
                
                <View>
                    <Text>Location Info:</Text>
                    <Text>{this.state.city} {this.state.State}, {this.state.zipCode}</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Hire')}>
                    <Text>Hire {this.state.name}</Text>
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
    }
})