import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

/*class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}*/

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    const isInfo = state.params.mode === 'info';
    const {user} = state.params;
    return {
      title: isInfo ? `${user}'s Contact Info` : `Chat with ${state.params.user}`,
      headerRight: <Button title={isInfo ? 'Done' : `${user}'s info`} onPress={() => setParams({ mode: isInfo ? 'none' : 'info'})}/>,
    }
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text>Chat with {params.user}</Text>
      </View>
    );
  }
}

class RecentChatsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Recent Chats',
    headerBackTitle: 'back',
  });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>List of recent chats</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'Lucy' })}
          title="Chat with Lucy"
        />
      </View>
    )
  }
}

class AllContactsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'All Chats',
    headerBackTitle: 'back',
  });
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>List of all contacts</Text>
        <Button
          onPress={() => navigate('Chat', { user: 'All' })}
          title="Chat with All"
        />
      </View>
    )
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
  Recent2: { screen: RecentChatsScreen },
  All2: { screen: AllContactsScreen },
});

const SimpleApp = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Chat: { screen: ChatScreen },
});

AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
