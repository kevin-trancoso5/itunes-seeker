import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import MusicItem from "../MusicItem";
import DetailMusicItem from "../DetailMusicItem";
import { createStackNavigator } from "@react-navigation/stack";

const formatResponse = (item) => {
  return {
    title: item.trackName,
    artist: item.artistName,
    artwork: item.artworkUrl100,
    genre: item.primaryGenreName,
    year: item.releaseDate,
    id: item.trackId.toString(),
  };
};

const searchItunes = async (query) => {
  if (query == "") return;
  const formattedQuery = query.split(" ").join("+");
  const response = await fetch(
    `https://itunes.apple.com/search?term=${formattedQuery}`
  );
  const json = await response.json();
  return json.results
    .filter((item) => item.trackId && item.trackName)
    .map(formatResponse);
};

const SearchStack = createStackNavigator();
function SearchStackScreen({ onAdd }) {
  console.log(onAdd);
  return (
    <SearchStack.Navigator initialRouteName="Search">
      <SearchStack.Screen
        name="Search"
        component={SearchView}
        initialParams={{ onAdd: onAdd }}
      />
      <SearchStack.Screen name="Details" component={MusicView} />
    </SearchStack.Navigator>
  );
}

const MusicView = ({ route, navigation }) => {
  const { onAdd, item } = route.params;

  return (
    <View>
      <DetailMusicItem item={item} />
      <TouchableOpacity
        onPress={() => {
          onAdd(item);
          navigation.pop();
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Ajouter à la librairie</Text>
      </TouchableOpacity>
    </View>
  );
};

const SearchView = ({ route, navigation }) => {
  const { onAdd } = route.params;
  const [input, setInput] = useState("");
  const [listResults, setListResults] = useState([]);

  const handleSubmit = () => {
    searchItunes(input).then((result) => {
      setListResults(result);
    });
  };

  useEffect(() => {
    const timeout = setTimeout(handleSubmit, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  console.log(onAdd);
  return (
    <View>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Search iTunes"
      />
      <FlatList
        data={listResults}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Details", {
                onAdd: onAdd,
                item: item,
              });
            }}
          >
            <MusicItem item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    backgroundColor: "tomato",
    color: "white",
    padding: 10,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    width: 400,
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default SearchStackScreen;
