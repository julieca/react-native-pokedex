import React, { Component } from 'react';
import { ScrollView, View, Picker, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';

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

  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView>
        {/* types dropdown */}
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Picker
            style={{ height: 50, width: "100%" }}
            // mode="dropdown"
            selectedValue={this.state.filter}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ filter: itemValue });
              if (itemValue == "") {
                this.props.getData();
              } else {
                this.props.getDataByType(itemValue);
              }

            }}
          >
            <Picker.Item label="-" value="" />
            {
              this.props.types.map(k =>
                <Picker.Item key={k} label={k} value={k} />
              )
            }
          </Picker>
        </View>

        {/* list pokemon */}
        <View style={{
          // flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center"

        }}>
          {this.props.data.map((data, i) =>
            <TouchableHighlight key={i}
              onPress={() => navigate('PokemonDetail', { pokemonId: data.url.split("pokemon")[1].replace(/\//g, "") })}
              style={{ width: "100%" }}
            >
              <View>
                <Card
                  button={true}
                  containerStyle={{ width: "90%" }}
                  imageWrapperStyle={{ height: 300 }}
                  imageStyle={{ height: 300 }}
                  title={data.name}
                  image={{ uri: url.getImage(data.url.split("pokemon")[1].replace(/\//g, "")) }}
                // onPress={() => navigate('PokemonDetail', { pokemonId: id })}
                >
                </Card>
              </View>

            </TouchableHighlight>
          )}
        </View>
      </ScrollView>
    );

  }
}

const mapStateToProps = ({ types = [], list }) => {
  return {
    types,
    data: list.results
  }
};
const mapDispatchToProps = dispatch => ({
  getTypes: () => dispatch(getTypes()),
  getData: () => dispatch(getData()),
  getDataByType: (name) => dispatch(getDataByType(name))

});
export default connect(mapStateToProps, mapDispatchToProps)(Home);