import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import * as url from '../enums/url';

import {
  getDetail
} from "../actions";

const loop = {
  "types": "Types",
  "abilities": "Abilities",
  "moves": "Moves"
};


function RenderPokemon(props) {
  const pokemon = props.pokemon;
  return (
    <View >
      <Card
        containerStyle={{ width: "90%" }}
        imageWrapperStyle={{ height: 300 }}
        imageStyle={{ height: 300 }}
        titleStyle={{ textTransform: "capitalize", fontSize: 20 }}
        title={pokemon.name}
        image={{ uri: url.getImage(pokemon.id) }}
      >
      </Card>
      <View style={{
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        {//looping information
          Object.keys(loop).map(k =>
            <View key={k}>
              <Text style={{ margin: 10, textAlign: "center", color: "black" }}>
                {loop[k]}
              </Text>
              <Text style={{ margin: 10, textAlign: "center" }}>
                {pokemon[k] && pokemon[k].join(", ")}
              </Text>
            </View>
          )

        }

      </View>
    </View>

  );

}


class PokemonDetail extends Component {


  componentDidMount() {
    this.props.getDetail(this.props.route.params.pokemonId);
  }

  static navigationOptions = {
    title: "pokemon detail"
  };

  render() {
    if (this.props.data.id) {
      return (
        <ScrollView>
          <RenderPokemon pokemon={this.props.data} />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>

        </ScrollView>
      )
    }

  }

}

const mapStateToProps = ({ detail }) => {
  return {
    data: detail
  }
}

const mapDispatchToProps = dispatch => ({
  getDetail: (id) => dispatch(getDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);