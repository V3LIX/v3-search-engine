import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SearchQuery {
  id: number;
  query: string;
  timestamp: string;
  resultsCount: number;
}

export default function HistoryScreen() {
  const [searchHistory] = useState<SearchQuery[]>([
    {
      id: 1,
      query: 'React Native development',
      timestamp: '2 hours ago',
      resultsCount: 15,
    },
    {
      id: 2,
      query: 'Expo build APK',
      timestamp: '5 hours ago',
      resultsCount: 12,
    },
    {
      id: 3,
      query: 'Mobile app deployment',
      timestamp: '1 day ago',
      resultsCount: 8,
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {searchHistory.map((query) => (
          <TouchableOpacity key={query.id} style={styles.historyItem}>
            <View style={styles.historyHeader}>
              <Text style={styles.queryText}>{query.query}</Text>
              <Text style={styles.timestamp}>{query.timestamp}</Text>
            </View>
            <Text style={styles.resultsCount}>
              {query.resultsCount} results found
            </Text>
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
  historyItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  queryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: '#64748b',
  },
  resultsCount: {
    fontSize: 14,
    color: '#64748b',
  },
});
