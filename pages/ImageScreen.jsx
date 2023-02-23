import React from "react";
import { SafeAreaView, StyleSheet, View, Image, Text } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import { normalize } from "../utils";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
const bgColor = "#ECF0F1";

const ImageScreen = ({ route, navigation }) => {
  console.log(route.params.localUri);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"transparent"} translucent hidden />
      <View style={styles.container}>
        <WebView
          allowFileAccess={true}
          allowingReadAccessToURL={true}
          allowUniversalAccessFromFileURLs={true}
          allowFileAccessFromFileURLs={true}
          mixedContentMode={"always"}
          cacheEnabled={true}
          setSupportMultipleWindows={true}
          setJavaScriptCanOpenWindowsAutomatically={true}
          javaScriptCanOpenWindowsAutomatically={true}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onError={console.error.bind(console, "error")}
          originWhitelist={["*"]}
          style={styles.image}
          source={{
            html: `<html>
                      <body style="background-color:${bgColor};">
                        <img style="display:block; padding-top:${normalize(
                          7
                        )}px;"
                              src="${route.params.localUri}" width="100%"
                        />
                      </body>
                    </html>`,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor,
    flex: 1,
  },
});

export default ImageScreen;
