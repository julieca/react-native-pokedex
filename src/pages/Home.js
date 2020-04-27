import React, { Component } from 'react';
import { ScrollView, View, Picker, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';

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

  onEndofPage = () => {
    //checking next for non filter
    if (this.props.next) {
      this.props.getData(this.props.next);
    }
  }


  static navigationOptions = {
    title: "PokeDex"
  };

  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView
        onScroll={(event) => {
          const scrollY = event.nativeEvent.contentOffset.y;
          const endPage = event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;
          if (scrollY === endPage) {
            this.onEndofPage();
          }
        }}
      >
        {/* types dropdown */}
        <View style={{
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Picker
            style={{ height: 50, width: "100%" }}
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
                <Picker.Item key={k} label={k} value={k} style={{ textTransform: "capitalize" }} />
              )
            }
          </Picker>
        </View>

        {/* list pokemon */}
        <View style={{
          justifyContent: "space-between",
          alignItems: "center"

        }}>
          {
            this.props.data.map((data, i) =>
              <TouchableHighlight key={i}
                onPress={() => navigate('Pokemon', { pokemonId: data.url.split("pokemon")[1].replace(/\//g, "") })}
                style={{ width: "100%" }}
              >
                <View>
                  <Card
                    containerStyle={{ width: "90%" }}
                    imageWrapperStyle={{ height: 300 }}
                    imageStyle={{ height: 300 }}
                    titleStyle={{ textTransform: "capitalize", fontSize: 20 }}
                    title={data.name}
                    image={{ uri: url.getImage(data.url.split("pokemon")[1].replace(/\//g, "")) }}
                  >
                  </Card>
                </View>

              </TouchableHighlight>
            )
          }
        </View>
      </ScrollView>
    );

  }
}

const mapStateToProps = ({ types = [], list }) => {
  return {
    types,
    data: list.results,
    next: list.next
  }
};
const mapDispatchToProps = dispatch => ({
  getTypes: () => dispatch(getTypes()),
  getData: (next) => dispatch(getData(next)),
  getDataByType: (name) => dispatch(getDataByType(name))

});
export default connect(mapStateToProps, mapDispatchToProps)(Home);