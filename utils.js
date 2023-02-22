import { Dimensions, Platform, PixelRatio, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import Fuse from "fuse.js";
import aartiSangrahMap from "./mappings/aarti-sangrah/map.json";
import ashtakPustika1Map from "./mappings/ashtak-pustika-1/map.json";
import ashtakPustika2Map from "./mappings/ashtak-pustika-2/map.json";
import kakadAartiMap from "./mappings/kakad-aarti/map.json";
import otherPDFMap from "./mappings/other-pdf/map.json";

import * as aartiSangrahFiles from "./mappings/aarti-sangrah/file-imports";
import * as kakadAartiFiles from "./mappings/kakad-aarti/file-imports";
import * as ashtakPustika1Files from "./mappings/ashtak-pustika-1/file-imports";
import * as ashtakPustika2Files from "./mappings/ashtak-pustika-2/file-imports";
import * as otherPDFFiles from "./mappings/other-pdf/file-imports";

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

export const openFile = async (file, contentType) => {
  try {
    const localFile = await file.downloadAsync();
    const cUri = await FileSystem.getContentUriAsync(localFile.localUri);

    const result = await IntentLauncher.startActivityAsync(
      "android.intent.action.VIEW",
      {
        data: cUri,
        flags: 1,
        type: contentType,
      }
    );

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
      return ashtakPustika1Files[`ashtakPustika1_${num}`];
    },
  },
  ASHTAK_PUSTIKA_2: {
    BOOKLET: ashtakPustika2Map,
    SEARCH: fuzzySearch(ashtakPustika2Map),
    GETFILE: (num) => {
      return ashtakPustika2Files[`ashtakPustika2_${num}`];
    },
  },
  KAKAD_AARTI: {
    BOOKLET: kakadAartiMap,
    SEARCH: fuzzySearch(kakadAartiMap),
    GETFILE: (num) => {
      return kakadAartiFiles[`kakadAarti${num}`];
    },
  },
  OTHER_PDF: {
    BOOKLET: otherPDFMap,
    SEARCH: fuzzySearch(otherPDFMap),
    GETFILE: (num) => {
      return otherPDFFiles[`otherPDF${num}`];
    },
  },
};

export const hasNumber = (myString) => {
  return /\d/.test(myString);
};
