const API_KEY = '38c007f28d5b66f36b9c3cf8d8452a4b';
const API_BASE = 'https://api.themoviedb.org/3';


const compileParams = (params) => {
  const full_params = {
    ...params,
    api_key: API_KEY,
    language: 'pt-Br'
  };
  return Object.keys(full_params).map(k => `${k}=${full_params[k]}`).join('&');
}

const basicFetch = async (endpoint, params = {}) => {
  const compiled_params = compileParams(params);
  const req = await fetch(`${API_BASE}${endpoint}?${compiled_params}`);
  const json = req.json();
  return json;
}

export default {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        list: await basicFetch('/discover/tv', { with_network: 213 })
      },
      {
        slug: 'trending',
        title: 'Recomendados pra Você',
        list: await basicFetch('/trending/all/week')
      },
      {
        slug: 'toprated',
        title: 'Em Alta',
        list: await basicFetch('/movie/top_rated')
      },
      {
        slug: 'action',
        title: 'Ação',
        list: await basicFetch('/discover/movie', { with_genres: 28 })
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        list: await basicFetch('/discover/movie', { with_genres: 35 })
      },
      {
        slug: 'horror',
        title: 'Terror',
        list: await basicFetch('/discover/movie', { with_genres: 27 })
      },
      {
        slug: 'romance',
        title: 'Romance',
        list: await basicFetch('/discover/movie', { with_genres: 10749 })
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        list: await basicFetch('/discover/movie', { with_genres: 99 })
      },
    ]
  },
  getMediaInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      switch (type) {
        case 'movie':
          info = await basicFetch(`/movie/${movieId}`);
          break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}`);
          break;
        default: info = null;
      }
    }

    return info;
  }
}