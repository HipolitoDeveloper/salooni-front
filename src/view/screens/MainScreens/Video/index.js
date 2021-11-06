import React, {useContext, useState} from 'react';
import {Text} from 'react-native';
import CollapsableList from '../../../components/small/CollapsableList';
import {useNavigation} from '@react-navigation/native';
import {getAllVideos} from '../../../../services/VideoService';

const Video = () => {
  const navigate = useNavigation();
  const [videos, setVideos] = useState([]);

  navigate.addListener('focus', () => {
    const getVideos = async () => {
      setVideos(await getAllVideos());
      console.log('videos', videos);
    };

    getVideos();
  });

  return (
    <>
      <CollapsableList items={videos} />
    </>
  );
};

export default Video;
