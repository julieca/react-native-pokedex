// import React, { Component } from 'react';
// import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Alert, PanResponder, Share } from 'react-native';
// import { Card, Icon, Rating, Input, Button } from 'react-native-elements';
// import { connect } from 'react-redux';
// import { baseUrl } from '../shared/baseUrl';
// import { postFavorite, postComment } from '../redux/ActionCreators';
// import * as Animatable from 'react-native-animatable';



// function RenderComment(props) {
//   const comments = props.comments;
//   const renderCommentItem = ({ item, index }) => {
//     return (
//       <View key={index} style={{ margin: 10 }}>
//         <Text style={{ fontSize: 14 }}>{item.comment}</Text>
//         <Rating
//           imageSize={12}
//           readonly
//           startingValue={item.rating}
//           style={{ alignItems: 'baseline' }}
//         />
//         <Text style={{ fontSize: 12 }}>{'-- ' + item.author + ', ' + item.date}</Text>
//       </View>
//     );
//   };
//   return (
//     <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
//       <Card title='Comments'>
//         <FlatList data={comments}
//           renderItem={renderCommentItem}
//           keyExtractor={item => item.id.toString()} />
//       </Card>
//     </Animatable.View>
//   );
// }

// function RenderDish(props) {
//   const dish = props.dish;
//   handleViewRef = ref => this.view = ref;
//   const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
//     if (dx < -200) {
//       return true;
//     }
//     else {
//       return false;
//     }
//   };
//   const recognizeComment = ({ moveX, moveY, dx, dy }) => {
//     if (dx > 200) {
//       return true
//     }
//     else {
//       return false;
//     }
//   };

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: (e, gestureState) => {
//       return true;
//     },
//     onPanResponderGrant: () => {
//       this.view.rubberBand(1000)
//         .then(endState => console.log(endState.finished ? "Finished" : "Cancelled"));
//     },
//     onPanResponderEnd: (e, gestureState) => {
//       if (recognizeDrag(gestureState)) {
//         Alert.alert(
//           'Add Favorite',
//           'Are you sure you wish to add ' + dish.name + ' to Favorites?',
//           [
//             {
//               text: 'Cancel',
//               onPress: () => console.log("Cancel Pressed"),
//               style: 'cancel'
//             },
//             {
//               text: "OK",
//               onPress: () => { props.favorites ? console.log('Already Favorite') : props.onPress() }
//             }
//           ], { cancelable: false }
//         );
//       } else if (recognizeComment(gestureState)) {
//         props.openModal();
//       }
//       return true;
//     }
//   });

//   const shareDish = (title, message, url) => {
//     Share.share({
//       title: title,
//       message: title + " : " + message + " " + url,
//       url: url
//     }, {
//       dialogTitle: "Share " + title
//     })
//   };

//   if (dish != null) {
//     return (
//       <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
//         ref={this.handleViewRef}
//         {...panResponder.panHandlers}>
//         <Card
//           featuredTitle={dish.name}
//           image={{ uri: baseUrl + dish.image }}>
//           <Text style={{ margin: 10 }}>
//             {dish.description}
//           </Text>
//           <View style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center"
//           }}>
//             <Icon raised
//               reverse
//               name={props.favorite ? 'heart' : 'heart-o'}
//               type={'font-awesome'}
//               color='#f50'
//               onPress={() => props.favorites ? console.log('Already Favorite') : props.onPress()}
//             />
//             <Icon raised
//               reverse
//               name={'pencil'}
//               type={'font-awesome'}
//               color='#512DA8'
//               onPress={() => props.openModal()}
//             />
//             <Icon raised
//               reverse
//               name={'share'}
//               type={'font-awesome'}
//               color='#512DA8'
//               onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
//             />
//           </View>

//         </Card>
//       </Animatable.View>
//     );
//   }
// }

// class Dishdetail extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false,
//       rating: 5,
//       author: "",
//       comment: ""
//     };
//   }
//   static navigationOptions = {
//     title: "Dish Details"
//   };
//   toggleModal() {
//     this.setState({
//       showModal: !this.state.showModal
//     })
//   }
//   submitComment(dishId) {
//     this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
//     this.toggleModal();
//   }
//   resetForm() {
//     this.setState({
//       showModal: false,
//       rating: 5,
//       author: "",
//       comment: ""
//     })
//   }
//   markFavorite(dishId) {
//     console.log(this.props.favorites)
//     this.props.postFavorite(dishId);
//   };
//   render() {
//     const dishId = this.props.navigation.getParam('dishId', '')
//     return (
//       <ScrollView>
//         <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el === dishId)} onPress={() => this.markFavorite(dishId)} openModal={() => this.toggleModal()} />
//         <RenderComment comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={this.state.showModal}
//           onDismiss={() => this.toggleModal()}
//           onRequestClose={() => this.toggleModal()}
//         >
//           <View style={{ flex: 1 }}>
//             <Rating showRating startingValue={this.state.rating} onFinishRating={(value) => this.setState({ rating: value })} />
//             <Input placeholder='Author'
//               leftIcon={{ type: 'font-awesome', name: 'user-o' }}
//               onChangeText={(value) => this.setState({ author: value })}
//             />
//             <Input placeholder='Comment'
//               leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
//               onChangeText={(value) => this.setState({ comment: value })}
//             />
//             <Button
//               onPress={() => this.submitComment(dishId)}
//               color="#512DA8"
//               title="Submit"
//             />
//             <Button
//               onPress={() => { this.resetForm(); this.toggleModal() }}
//               color="fff"
//               title="Close"
//             />
//           </View>
//         </Modal>
//       </ScrollView>
//     );
//   }

// }

// const mapStateToProps = state => {
//   return {
//     dishes: state.dishes,
//     comments: state.comments,
//     favorites: state.favorites
//   }
// }

// const mapDispatchToProps = dispatch => ({
//   postFavorite: (dishId) => dispatch(postFavorite(dishId)),
//   postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);