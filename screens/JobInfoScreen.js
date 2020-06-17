import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
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
        console.log("key: (jobs info); " + global.MyVar)
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Display')}>
                <Ionicons style={{marginLeft: 50, marginTop: 50}} name='md-arrow-round-back' size={35}/>
                <Text style={{textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 50}}>Job Info Screen</Text>
                </TouchableOpacity>
                <View style={styles.displayInfo}>
            
                {/* Job Information */}
                <View>
                    <Text style={styles.textBold}>Job: <Text style={styles.textNoBold}>{this.state.title} ${this.state.price}/hr in {this.state.category} jobs</Text></Text>
                    <Text style={styles.textBold}>Description: <Text style={styles.textNoBold}>{this.state.description}</Text></Text>
                </View>
                {/* Freelancer Information */}
                <View style={{alignContent: 'flex-start'}}>
                    <Text style={styles.textBold}>Contact Info: <Text style={styles.textNoBold}>{this.state.name} </Text></Text>
                    <Text style={styles.textBold}>Phone: <Text style={styles.textNoBold}>{this.state.phoneNumber} </Text> </Text>
                    <Text style={styles.textBold}>Email: <Text style={styles.textNoBold}>{this.state.email}</Text></Text> 
                </View>
                
                <View>
                    <Text style={styles.textBold}>Location Info: <Text style={styles.textNoBold}>{this.state.city} {this.state.State}, {this.state.zipCode}</Text></Text>
                    
                </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Hire')}>
                    <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 22}}>Hire {this.state.name}</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fcfcfc'
    },
    textBold: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textNoBold: {
        fontSize: 20,
        fontWeight: 'normal'
    },
    displayInfo: {
        marginLeft: 30,

    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#2971ff',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200
    }
})