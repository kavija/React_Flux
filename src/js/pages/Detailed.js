import React, { Component } from 'react';  //React module is imported.
import { IndexLink, Link } from "react-router";//IndexLink, Link modules are imported. 
import ReactDOM from 'react-dom'; //React-Dom is required to include the "App" on index.html
import VideoDetail from '../components/Search/video_detail';//Import the Video Detail component from ./components/video_detail.js
import RelatedVideos from '../components/Search/video_related';//Import the Video Detail component from ./components/video_detail.js
import SearchBar from '../components/Search/search_bar';//Import the SearchBar component from ./components/search_bar.js

//const(constant) is part of ES6
const API_KEY = 'AIzaSyCPCtBSZuB49F1-9Xt3DBS6PhePkm5j50E'; //youtube API Key

export default class Detailed extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            videos: [], //{ videos: ''} is an object with term as property
            // set the selectedVideo property based on this.props.location.state
            selectedVideo: this.props.location.state.selectedVideo
        };

        this.loadRelatedVideos(this.state.selectedVideo);
    }

    loadRelatedVideos(selectedVideo) {
        var searchString = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=date&relatedToVideoId=' + this.state.selectedVideo.id.videoId + '&type=video&key=' + API_KEY;
        fetch(searchString)
        .then(results => {
            return results.json();
        })
        .then(data => {
            this.setState({selectedVideo, videos : data.items});
        });
    }

    render() {
        return (
            <div>
                <SearchBar/> 
                <VideoDetail video={this.state.selectedVideo} />
                <RelatedVideos
                    onVideoSelect={selectedVideo => this.loadRelatedVideos(selectedVideo)}
                    videos={this.state.videos} />{/* passing state is called props */}
            </div>
        );
    }
 }