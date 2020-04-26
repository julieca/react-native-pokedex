import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, List, ListItem } from 'react-native-elements';
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
  console.log("pokemon", pokemon)
  console.log(loop)
  return (
    <Card
      featuredTitle={pokemon.name}
      // title={pokemon.name}
      // image={{uri:pokemon.image}}
      image={{ uri: url.getImage(pokemon.id) }}

    >

      <View style={{
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        {//looping information
          Object.keys(loop).map(k =>
            <View key={k}>
              <Text style={{ margin: 10, textAlign: "center" }}>
                {loop[k]}
                <br />
                {pokemon[k] && pokemon[k].join(", ")}
              </Text>
            </View>
          )

        }

      </View>

    </Card>
  );

}


class PokemonDetail extends Component {


  componentDidMount() {
    this.props.getDetail(this.props.route.params.pokemonId);
  }

  static navigationOptions = {
    title: "pokemon detail"
    // this.props.data.name
  };

  render() {
    console.log("------------")
    console.log(this.props)
    console.log("------------")
    console.log(this.props.route.params.pokemonId)


    // const pokemonId = JSON.stringify(this.props.navigation.getParam('pokemonId', ''));
    // console.log(pokemonId)
    if (this.props.data == null) {
      return (
        <ScrollView>

        </ScrollView>
      )
    }
    return (
      <ScrollView>
        <RenderPokemon pokemon={this.props.data} />
      </ScrollView>
    );
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