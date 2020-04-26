import React, { Component } from 'react';
import Home from './Home';
import PokemonDetail from './PokemonDetail';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import { connect } from 'react-redux';

class Route extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 0 }}>
        {/* <Text>JUST SLEEPING</Text> */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
            {/* <MenuNavigator /> */}
          </Stack.Navigator>
        </NavigationContainer>
        {/* <Home /> */}
      </View>
    );
  }
}

export default connect(null, null)(Route);