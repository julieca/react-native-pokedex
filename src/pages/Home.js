import React, { Component } from 'react';
import { ScrollView, FlatList, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import { Card, } from 'react-native-elements';

import {
  getData,
  getDataByType,
  getTypes
} from "../actions";

import * as url from '../enums/url';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: ""
    }
  }
  componentDidMount() {
    this.props.getTypes();
    this.props.getData();
  }

  static navigationOptions = {
    title: "PokeDex"
  };

  onButtonFilter = () => {
    // this.props.getDataByType(this.state.filter);
  }

  render() {
    const { navigate } = this.props.navigation

    // const renderMenuItem = ({ item, index }) => {
    //   return (
    //     <View key={index} style={{ margin: 10 }}>
    //       <Image
    //         // style={styles.image}
    //         resizeMode="cover"
    //         source={{ uri: item.imgUrl }}
    //       // onPress={() => navigate('PokemonDetail', { pokemonId: item.id })}
    //       />
    //       <Text style={{ fontSize: 14 }}>{item.name}</Text>
    //     </View>
    //   );
    // }

    const renderFilterItem = ({ item, index }) => {
      return (
        <Picker.Item key={index} label={item} value={item}
          onPress={() => { this.onButtonFilter }}
        />

      )
    }

    return (
      <ScrollView>
        {/* types dropdown */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Picker
            // style={styles.formItem}
            dropdown
            selectedValue={this.state.filter}
            onValueChange={(itemValue, itemIndex) => { this.setState({ filter: itemValue }); getDataByType(this.filter) }}>
            <Picker.Item label="-" value="" />
            <FlatList
              data={this.props.types}
              renderItem={renderFilterItem} />
          </Picker>
        </View>

        {/* list pokemon */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          {this.props.data.map((data, i) =>
            <Card key={i}
              title={data.name}
              image={{ uri: url.getImage(data.url.split("pokemon")[1].replace(/\//g, "")) }}
              onPress={() => navigate('PokemonDetail', { pokemonId: item.id })} >
            </Card>
          )}
        </View>
      </ScrollView>
    );

  }
}

const mapStateToProps = ({ types, list }) => {
  return {
    types,
    data: list
  }
};
const mapDispatchToProps = dispatch => ({
  getTypes: () => dispatch(getTypes()),
  getData: () => dispatch(getData()),
  getDataByType: (name) => dispatch(getDataByType(name))

});
export default connect(mapStateToProps, mapDispatchToProps)(Home);