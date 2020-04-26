import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Icon, Input, Button, List, ListItem } from 'react-native-elements';
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

  if (pokemon) {
    return (
      <Card featuredTitle={pokemon.name}
        // image={{uri:pokemon.image}}
        image={{ uri: url.getImage(pokemon.id) }}

      >
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          {//looping information
            Object.keys(loop).map((k, i) => {
              <View key={i}>
                <Text style={{ margin: 10 }}>
                  {loop[k]} :
                </Text>
                <List containerStyle={{ marginBottom: 20 }}>
                  {
                    pokemon[k].map((l) => (
                      <ListItem
                        key={l}
                        title={'\u2022' + l}
                      />
                    ))
                  }
                </List>
              </View>
            })

          }

        </View>

      </Card>
    );
  }
}

const pokemonId = this.props.navigation.getParam('pokemonId', '')

class PokemonDetail extends Component {

  componentDidMount() {
    this.props.getDetail(pokemonId);
  }

  static navigationOptions = {
    title: this.props.data.name
  };
  render() {
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