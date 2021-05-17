import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const DetailMusicItem = ({ item }) => {
  // title
  // artist
  // artwork
  // genre
  // year
  // id

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.artwork }} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>{item.artist}</Text>
        <Text style={styles.details}>{item.year}</Text>
        <Text style={styles.details}>{item.genre}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1,justifyContent: "center" ,alignItems: "center",},
  image: { width: 100, height: 100, margin: 5},
  info: { flex: 1, justifyContent: "center" },
  title: { fontSize: 20, textAlign: "center" },
  details: { color: "gray", textAlign: "center" },
});

export default DetailMusicItem;
