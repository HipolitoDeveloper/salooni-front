import Parse from "parse/react-native";
import { convertToObj } from "../common/converters/GenericConverter";
import { buildVideo, buildVideoList } from "../factory/VideoFactory";

const VideoObject = Parse.Object.extend("videos");

export const getAllVideos = async () => {
  const VideoQuery = new Parse.Query(VideoObject);
  VideoQuery.include("category_id");

  try {
    const videos = await VideoQuery.find();
    return buildVideoList(convertToObj(videos));
  } catch (e) {
    throw e;
  }
};

export const getVideoByRef = async ref => {
  const VideoQuery = new Parse.Query(VideoObject);
  VideoQuery.include("category_id");
  VideoQuery.equalTo("id_ref", ref);

  try {
    const video = await VideoQuery.first();
    return buildVideo(convertToObj(video))
  } catch (e) {
    throw e;
  }
};
