import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';



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
                <Text>Jobs Screen</Text>
                <View>
                    {/* Left hand screen */}
                    <TouchableOpacity onPress={this.displayCar}>
                        <Text>Car</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.displayDryCleaning}>
                        <Text>Dry Cleaning</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.displayHouseCare}>
                        <Text>House Care</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.displayPetCare}>
                        <Text>Pet Care</Text>
                    </TouchableOpacity>

                    {/* Right hand screen */}
                    <TouchableOpacity onPress={this.displayCatering}>
                        <Text>Catering</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.displayGrocery}>
                        <Text>Grocery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.displayLawn}>
                        <Text>Lawn</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.displayUtilities}>
                        <Text>Utilities</Text>
                    </TouchableOpacity>
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