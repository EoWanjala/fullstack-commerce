import { View, StyleSheet } from 'react-native';
import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';

const Carousel = () => {
    const slides = [
        require('../assets/pexels.png'),
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
        'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80'
    ];

    return (
        <View style={styles.carouselContainer}>
            <SliderBox
                images={slides}
                dotColor='#FF8E01'
                inactiveDotColor='#1E1E2D'
                ImageComponentStyle={styles.imageStyle} 
                sliderBoxHeight={200}
                autoplay
                circleLoop
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: "center",
    },
    imageStyle: {
        borderRadius: 15,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
});

export default Carousel;
