import Parse from 'parse/react-native';
import {convertToObj} from '../pipe/conversor';
import {buildVideoList} from '../factory/Video';

const VideoObject = Parse.Object.extend('videos');
const VideoQuery = new Parse.Query(VideoObject);

export const getAllVideos = () => {
  return new Promise(async (resolve, reject) => {
    try {
      VideoQuery.include('category_id');

      resolve(buildVideoList(convertToObj(await VideoQuery.find())));
    } catch (e) {
      console.error(`Video ${e}`);
      reject(`Video ${JSON.stringify(e)}`);
    }
  });
};
