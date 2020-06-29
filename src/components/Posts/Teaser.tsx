import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { colorSecondary } from '../../styles';
import { PostItem } from '../../services/blog/types';
import { POST } from '../../screens/types';

interface Props {
  post: PostItem;
}

export const Teaser = React.memo(({ post }: Props) => {
  const navigation = useNavigation();
  const { title, author, cover, published } = post;

  const onPress = () => navigation.navigate(POST, { post });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.618}>
      <ImageBackground
        source={cover ? { uri: cover } : {}}
        style={styles.imageBackground}>
        <View style={styles.imageOverlay}>
          <Text numberOfLines={2} style={[styles.text, styles.title]}>
            {title}
          </Text>
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
    marginBottom: 10,
  },
  imageBackground: {
    backgroundColor: colorSecondary,
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
    color: '#FFFFFF',
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
