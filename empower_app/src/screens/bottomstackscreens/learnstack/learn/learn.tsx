import React, { useContext, useEffect, useState } from 'react';
import { Text, Image, StyleSheet, ScrollView, Alert, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../../../../utils/constants';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';

export type LearnStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
};

const Learn = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const nav = useNavigation<StackNavigationProp<LearnStackParamList>>();

  const [learnData, setLearnData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLearnData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/course/list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        console.log('Learn data:', result);

        if (response.ok) {
          const courses = result.courses || [];
          console.log('Learn data:', courses);
          setLearnData(courses);
          console.log('Learn data:', setLearnData);
        } else {
          throw new Error(result.message || 'Failed to load learn content');
        }
      } catch (error) {
        console.error('Error fetching learn data:', error);
        Alert.alert('Error', 'Failed to load learning content');
      } finally {
        setLoading(false);
      }
    };

    fetchLearnData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loading}>Loading learning content...</Text>
      </View>
    );
  }

  if (learnData.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>No learning content found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#f5d7db', '#dcc5f7', '#f0f0f0']} style={StyleSheet.absoluteFill} />
      
      {learnData.map((item: any) => (
        <TouchableOpacity key={item.id || item.ID} style={styles.card}>
          <Video
        source={{ uri: item.COURSE_URL }}
        style={{ width: '100%', height: 300 }}
        controls={true}
        resizeMode="contain"
      />
          <Text style={styles.title}>{item.title || item.NAME}</Text>

          <Text style={styles.description}>{item.descriptio || item.DESCRIPTION}</Text>
          <View style={styles.buttonContainer}>
            {/* <Button
              mode="contained"
              onPress={() => console.log(`Starting lesson ${item.id || item.ID}`)}
              style={styles.button}
              color="#6C63FF"
            // > */}
            {/* //   Start Learning
            // </Button> */}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
  },
  loading: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 12,
  },
  error: {
    fontSize: 18,
    color: '#f00',
    textAlign: 'center',
    marginTop: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
});

export default Learn;
