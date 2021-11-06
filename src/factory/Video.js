export const buildVideoList = videos => {
  return videos.map(video => {
    return {
      url: video.video.url,
      name: video.name,
      category: video.category_id.name,
    };
  });
};
