import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { UserContext } from '../../../../context/userContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur'; 

export type ProfileStackParamList = {
  Send: {} | undefined;
  Verify: {} | undefined;
};

const Faq = () => {
    const { user } = useContext(UserContext);
    const { t } = useTranslation();
    const nav = useNavigation<StackNavigationProp<ProfileStackParamList>>();

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const faqData = [

        { question: 'How do I log in?', answer: 'You can log in using your email and password or via Google and Facebook authentication.' },
        { question: 'How can I sell a product?', answer: 'Go to the selling section, click on "Sell Now," and follow the instructions to list your product.' },
        // { question: 'How do I become a teacher?', answer: 'Register as an instructor by providing your details and course materials. Once approved, you can start teaching.' },
        { question: 'How does learning work?', answer: 'You can browse courses, enroll in a course, and start learning at your own pace with video tutorials and exercises.' },
        { question: 'How do I buy a product?', answer: 'Browse the marketplace, select the product you want, and proceed with payment to complete your purchase.' },
    ];

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient
                          colors={['#f5d7db', '#dcc5f7', '#f0f0f0']}
                          style={StyleSheet.absoluteFill}
                        />
            <Text style={styles.welcome}>{t('Frequently Asked Questions')}</Text>

            <View style={styles.faqContainer}>
                <FlatList
                    data={faqData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View>
                            <TouchableOpacity style={styles.faqItem} onPress={() => toggleExpand(index)}>
                                <Text style={styles.faqQuestion}>{item.question}</Text>
                                <Icon name={expandedIndex === index ? 'expand-less' : 'expand-more'} size={24} color="#000" />
                            </TouchableOpacity>
                            {expandedIndex === index && (
                                <View style={styles.faqAnswer}>
                                    <Text style={styles.faqAnswerText}>{item.answer}</Text>
                                </View>
                            )}
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    welcome: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000',
    },
    faqContainer: {
        width: '100%',
    },
    faqItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    faqAnswer: {
        backgroundColor: '#f1f1f1',
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#ff6f00',
    },
    faqAnswerText: {
        fontSize: 14,
        color: '#555',
    },
});

export default Faq;