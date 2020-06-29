import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import {
  colorSecondary,
  container,
  coverImage,
  growingContainer,
  textHeader,
} from '../../styles';
import { ButtonRegular } from '../ButtonRegular';
import { PostItem } from '../../services/blog/types';

interface Props {
  post: PostItem;
  onShare: () => void;
}

export const Details = ({ post, onShare }: Props) => {
  const insets = useSafeAreaInsets();
  const { title, body, author, cover, published } = post;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={container}
      contentContainerStyle={{
        ...styles.content,
        paddingBottom: insets.bottom,
      }}>
      <View>
        <Text style={textHeader}>{title}</Text>
        <Text style={styles.textAuthor}>
          {author} on {moment(published && published.toDate()).format('LL')}
        </Text>
        {!!cover && <Image source={{ uri: cover }} style={coverImage} />}
        <Text style={styles.textBody}>{body}</Text>
      </View>
      <View style={styles.bottom}>
        <ButtonRegular color={colorSecondary} title="Share" onPress={onShare} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
  },
  content: {
    ...growingContainer,
    padding: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  textAuthor: {
    marginTop: 5,
    marginBottom: 20,
  },
  textBody: {
    fontSize: 18,
    marginVertical: 20,
  },
});
