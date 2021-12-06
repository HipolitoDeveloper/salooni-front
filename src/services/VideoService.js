import Parse from 'parse/react-native';
import {convertToObj} from '../pipe/conversor';
import {buildVideo, buildVideoList} from '../factory/Video';

const VideoObject = Parse.Object.extend('videos');

export const getAllVideos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const VideoQuery = new Parse.Query(VideoObject);
      VideoQuery.include('category_id');

      resolve(buildVideoList(convertToObj(await VideoQuery.find())));
    } catch (e) {
      console.error(`Video ${e}`);
      reject(`Video ${JSON.stringify(e)}`);
    }
  });
};

export const getVideoByRef = ref => {
  return new Promise(async (resolve, reject) => {
    try {
      const VideoQuery = new Parse.Query(VideoObject);
      VideoQuery.include('category_id');
      VideoQuery.equalTo('id_ref', ref);

      resolve(buildVideo(convertToObj(await VideoQuery.first())));
    } catch (e) {
      console.error(`Video ${e}`);
      reject(`Video ${JSON.stringify(e)}`);
    }
  });
};
