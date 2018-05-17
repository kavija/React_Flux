import { EventEmitter } from "events";
import YTSearch from 'youtube-api-search'; //This module would search on Youtube
import dispatcher from "../dispatcher";
import 'babel-polyfill';

//const(constant) is part of ES6
const API_KEY = 'Youtube-API-Key'; //youtube API Key

class VideoStore extends EventEmitter {
  self = this;    

  constructor() {
    super();
    self.searchVideos = [];
    self.trendingVideos = [];
    self.recommendedVideos = [];
    self.recentlyuploadedVideos = [];
    this.initializeVideos('SharePoint', 'trending');
    this.initializeVideos('React JS', 'recommended');
    this.initializeVideos('Angular JS', 'recent');
  }

  initializeVideos(term, targetContainer) {
    YTSearch({key: API_KEY, term}, (videos) => {
      //Replace the videos in the store
      // self.homeVideos = videos;
      targetContainer == 'trending'? self.trendingVideos = videos 
        : targetContainer == 'recommended' ? self.recommendedVideos = videos 
        : self.recentlyuploadedVideos = videos;
      //notify that videos are in the store is changed
      //similar to input change event
      this.emit("loaded");
    });
  }

  getVideos(targetContainer) {
    return targetContainer == 'trending'? self.trendingVideos 
    : targetContainer == 'recommended' ? self.recommendedVideos 
    : self.recentlyuploadedVideos;
  }

  getRecommendedVideos() {
    return self.recommendedVideos;
  }

  getRecentVideos() {
    return self.recentlyuploadedVideos;
  }

  setSearchVideos(term) {
    YTSearch({key: API_KEY, term}, (videos) => {
      //Replace the videos in the store
      self.searchVideos = videos;

      //notify that videos are in the store is changed
      //similar to input change event
      this.emit("change");
    });
  }

  replaceVideos(term) {
    this.setSearchVideos(term);
  }

  getSearchVideos() {
    return self.searchVideos;
  }

  //whenever dispatcher sends the event/action
  //the below function is called
  //function would take the appropriate action based on the action type
  handleActions(action) {
    switch(action.type) {
      case "UPDATE_TERM": {
        this.replaceVideos(action.term);
        break;
      }
    }
  }
}

const videoStore = new VideoStore;

//which method should the dispatcher call to notify
dispatcher.register(videoStore.handleActions.bind(videoStore));
// window.videoStore = videoStore;
// window.dispatcher = dispatcher; //dispatcher.dispatch({type: 'something'});
export default videoStore;
