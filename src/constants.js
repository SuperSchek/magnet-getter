const constants = {
  defaultOptions: {
    port: 5001,
    databaseFile: "./db/db.json",
    routesPrefix: "/api/magnet-getter",
    routes: {
      queryImdb: "/search",
      getSeasons: "/tv/seasons",
      getAllEpisodes: "/tv/episodes/all",
      getEpisodesForSeason: "/tv/episodes/season",
      getMostRecentEpisode: "/tv/episodes/latest",
      getAllReleasedEpisodes: "/tv/episodes/released",
      getUpcomingEpisode: "/tv/episodes/upcoming",
    },
    rules: {
      common: {
        minSeeders: 5,
      },
      movies: {
        minFileSize: 1500,
        maxFileSize: 10000,
      },
      tvShows: {
        minFileSize: 900,
        maxFileSize: 2500,
      },
    },
  },
};

module.exports = constants;
