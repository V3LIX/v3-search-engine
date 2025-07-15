import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Bookmark {
  id: number;
  title: string;
  url: string;
  description: string;
  category: string;
}

export default function BookmarksScreen() {
  const [bookmarks] = useState<Bookmark[]>([
    {
      id: 1,
      title: 'React Native Documentation',
      url: 'https://reactnative.dev/',
      description: 'Official React Native documentation and guides',
      category: 'Development',
    },
    {
      id: 2,
      title: 'Expo Documentation',
      url: 'https://docs.expo.dev/',
      description: 'Comprehensive Expo development resources',
      category: 'Development',
    },
  ]);

  const openBookmark = (bookmark: Bookmark) => {
    Alert.alert(
      'Open Bookmark',
      `Would you like to open: ${bookmark.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open', onPress: () => console.log('Opening:', bookmark.url) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {bookmarks.map((bookmark) => (
          <TouchableOpacity
            key={bookmark.id}
            style={styles.bookmarkItem}
            onPress={() => openBookmark(bookmark)}
          >
            <View style={styles.bookmarkHeader}>
              <Text style={styles.bookmarkTitle}>{bookmark.title}</Text>
              <Text style={styles.bookmarkCategory}>{bookmark.category}</Text>
            </View>
            <Text style={styles.bookmarkUrl}>{bookmark.url}</Text>
            <Text style={styles.bookmarkDescription}>{bookmark.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  bookmarkItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  bookmarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookmarkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  bookmarkCategory: {
    fontSize: 12,
    color: '#3B82F6',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  bookmarkUrl: {
    fontSize: 14,
    color: '#3B82F6',
    marginBottom: 8,
  },
  bookmarkDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});
