import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { colorSecondary } from '../styles';
import { PostItem } from '../services/blog/types';

interface Props {
  post: PostItem;
}

export const PostTeaser = React.memo(({ post }: Props) => {
  const navigation = useNavigation();
  console.log(`Rendering post ${post.id}`);
  // console.log('props', props);
  // console.log('post', post);
  const { title, author, body, cover, published } = post;
  // const image = cover || transparent;

  const onPress = () => {
    navigation.navigate('Post', { post });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.618}>
      <ImageBackground
        // source={cover ? { uri: cover } : transparent}
        source={cover ? { uri: cover } : {}}
        style={styles.imageBackground}>
        <View style={styles.imageOverlay}>
          <Text numberOfLines={2} style={[styles.text, styles.title]}>
            {title}
          </Text>
          {/*<Text numberOfLines={2} style={[styles.text, styles.title]}>{title.toUpperCase()}</Text>*/}
          {/*<Text numberOfLines={2} style={[styles.text]}>{body}</Text>*/}
          <View style={styles.published}>
            <Text style={[styles.text, styles.value]}>
              {author} on {moment(published.toDate()).format('LL')}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 10,
    // marginHorizontal: 16,
    marginBottom: 10,
  },
  imageBackground: {
    backgroundColor: colorSecondary,
    // height: screenHeight / 4,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 110,
  },
  imageOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 110,
  },
  text: {
    color: '#fff',
    backgroundColor: 'transparent',
    textShadowColor: '#333',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  published: {
    flexDirection: 'row',
  },
  value: {
    fontSize: 16,
  },
});
