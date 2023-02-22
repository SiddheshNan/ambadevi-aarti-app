import React from "react";
import { Text, View, FlatList, KeyboardAvoidingView } from "react-native";
import { Button, Header as HeaderRNE, SearchBar } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { normalize, fileMap, hasNumber, openFile } from "../utils";

const BookletScreen = ({ route, navigation }) => {
  const { BOOKLET, SEARCH, GETFILE } = fileMap[route.params.type];

  const searchRef = React.useRef(null);
  const flatlistRef = React.useRef(null);

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

    flatlistRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderItem = ({ item }) => (
    <Button
      title={`${item.number}. ${item.name.replace(/\\n/g, "\n")}`}
      buttonStyle={{
        borderColor: "#D5D8DC",
        backgroundColor: "#fff",
        borderRadius: 7.5,
      }}
      // type="outline"
      raised
      size="lg"
      titleStyle={{
        color: "#f0225e",
        fontSize: normalize(15.5),
      }}
      containerStyle={{
        width: "90%",
        marginHorizontal: 20,
        marginVertical: 7.5,
        borderRadius: 7.5,
      }}
      onPress={() => {
        if (route.params.kind == "PDF") {
          openFile(GETFILE(item.number), "application/pdf");
        } else if (route.params.kind == "IMG") {
          openFile(GETFILE(item.number), "image/jpeg");
        }
      }}
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
            marginTop: normalize(4),
            marginBottom: normalize(4),
          },
        }}
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          style: {
            marginTop: normalize(6),
            marginLeft: normalize(8),
          },
          onPress: () => navigation.goBack(),
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
              fontSize: normalize(15),
            }}
            containerStyle={{
              backgroundColor: "#EAECEE",
              padding: normalize(10),
            }}
            inputContainerStyle={{
              backgroundColor: "white",
              padding: normalize(2), // search box size! Dont change this
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
                ref={flatlistRef}
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
