import Animated, { FadeIn } from 'react-native-reanimated';
import { Button, FlatList, LogBox, StyleSheet, Text, View, findNodeHandle } from 'react-native';
import {
  Carousel,
  CustomLayoutAnimationScreen,
  DefaultAnimations,
  Modal,
  ModalNewAPI,
  MountingUnmounting,
  SpringLayoutAnimation,
  SwipeableList,
} from './LayoutReanimation';
import React, { useEffect, useRef, useState } from 'react';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';

import AnimatedStyleUpdateExample from './AnimatedStyleUpdateExample';
import AnimatedTabBarExample from './AnimatedTabBarExample';
import ChatHeadsExample from './ChatHeadsExample';
import DragAndSnapExample from './DragAndSnapExample';
import ExtrapolationExample from './ExtrapolationExample';
import LightboxExample from './LightboxExample';
import LiquidSwipe from './LiquidSwipe';
import MapViewExample from './LayoutReanimation/MapViewExample';
import MeasureExample from './MeasureExample';
import ModalExample from './LayoutReanimation/ModalExample';
import { NavigationContainer } from '@react-navigation/native';
import Reanimated1 from '../reanimated1/App';
import ScrollEventExample from './ScrollEventExample';
import ScrollExample from './AnimatedScrollExample';
import ScrollToExample from './ScrollToExample';
import ScrollableViewExample from './ScrollableViewExample';
import { SvgExample } from './LayoutReanimation/SvgExample';
import SwipeableListExample from './SwipeableListExample';
import WobbleExample from './WobbleExample';

LogBox.ignoreLogs(['Calling `getNode()`']);

type Screens = Record<string, { screen: React.ComponentType; title?: string }>;

function Counter() {
  const [ctr, setState] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    console.log("tag ", findNodeHandle(ref.current)); 
  },[]);
  return (
    <Animated.View ref={ref} entering={FadeIn.duration(3000)} >
      <Text>{ctr}</Text>
      <Button title="inc" onPress={() => { setState((i) => i+1) }}/>
    </Animated.View>
  );
}

const SCREENS: Screens = {
  SuperScreen: {
    screen: Counter,
    title: 'counter',
  },
  DefaultAnimations: {
    screen: DefaultAnimations,
    title: '🆕 Default layout animations',
  },
  MapViewExample: {
    screen: MapViewExample,
    title: '🆕  MapView',
  },
  ModalExample: {
    screen: ModalExample,
    title: '🆕  ModalExample',
  },
  SvgExample: {
    screen: SvgExample,
    title: '🆕  SvgExample',
  },
  CustomLayoutAnimation: {
    screen: CustomLayoutAnimationScreen,
    title: '🆕 Custom layout animation',
  },
  ModalNewAPI: {
    title: '🆕 ModalNewAPI',
    screen: ModalNewAPI,
  },
  SpringLayoutAnimation: {
    title: '🆕 Spring Layout Animation',
    screen: SpringLayoutAnimation,
  },
  MountingUnmounting: {
    title: '🆕 Mounting Unmounting',
    screen: MountingUnmounting,
  },
  SwipeableList: {
    title: '🆕 Swipeable list',
    screen: SwipeableList,
  },
  Modal: {
    title: '🆕 Modal',
    screen: Modal,
  },
  Carousel: {
    title: '🆕 Carousel',
    screen: Carousel,
  },
  AnimatedStyleUpdate: {
    screen: AnimatedStyleUpdateExample,
    title: 'Animated Style Update',
  },
  WobbleExample: {
    screen: WobbleExample,
    title: 'Animation Modifiers (Wobble Effect)',
  },
  DragAndSnapExample: {
    screen: DragAndSnapExample,
    title: 'Drag and Snap',
  },
  MeasureExample: {
    screen: MeasureExample,
    title: 'Synchronous Measure',
  },
  ScrollEventExample: {
    screen: ScrollEventExample,
    title: 'Scroll Events',
  },
  ChatHeadsExample: {
    screen: ChatHeadsExample,
    title: 'Chat Heads',
  },
  ScrollableToExample: {
    screen: ScrollToExample,
    title: 'scrollTo',
  },
  SwipeableListExample: {
    screen: SwipeableListExample,
    title: '(advanced) Swipeable List',
  },
  LightboxExample: {
    screen: LightboxExample,
    title: '(advanced) Lightbox',
  },
  ScrollableViewExample: {
    screen: ScrollableViewExample,
    title: '(advanced) ScrollView imitation',
  },
  AnimatedTabBarExample: {
    screen: AnimatedTabBarExample,
    title: '(advanced) Tab Bar Example',
  },
  LiquidSwipe: {
    screen: LiquidSwipe,
    title: 'Liquid Swipe Example',
  },
  ExtrapolationExample: {
    screen: ExtrapolationExample,
    title: 'Extrapolation Example',
  },
  ScrollExample: {
    screen: ScrollExample,
    title: 'Scroll Example',
  },
};

type RootStackParams = { Home: undefined } & { [key: string]: undefined };
type MainScreenProps = {
  navigation: StackNavigationProp<RootStackParams, 'Home'>;
  setUseRea2: (useRea2: boolean) => void;
};

function MainScreen({ navigation, setUseRea2 }: MainScreenProps) {
  const data = Object.keys(SCREENS).map((key) => ({ key }));
  return (
    <FlatList
      style={styles.list}
      data={data}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => (
        <MainScreenItem
          {...props}
          screens={SCREENS}
          onPressItem={({ key }) => navigation.navigate(key)}
        />
      )}
      renderScrollComponent={(props) => <ScrollView {...props} />}
      ListFooterComponent={() => <LaunchReanimated1 setUseRea2={setUseRea2} />}
    />
  );
}

export function ItemSeparator(): React.ReactElement {
  return <View style={styles.separator} />;
}

type Item = { key: string };
type MainScreenItemProps = {
  item: Item;
  onPressItem: ({ key }: Item) => void;
  screens: Screens;
};
export function MainScreenItem({
  item,
  onPressItem,
  screens,
}: MainScreenItemProps): React.ReactElement {
  const { key } = item;
  return (
    <RectButton style={styles.button} onPress={() => onPressItem(item)}>
      <Text style={styles.buttonText}>{screens[key].title || key}</Text>
    </RectButton>
  );
}

function LaunchReanimated1({
  setUseRea2,
}: {
  setUseRea2: (useRea2: boolean) => void;
}) {
  return (
    <>
      <ItemSeparator />
      <RectButton style={styles.button} onPress={() => setUseRea2?.(false)}>
        <Text style={styles.buttonText}>👵 Reanimated 1.x Examples</Text>
      </RectButton>
    </>
  );
}

const Stack = createStackNavigator();

const Reanimated2 = (setUseRea2: (useRea2: boolean) => void) => (
  <Stack.Navigator detachInactiveScreens={false}>
    <Stack.Screen
      name="Home"
      options={{ title: '🎬 Reanimated 2.x Examples' }}
      children={(props) => <MainScreen {...props} setUseRea2={setUseRea2} />}
    />
    {Object.keys(SCREENS).map((name) => (
      <Stack.Screen
        key={name}
        name={name}
        getComponent={() => SCREENS[name].screen}
        options={{ title: SCREENS[name].title || name }}
      />
    ))}
  </Stack.Navigator>
);

function App(): React.ReactElement {
  const [useRea2, setUseRea2] = React.useState(true);

  return (
    <NavigationContainer>
      {useRea2 ? Reanimated2(setUseRea2) : Reanimated1(setUseRea2)}
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
