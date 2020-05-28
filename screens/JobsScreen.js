import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {AntDesign, FontAwesome5, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'; 



export default class JobsScreen extends React.Component {
    state = {
        sampleString: "hello"
    }
     
    constructor() {
        super();
        //Setting up global variable
        global.MyVar = 'https://aboutreact.com';
      }
      
      displayCar = () => {
          global.MyVar = "Car"
          this.props.navigation.navigate('Display')
      }
      displayDryCleaning = () => {
        global.MyVar = "Dry Cleaning"
        this.props.navigation.navigate('Display')
    }
    displayPetCare = () => {
        global.MyVar = "Pet Care"
        this.props.navigation.navigate('Display')
    }
    displayHouseCare = () => {
        global.MyVar = "House Care"
        this.props.navigation.navigate('Display')
    }

    displayCatering = () => {
        global.MyVar = "Catering"
        this.props.navigation.navigate('Display')
    }
    displayGrocery = () => {
      global.MyVar = "Grocery"
      this.props.navigation.navigate('Display')
  }
  displayLawn = () => {
      global.MyVar = "Lawn"
      this.props.navigation.navigate('Display')
  }
  displayUtilities = () => {
      global.MyVar = "Utilities"
      this.props.navigation.navigate('Display')
  }
// set the touchable opacity to a key like in the "name" github where you give each item a name(dictionary)
// then check it in display jobs to ensure the dictionary value matches and procede to save that to the 
// display job page to pull to correct information from the database
        
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontWeight: '500', fontSize: 20}}>Jobs Screen</Text>
                <ScrollView style={styles.scroll}>
                    {/* Left hand screen */}
                    {/* <View style={styles.left}> */}
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.icon} onPress={this.displayCar}>
                        <AntDesign name='car' size={24} color='#FFF'/>
                            <Text style={styles.text}> Car</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.icon} onPress={this.displayDryCleaning}>
                        <MaterialCommunityIcons name='washing-machine' size={24} color='#FFF' /> 
                            <Text style={styles.text}> Dry Cleaning</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.icon} onPress={this.displayHouseCare}>
                            <FontAwesome5 name='house-damage' size={24} color='#FFF'/>
                            <Text style={styles.text}> House Care</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.icon} onPress={this.displayPetCare}>
                            <MaterialIcons name='pets' size={24} color='#FFF'/>
                            <Text style={styles.text}> Pet Care</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                    {/* Right hand screen */}
                    {/* <View style={styles.right}> */}
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.icon} onPress={this.displayCatering}>
                            <MaterialCommunityIcons name='food-variant' size={24} color='#FFF'/>
                            <Text style={styles.text}> Catering</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.icon} onPress={this.displayGrocery}>
                            <MaterialIcons name='local-grocery-store' size={24} color='#FFF'/>
                            <Text style={styles.text}> Grocery</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.icon} onPress={this.displayLawn}>
                            <FontAwesome5 name='leaf' size={24} color='#FFF'/>
                            <Text style={styles.text}> Lawn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.icon} onPress={this.displayUtilities}>
                            <FontAwesome5 name='lightbulb' size={24} color='#FFF'/>
                            <Text style={styles.text}> Utilities</Text>
                        </TouchableOpacity>
                    </View>
                    {/* </View> */}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCFCFC',
        marginTop: 50
    },
    left: {
        alignSelf: 'flex-start'       
    },
    right: {
        alignSelf: 'flex-end',
        flex: 1
    },
    button: {
        // borderBottomColor: '#2971FF',
        borderWidth: 1,
        borderRadius: 4,
        // width: 125,
        height: 75,
        textAlign: 'center',
        // flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        // alignContent: 'stretch',
        backgroundColor: '#2971FF',
    },
    scroll: {
        width: 350,    
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 100,
        flex: 1,
        textAlign: 'center',
        fontWeight: '600'
    },
    icon: {
        flexDirection: 'row',
        paddingLeft: 80
    }
})