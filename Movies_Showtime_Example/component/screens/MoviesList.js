import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableHighlight, FlatList, Image, ActivityIndicator } from 'react-native'
import axios from 'axios';
import moment from 'moment'

export default function MoviesList({ navigation }) {

    const [movies, setMovies] = useState([]);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`https://movie-api.igeargeek.com/movies`)
            .then(res => {
            const movies = res.data.data;
            setMovies(movies)
            setLoading(false)
        })
      }, [])

    
    if (isLoading) {
        return(
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={movies}
                numColumns={2}
                horizontal={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => 
                <TouchableHighlight
                    style={styles.cardMovie}
                    activeOpacity={1}
                    onPress={() => 
                        navigation.navigate('MovieDetail', { id: item.id })
                    }>
                    <View style={styles.cardMovie}>
                        <Image source={{uri: item.posterUrl}}
                            style={styles.movieImage} />
                        <View style={{padding: 20}}>
                            <Text style={styles.textDate}>{moment(item.showingAt).format('DD MMM YYYY')}</Text>
                            <Text style={styles.textTitle}>{item.name}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    textDate: {
        color: '#e1b12c'
    },
    textTitle: {
        color: '#fff',
        fontSize: 17,
        marginTop: 5,
        lineHeight: 25
    },
    cardMovie: {
        flex: .5, 
    },
    movieImage: {
        height: 300
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

