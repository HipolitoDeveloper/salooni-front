export const buildVideoList = videos => {
  let categories = [];
  let categoryName = '';

  videos.forEach(video => {
    switch (video.category_id.name) {
      case 'employee':
        categoryName = 'Parceiro';
        break;
      case 'general':
        categoryName = 'Geral';
        break;
      case 'signup':
        categoryName = 'Cadastro';
        break;
      case 'profile':
        categoryName = 'Perfil';
        break;
      case 'schedule':
        categoryName = 'Agendamento';
        break;
      case 'client':
        categoryName = 'Cliente';
        break;
      case 'procedure':
        categoryName = 'Procedimento';
        break;
    }

    if (categories.length === 0) {
      categories.push({
        id: video.category_id.objectId,
        category: video.category_id.name,
        categoryName: categoryName,
        items: [],
      });
    } else if (
      !categories.some(category => category.id === video.category_id.objectId)
    ) {
      categories.push({
        id: video.category_id.objectId,
        category: video.category_id.name,
        categoryName: categoryName,
        items: [],
      });
    }
  });


  categories.forEach(({category, items, idRef}) => {
    videos.forEach(video => {
      if (category === video.category_id.name && video.id_ref !== 'PAB') {
        items.push({
          url: video.video.url,
          name: video.name,
          category: video.category_id.name,
          description: video.description,
          idRef: video.id_ref,
        });
      }
    });
  });

  return categories;
};

export const buildVideo = video => {
  return {
    url: video.video.url,
    name: video.name,
    category: video.category_id.name,
    description: video.description,
    idRef: video.id_ref,
  };
};
