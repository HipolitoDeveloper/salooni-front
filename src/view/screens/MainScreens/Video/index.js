import React, {useContext, useState} from 'react';
import {FlatList, Text} from 'react-native';
import CollapsableList from '../../../components/small/CollapsableList';
import {useNavigation} from '@react-navigation/native';
import {getAllVideos} from '../../../../services/VideoService';
import global from '../../../../common/global';
import Loading from '../../../components/small/Loading';

const Video = () => {
  const navigate = useNavigation();
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  navigate.addListener('focus', () => {
    setIsLoading(true);
    const getVideos = async () => {
      getAllVideos().then(
        videoList => {
          setVideoList(videoList);
          setIsLoading(false);
        },
        error => {
          console.error(error);
          setIsLoading(false);
        },
      );
    };

    getVideos();
  });

  return (
    <>
      <FlatList
        data={videoList}
        keyExtractor={item => item.categoryName}
        renderItem={({item}) => (
          <CollapsableList
            items={item.items}
            categoryName={item.categoryName}
          />
        )}
      />

      <Loading isLoading={isLoading} color={`${global.colors.purpleColor}`} />
    </>
  );
};

export default Video;
