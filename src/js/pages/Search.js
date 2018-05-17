import React, { Component } from 'react';  //React module is imported.
import { IndexLink, Link, Redirect } from "react-router";//IndexLink, Link modules are imported. 
import ReactDOM from 'react-dom'; //React-Dom is required to include the "App" on index.html
// import { Redirect } from "react-router-dom";//Redirect module is imported. 
import SearchBar from '../components/Search/search_bar';//Import the SearchBar component from ./components/search_bar.js
import VideoList from '../components/Search/video_list_search';//Import the Video List component from ./components/video_list.js
import YTSearch from 'youtube-api-search'; //This module would search on Youtube
import _ from 'lodash'; //Usually _ is used to refer lodash
import VideoStore from '../store/videostore';
import * as HomeActions from "../actions/homeActions";

//const(constant) is part of ES6
const API_KEY = 'Youtube-API-Key'; //youtube API Key

export default class Search extends Component {
    constructor(props) {
        super(props);
      
        // this.state = { 
        //     videos: [], //{ videos: ''} is an object with term as property
        //     selectedVideo: null
        //     // ,toDetailed: false
        // };

        // this.videoSearch('surfboards');

        this.state= {
            videos:  VideoStore.getSearchVideos(),//It equals to this.setState({videos: videos});
            selectedVideo : VideoStore.getSearchVideos()[0]//Result of the first item is considered as selected Video
        };

        this.setSearchVideos = this.setSearchVideos.bind(this);
    }

    //function that performs search
    videoSearch(term) {
        //YTSearch({key: API_KEY, term: 'searchKeyword'}, (videos) => {
        // YTSearch({key: API_KEY, term}, (videos) => {
        //     this.setState({
        //         videos: videos,//It equals to this.setState({videos: videos});
        //         selectedVideo : videos[0]//Result of the first item is considered as selected Video
        //     });

        //     //Replace the videos in the store
        //     VideoStore.replaceVideos(term);
        // });

        // VideoStore.replaceVideos(term);

        //Home action would call the dispatcher
        //dispatcher would dispatch the action
        //action is handled in the store
        HomeActions.updateTerm(term);
    }

    videoSelect(selectedVideo) {
        this.setState({selectedVideo});
        // this.setState({selectedVideo: selectedVideo, toDetailed:true});
        // console.log(this.state.toDetailed);
        // browserHistory.push('/detailed');
        this.props.history.push({
            pathname: "/detailed",
            state: { selectedVideo }
        });
    }

    //it is kind of init event 
    //called before render method
    componentWillMount() {
        //similar to attaching an event to button click
        //whenever the videostore is changed, it sets the state
        VideoStore.on("change", this.setSearchVideos);
        // console.log('listener is registered');
    }

    //unregister the listener to avoid memory leaks
    componentWillUnmount() {
        VideoStore.removeListener("change", this.setSearchVideos);
        // console.log('listener is unregistered');
    }

    setSearchVideos() {
        this.setState({videos:  VideoStore.getSearchVideos()});
    }

    render() {
        // if(this.state.toDetailed === true) {
        //     console.log("Inside redirect");
        //     <Redirect to="/detailed"/>
        // }

        //We do not to search everytime user changes something on the search bar
        //Instead we want to search only every 300 milliseconds
        //Here is where we use lodash
        //Lets debounce function as shown below 
        //debounce accepts the function and set it call only after XXXmillseconds
        // const videoSearch =_.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar
                    //onSearchTermChange is a property of  SearchBar
                    //onSearchTermChange acts a delegate function that would point the anonymous function
                    //anonymous function would accept the term and invoke the videoSearch function
                    //This process is called "Callback" where child or its child would notify the parent
                // onSearchTermChange={term => this.videoSearch(term)} 
                    // onSearchTermChange={videoSearch} 
                    // onSearchTermChange={VideoStore.replaceVideos} 
                    /> 
                <VideoList
                    //onVideoSelect is a property of VideoList
                    //onVideoSelect acts a delegate function that would point the anonymous function
                    //anonymous function would accept the video and set it as selectedVideo
                    //In short, onVideoSelect function which would update the selectedVideo
                    //VideoList would pass the onVideoSelect property to its child - VideoListItem
                    //VideoListItem would invoke the onVideoSelect event when a list item is selected
                    //This process is called "Callback" where child or its child would notify the parent
                    onVideoSelect={selectedVideo => this.videoSelect(selectedVideo)}
                    videos={this.state.videos} />{/* passing state is called props */}
            </div>
        );
    }
 }
