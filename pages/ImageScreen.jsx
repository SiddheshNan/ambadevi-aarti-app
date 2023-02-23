import React from "react";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import { WebView } from "react-native-webview";

const ImageScreen = ({ route, navigation }) => {
  const images = Image.resolveAssetSource(route.params.imgFile).uri;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <WebView
          source={{
            html: `<html>
                      <body>
                          <br/>
                          <img src="${images}" width="100%" />
                        </div> 
                      </body>
                    </html>`,
          }}
          originWhitelist={["*"]}
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    marginTop: 25,
  },
});

export default ImageScreen;
