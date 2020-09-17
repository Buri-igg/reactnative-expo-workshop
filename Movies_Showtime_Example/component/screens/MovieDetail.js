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
            console.log("res", res.data)
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
                style={styles.videoLayout}
                source={{uri: movieData.youtubeUrl}}
            />
            <View style={styles.movieInfoToplayout}>
                <View style={styles.movieInfoView}>
                    <Image source={{uri: movieData.posterUrl}} 
                        style={{ flex: 1, height: 190 }} resizeMethod="scale" resizeMode='stretch' />
                    <View style={{flex: 2, marginLeft: 15}}>
                        <Text style={styles.textMovieTitle}>{movieData.name}</Text>
                        <View style={styles.textMovieLayout}>
                            <Text style={styles.textMovieDetail}>ประเภท: </Text>
                            {movieData.genre.map((item, index) => {
                                return(
                                    <Text key={index} style={styles.textMovieDetail}>{item} </Text>
                                )
                            })}
                        </View>
                        <View style={styles.textMovieLayout}>
                            <Text style={styles.textMovieDetail}>วันที่เข้าฉาย: </Text>
                            <Text style={styles.textMovieDetail}>{moment(movieData.show_date).format('DD MMM YYYY')}</Text>
                        </View>
                        <View style={styles.textMovieLayout}>
                            <Text style={styles.textMovieDetail}>ระยะเวลา: </Text>
                            <Text style={styles.textMovieDetail}>{movieData.duration}นาที</Text>
                        </View>
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
        borderBottomWidth: 0.3,
        marginVertical: 15
    },
    movieBottomLayout: {
        flexDirection: 'row', 
        paddingBottom: 20
    },
    textMovieLayout: {
        flexDirection: 'row', 
        alignItems: 'baseline'
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
        marginBottom: 10
    }
})

