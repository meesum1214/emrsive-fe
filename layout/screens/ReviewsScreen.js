import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Rating } from 'react-native-ratings';
import { addReview, getReviews } from '../API/add';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialReviews = [
    { id: 1, username: 'User1', review: 'Great app!' },
    { id: 2, username: 'User2', review: 'Awesome experience!' },
];

export default () => {
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState('');
    const [rating, setRating] = useState(0)
    const [change, setChange] = useState(false)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const getUserId = async () => {
            let user = await AsyncStorage.getItem('emrsive-user')
            setUserId(JSON.parse(user).id)
            // console.log(JSON.parse(user).id)
        }

        getUserId();

        getReviews().then((res) => {
            setReviews(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [change])

    const handleReviewSubmit = () => {
        if (userReview.trim() !== '' && rating !== 0) {
            addReview({
                review: userReview,
                rating: rating,
                user_id: userId
            }).then((res) => {
                console.log(res)
                setChange(!change)
            }).catch((err) => {
                console.log(err)
            })

            setUserReview('');
            setRating(0)
        }

        console.log(rating)
        console.log(userReview)
    };

    return (
        <View className={'flex-1 p-4 bg-white'}>
            <FlatList
                data={reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View className='p-4 border-b border-gray-300'>
                        <View className="flex-row items-center mb-2">
                            <Text className='font-bold text-black'>{item?.user.firstName} {item?.user.lastName}</Text>
                            <Rating
                                readonly
                                startingValue={item.rating}
                                className='ml-5'
                                imageSize={20}
                            />
                        </View>
                        <Text className="text-black">{item.review}</Text>
                    </View>
                )}
            />
            <View className='mt-4'>
                <Rating
                    showRating
                    // onFinishRating={this.ratingCompleted}
                    startingValue={rating}
                    onFinishRating={setRating}
                    className='py-3 '
                // ratingContainerStyle={{ backgroundColor: '#0000' }}
                />
                <TextInput
                    className='border p-2 text-gray-500'
                    value={userReview}
                    onChangeText={setUserReview}
                    placeholder="Write your review..."
                    multiline
                />
                <TouchableOpacity
                    className='bg-blue-500 mt-2 py-2 px-4 rounded-md'
                    onPress={handleReviewSubmit}
                >
                    <Text className='text-white text-center'>Submit Review</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
