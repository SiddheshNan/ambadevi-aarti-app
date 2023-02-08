import { Dimensions, Platform, PixelRatio, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import Fuse from "fuse.js";
import aartiSangrahMap from "./mappings/aarti-sangrah/map.json";
import ashtakPustika1Map from "./mappings/ashtak-pustika-1/map.json";
import ashtakPustika2Map from "./mappings/ashtak-pustika-2/map.json";
import kakadAartiMap from "./mappings/kakad-aarti/map.json";
import * as aartiSangrahFiles from "./mappings/aarti-sangrah/file-imports";
import * as kakadAartiFiles from "./mappings/kakad-aarti/file-imports";
import * as ashtakPustika1Files from "./mappings/ashtak-pustika-1/file-imports";
import * as ashtakPustika2Files from "./mappings/ashtak-pustika-2/file-imports";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const scale = SCREEN_WIDTH / 320; // based on iphone 5s's scale

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
        // there could be other pdf viewers other than default drive pdf reader
      }
    );

    goBack();

    if (result.resultCode != 0) {
      throw "Error opening file";
    }
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
    includeMatches: true,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.5,
    // distance: 200,
    // useExtendedSearch: false,
    // ignoreLocation: true,
    // ignoreFieldNorm: true,
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
  ASHTAK_PUSTIKA_1: {
    BOOKLET: ashtakPustika1Map,
    SEARCH: fuzzySearch(ashtakPustika1Map),
    GETFILE: (num) => {
      return ashtakPustika1Files[`ashtakPustika${num}`];
    },
  },
  ASHTAK_PUSTIKA_2: {
    BOOKLET: ashtakPustika2Map,
    SEARCH: fuzzySearch(ashtakPustika2Map),
    GETFILE: (num) => {
      return ashtakPustika2Files[`ashtakPustika${num}`];
    },
  },
  KAKAD_AARTI: {
    BOOKLET: kakadAartiMap,
    SEARCH: fuzzySearch(kakadAartiMap),
    GETFILE: (num) => {
      return kakadAartiFiles[`kakadAarti${num}`];
    },
  },

  // GLOBAL: {
  //   BOOKLET: [
  //     ...aartiSangrahMap.map((item) => {
  //       return {
  //         ...item,
  //         name: `आरती - ${item.name}`,
  //         type: "AARTI_SANGRAH",
  //       };
  //     }),
  //     ashtakPustika1Map.map((item) => {
  //       return {
  //         ...item,
  //         name: `अष्टक पुस्तिका 1 - ${item.name}`,
  //         type: "ASHTAK_PUSTIKA_1",
  //       };
  //     }),
  //     ashtakPustika2Map.map((item) => {
  //       return {
  //         ...item,
  //         name: `अष्टक पुस्तिका 2 - ${item.name}`,
  //         type: "ASHTAK_PUSTIKA_2",
  //       };
  //     }),
  //     ...kakadAartiMap.map((item) => {
  //       return {
  //         ...item,
  //         name: `काकड आरती - ${item.name}`,
  //         type: "KAKAD_AARTI",
  //       };
  //     }),
  //   ],
  //   SEARCH: fuzzySearch([
  //     ...aartiSangrahMap.map((item) => {
  //       return {
  //         ...item,
  //         name: `आरती - ${item.name}`,
  //         type: "AARTI_SANGRAH",
  //       };
  //     }),
  //     ...ashtakPustika1Map.map((item) => {
  //       return {
  //         ...item,
  //         name: `अष्टक पुस्तिका 1 - ${item.name}`,
  //         type: "ASHTAK_PUSTIKA_1",
  //       };
  //     }),
  //     ...ashtakPustika2Map.map((item) => {
  //       return {
  //         ...item,
  //         name: `अष्टक पुस्तिका 2 - ${item.name}`,
  //         type: "ASHTAK_PUSTIKA_2",
  //       };
  //     }),
  //     ...kakadAartiMap.map((item) => {
  //       return {
  //         ...item,
  //         name: `काकड आरती - ${item.name}`,
  //         type: "KAKAD_AARTI",
  //       };
  //     }),
  //   ]),
  //   GETFILE: (type, num) => {
  //     switch (type) {
  //       case "AARTI_SANGRAH":
  //         return aartiSangrahFiles[`aartiSangrah${num}`];
  //       case "ASHTAK_PUSTIKA_1":
  //         return ashtakPustika1Files[`ashtakPustika${num}`];
  //       case "ASHTAK_PUSTIKA_2":
  //         return ashtakPustika2Files[`ashtakPustika${num}`];
  //       case "KAKAD_AARTI":
  //         return kakadAartiFiles[`kakadAarti${num}`];
  //       default:
  //         return null;
  //     }
  //   },
  // },
};

export const hasNumber = (myString) => {
  return /\d/.test(myString);
};
