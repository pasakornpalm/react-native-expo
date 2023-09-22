import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/saleecolour_logo01.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    objectFit:'contain',
    width: 200,
    height: 30,
    marginBottom: 0,
  },
})
