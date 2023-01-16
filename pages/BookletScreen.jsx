import React from "react";
import { Text, View, FlatList, KeyboardAvoidingView } from "react-native";
import { Button, Header as HeaderRNE, SearchBar } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { openPDF, normalize, fileMap, hasNumber } from "../utils";

// borderRadius: 20,
// borderWidth: 1,
// borderColor: "",
// elevation: 2,

const BookletScreen = ({ route, navigation }) => {
  const { BOOKLET, SEARCH, GETFILE } = fileMap[route.params.type];

  const searchRef = React.useRef(null);

  const [searchText, setSearchText] = React.useState("");
  const [items, setItems] = React.useState(BOOKLET);

  const onSearchType = (queryString) => {
    setSearchText(queryString);

    if (!queryString) {
      setItems(BOOKLET);
      return;
    }

    let lowerQueryString = queryString.toLowerCase().trim();

    if (hasNumber(lowerQueryString)) {
      const aartiMatchedByNumber = BOOKLET.filter((item) => {
        if (item.number.indexOf(lowerQueryString) >= 0) return true;
      });
      setItems(aartiMatchedByNumber);
    } else {
      const aartiBySearch = SEARCH.search(lowerQueryString);
      setItems(aartiBySearch.map(({ item }) => item));
    }

    /*
     *    Redundant code - Not needed anymore
     */

    // const wordsInSearch = lowerQueryString.split(" ");
    // if (wordsInSearch.length && wordsInSearch[wordsInSearch.length - 1] == "")
    //   wordsInSearch.pop();

    // // tokanize the words and get their counts
    // let wordMap = {};
    // if (splitedWords.length) {
    //   for (word of splitedWords) {
    //     if (word in wordMap) {
    //       wordMap[word] = wordMap[word] + 1;
    //     } else {
    //       wordMap[word] = 1;
    //     }
    //   }
    // } else {
    //   wordMap[lowerQueryString] = 1;
    // }
    // console.log(wordMap)
    // const words = Object.entries(wordMap)
    // console.log(words);

    // it is a aarti number, just return by the index
    // if (hasNumber(lowerQueryString)) {
    //   const aartiMatchedByNumber = BOOKLET.filter((item) => {
    //     if (item.number.indexOf(lowerQueryString) >= 0) return true;
    //   });
    //   setItems(aartiMatchedByNumber);
    //   return;
    // }

    // // do simple text search
    // let filteredAarti = [];
    // for (let aarti of BOOKLET) {
    //   let matches = 0;
    //   for (let text_in_aarti of aarti.search_txt) {
    //     if (text_in_aarti.includes(lowerQueryString)) matches = matches + 1;
    //   }
    //   if (matches) {
    //     aarti.likeliness = matches;
    //     filteredAarti.push(aarti);
    //   }
    // }

    // if (!filteredAarti.length) {
    //   console.log("No aarti found at all.. doing in depth search by keyword");

    //   for (let aarti of BOOKLET) {
    //     let matched = 0;

    //     for (let searchText of aarti.search_txt) {
    //       for (let word of wordsInSearch) {
    //         if (searchText.includes(word)) matched += 1;
    //       }
    //     }

    //     if (matched) {
    //       aarti.likeliness = matched;
    //       filteredAarti.push(aarti);
    //     }
    //   }
    // }

    // filteredAarti.sort((a, b) => (a.likeliness < b.likeliness ? 1 : -1));

    // console.log(
    //   filteredAarti.map((itm) => `${itm.number}: \t ${itm.likeliness}`)
    // );

    // setItems(filteredAarti);
  };

  const renderItem = ({ item }) => (
    <Button
      title={`${item.number}. ${item.name}`}
      buttonStyle={{
        borderColor: "#D5D8DC",
      }}
      type="outline"
      raised
      size="lg"
      titleStyle={{
        color: "#f0225e",
        fontSize: normalize(18),
      }}
      containerStyle={{
        width: "90%",
        marginHorizontal: 20,
        marginVertical: 7.5,
        borderRadius: 25,
      }}
      onPress={() => openPDF(GETFILE(item.number))}
    />
  );

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <HeaderRNE
        elevated={0}
        backgroundColor="#E74C3C"
        centerComponent={{
          text: route.params.name,
          style: {
            color: "white",
            fontSize: normalize(19),
            fontWeight: "bold",
            marginTop: 3,
            marginBottom: 3,
          },
        }}
      />

      <SafeAreaView style={{ height: "100%", paddingTop: -40 }}>
        <KeyboardAvoidingView style={{ flex: 1, paddingBottom: 0 }}>
          <SearchBar
            onChangeText={onSearchType}
            value={searchText}
            ref={searchRef}
            lightTheme={true}
            round={true}
            inputStyle={{
              backgroundColor: "white",
            }}
            containerStyle={{
              backgroundColor: "#EAECEE",
              padding: normalize(10),
            }}
            inputContainerStyle={{
              backgroundColor: "white",
              padding: normalize(2),
              borderColor: "#AEB6BF",
              borderWidth: 1,
              borderBottomWidth: 1,
            }}
            placeholderTextColor={"#85929E"}
            placeholder={"Search Here.."}
          />
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              height: "100%",
              paddingTop: 4,
              paddingBottom: 10,
              width: "100%",
            }}
          >
            {items.length ? (
              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.number}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                style={{
                  marginBottom: 75,
                }}
              />
            ) : (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  color: "#2C3E50",
                  marginTop: 50,
                }}
              >
                Not Found!
              </Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default BookletScreen;
