import React from "react";
import { ScrollView, StyleSheet, Text, View, Linking } from "react-native";
import Constants from "expo-constants";
import { Button, Header as HeaderRNE } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { normalize } from "../utils";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <HeaderRNE
        elevated={0}
        backgroundColor="#E74C3C"
        centerComponent={{
          text: "अंबा देवी आरती मंडळ",
          style: {
            color: "white",
            fontSize: normalize(20),
            fontWeight: "bold",
            marginTop: 5,
            marginBottom: 5,
          },
        }}
      />

      <SafeAreaView style={{ height: "100%", flex: 1, paddingTop: -40 }}>
        <Text
          style={{
            textAlignVertical: "center",
            textAlign: "center",
            paddingTop: normalize(20),
            fontWeight: "bold",
            fontSize: normalize(16),
            color: "#EE386D"
          }}
        >
          ॥ ॐ प्रणव रुपिणीम् वन्दे ॥
        </Text>

        <ScrollView>
          <View style={{ flex: 1, height: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                paddingTop: normalize(20),
              }}
            >
              <Button
                title={"देवी आरती संग्रह"}
                size="xl"
                titleStyle={styles.btnText}
                buttonStyle={styles.buttons}
                containerStyle={styles.btnContainer}
                onPress={() => {
                  navigation.navigate("BookletScreen", {
                    type: "AARTI_SANGRAH",
                    name: "देवी आरती संग्रह",
                    kind: "PDF",
                  });
                }}
              />
              <Button
                title={"अष्टक पुस्तिका 1"}
                size="xl"
                titleStyle={styles.btnText}
                buttonStyle={styles.buttons}
                containerStyle={styles.btnContainer}
                onPress={() => {
                  navigation.navigate("BookletScreen", {
                    type: "ASHTAK_PUSTIKA_1",
                    name: "अष्टक पुस्तिका 1",
                    kind: "IMG",
                  });
                }}
              />
              <Button
                title={"अष्टक पुस्तिका 2"}
                size="xl"
                titleStyle={styles.btnText}
                buttonStyle={styles.buttons}
                containerStyle={styles.btnContainer}
                onPress={() => {
                  navigation.navigate("BookletScreen", {
                    type: "ASHTAK_PUSTIKA_2",
                    name: "अष्टक पुस्तिका 2",
                    kind: "PDF",
                  });
                }}
              />
              <Button
                title={"काकड आरती"}
                size="xl"
                titleStyle={styles.btnText}
                buttonStyle={styles.buttons}
                containerStyle={styles.btnContainer}
                onPress={() => {
                  navigation.navigate("BookletScreen", {
                    type: "KAKAD_AARTI",
                    name: "काकड आरती",
                    kind: "PDF",
                  });
                }}
              />
              <Button
                title={"इतर PDF"}
                size="xl"
                titleStyle={styles.btnText}
                buttonStyle={styles.buttons}
                containerStyle={styles.btnContainer}
                onPress={() => {
                  navigation.navigate("BookletScreen", {
                    type: "OTHER_PDF",
                    name: "इतर PDF",
                    kind: "PDF",
                  });
                }}
              />
            </View>
          </View>
        </ScrollView>

        <View style={{ height: 30 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row", // inner items will be added vertically
              flexGrow: 1, // all the available vertical space will be occupied by it
              // justifyContent: "space-between",
              justifyContent: "center", //Centered horizontally
              alignItems: "center",
              backgroundColor: "#FFAF00",

              paddingHorizontal: normalize(15),
              // paddingVertical: normalize(13), // the culprit
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#FDFEFE",
                  fontSize: normalize(13),
                  fontWeight: "bold",
                }}
              >
                App by{" "}
                <Text
                  onPress={() =>
                    Linking.openURL("https://siddhesh.me").catch(console.log)
                  }
                  style={{ textDecorationLine: "underline" }}
                >
                  Siddhesh Nandurkar
                </Text>
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#F7F9F9",
                  textAlign: "right",
                  fontWeight: "normal",
                  fontSize: normalize(11),
                }}
              >
                build version {Constants.manifest.version}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "#DE3163",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 30,
  },
  btnContainer: {
    width: "72%",
    marginTop: 23,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default HomeScreen;
