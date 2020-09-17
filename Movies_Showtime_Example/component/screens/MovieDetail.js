import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import { WebView } from 'react-native-webview';
import axios from 'axios';
import moment from 'moment'

export default function MovieDetail({ route, navigation }) {
    const [movieData, setMovieData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const itemId = route.params.id;
        axios.get(`https://movie-api.igeargeek.com/movies/${itemId}`)
            .then(res => {
            const movieData = res.data;
            setMovieData(movieData)
            setLoading(false)
            navigation.setOptions({ title: movieData.name })
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
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
            <WebView
                allowsFullscreenVideo
                allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction
                style={styles.videoLayout}
                source={{uri: movieData.youtubeUrl}}
            />
            <View style={styles.movieInfoToplayout}>
                <View style={styles.movieInfoView}>
                    <Image source={{uri: movieData.posterUrl}} 
                        style={styles.moviePosterImage} resizeMode='stretch' />
                    <View style={styles.movieInformationLayout}>
                        <Text style={styles.textMovieTitle}>{movieData.name}</Text>
                        <View>
                            <Text style={styles.textMovieGenre}>ประเภท: {movieData.genre.join(', ')}</Text>
                        </View>
                        <Text style={styles.textMovieDetail}>วันที่เข้าฉาย: {moment(movieData.showingAt).format('DD MMM YYYY')}</Text>
                        <Text style={styles.textMovieDetail}>ระยะเวลา: {movieData.duration} นาที</Text>
                    </View>
                </View>
                <View
                style={styles.underLine}
                />
                <View style={{flex: 3}}>
                    <Text style={styles.textMovieInfo}>เรื่องย่อ</Text>
                    <Text style={styles.descriptionMovie}>{movieData.description}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    videoLayout: {
        flex:1,
        height: 200
    },
    movieInfoToplayout: {
        flex: 2, 
        backgroundColor: '#362420', 
        padding: 15
    },
    movieInfoView: {
        flexDirection: 'row'
    },
    underLine: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginVertical: 15
    },
    movieBottomLayout: {
        flexDirection: 'row', 
        paddingBottom: 20
    },
    textMovieInfo: {
        color: '#fff',
        fontSize: 15
    },
    descriptionMovie: {
        color: '#fff',
        fontSize: 13,
        lineHeight: 18
    },
    textMovieTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textMovieDetail: {
        color: '#fff',
        fontSize: 13,
        marginBottom: 10,
    },
    textMovieGenre: {
        flex: 1, 
        flexWrap: 'wrap',
        color: '#fff',
        fontSize: 13,
        marginBottom: 10,
    },
    moviePosterImage: {
        flex: 1, 
        height: 190 
    },
    movieInformationLayout: {
        flex: 2, 
        marginLeft: 15
    }
})

