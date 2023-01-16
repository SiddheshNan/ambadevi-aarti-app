import { Dimensions, Platform, PixelRatio, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import aartiSangrahMap from "./mappings/aarti-sangrah/map";
import kakadAartiMap from "./mappings/kakad-aarti/map";
import Fuse from "fuse.js";
import * as aartiSangrahFiles from "./mappings/aarti-sangrah/file-imports";
import * as kakadAartiFiles from "./mappings/kakad-aarti/file-imports";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export const openPDF = async (file, goBack = () => {}) => {
  try {
    const localFile = await file.downloadAsync();
    const cUri = await FileSystem.getContentUriAsync(localFile.localUri);

    const result = await IntentLauncher.startActivityAsync(
      "android.intent.action.VIEW",
      {
        data: cUri,
        flags: 1,
        type: "application/pdf",
        // packageName: "com.google.android.apps.docs",
      }
    );

    goBack();

    if (result.resultCode != 0) {
      throw "Error opening file";
    }

    //  Alert.alert("", `${cUri} \n ${newFile.localUri}`, [
    //   {
    //     text: 'ok',
    //     onPress: () => {},
    //   },
    // ]);
  } catch (error) {
    console.log(error);
    Alert.alert("Error", "Somthing went wrong...", [
      {
        text: "Okay",
        onPress: () => {},
      },
    ]);
  }
};

export const fuzzySearch = (list) => {
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.3,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["search_txt"],
  };
  const fuse = new Fuse(list, options);
  return fuse;
};

export const fileMap = {
  AARTI_SANGRAH: {
    BOOKLET: aartiSangrahMap,
    SEARCH: fuzzySearch(aartiSangrahMap),
    GETFILE: (num) => {
      return aartiSangrahFiles[`aartiSangrah${num}`];
    },
  },
  ASHTAK_PUSTIKA_1: [],
  ASHTAK_PUSTIKA_2: [],
  KAKAD_AARTI: {
    BOOKLET: kakadAartiMap,
    SEARCH: fuzzySearch(kakadAartiMap),
    GETFILE: (num) => {
      return kakadAartiFiles[`kakadAarti${num}`];
    },
  },

  GLOBAL: {
    BOOKLET: [
      ...aartiSangrahMap.map((item) => {
        return {
          ...item,
          name: `आरती - ${item.name}`,
          type: "AARTI_SANGRAH",
        };
      }),
      ...kakadAartiMap.map((item) => {
        return {
          ...item,
          name: `काकड आरती - ${item.name}`,
          type: "KAKAD_AARTI",
        };
      }),
    ],
    SEARCH: fuzzySearch([
      ...aartiSangrahMap.map((item) => {
        return {
          ...item,
          name: `आरती - ${item.name}`,
          type: "AARTI_SANGRAH",
        };
      }),
      ...kakadAartiMap.map((item) => {
        return {
          ...item,
          name: `काकड आरती - ${item.name}`,
          type: "KAKAD_AARTI",
        };
      }),
    ]),
    GETFILE: (type, num) => {
      switch (type) {
        case "AARTI_SANGRAH":
          return aartiSangrahFiles[`aartiSangrah${num}`];
        case "KAKAD_AARTI":
          return kakadAartiFiles[`kakadAarti${num}`];
        default:
          return null;
      }
    },
  },
};

export const hasNumber = (myString) => {
  return /\d/.test(myString);
};
