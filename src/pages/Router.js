import React, { Component } from 'react';
import Home from './Home';
// import PokemonDetail from './PokemonDetail';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import { connect } from 'react-redux';
// import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

// const mapStateToProps = state => {
//   return {
//     dishes: state.dishes,
//     comments: state.comments,
//     promotions: state.promotions,
//     leaders: state.leaders
//   }
// }
// const mapDispatchToProps = dispatch => ({
//   fetchDishes: () => dispatch(fetchDishes()),
//   fetchComments: () => dispatch(fetchComments()),
//   fetchPromos: () => dispatch(fetchPromos()),
//   fetchLeaders: () => dispatch(fetchLeaders()),
// })


const MenuNavigator = createStackNavigator({
  Home: { screen: Home },
  // PokemonDetail: { screen: PokemonDetail }
}, {
  initialRouteName: "Home",
  // navigationOptions: {
  //   headerStyle: {
  //     backgroundColor: "#512DA8"
  //   },
  //   headerTintColor: '#fff',
  //   headerTintStyle: { color: '#fff' }
  // }
});


class Route extends Component {
  render() {
    return (
      <View style={{ flex: 1, paddingTop: 0 }}>
        {/* <Text>JUST SLEEPING</Text> */}
        {/* <NavigationContainer>
          <Stack.Navigator>

            <MenuNavigator />
          </Stack.Navigator>
        </NavigationContainer> */}
        <Home />
      </View>
    );
  }
}



// export default connect(mapStateToProps,mapDispatchToProps)(Main);
export default connect(null, null)(Route);