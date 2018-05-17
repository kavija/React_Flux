import React, { Component } from 'react';  //React module is imported.
import { IndexLink, Link, Redirect } from "react-router";//IndexLink, Link modules are imported. 
import ReactDOM from 'react-dom'; //React-Dom is required to include the "App" on index.html
// import { Redirect } from "react-router-dom";//Redirect module is imported. 
import SearchBar from '../components/Search/search_bar';//Import the SearchBar component from ./components/search_bar.js
import HomeList from '../components/Search/video_list_home';//Import the Video List component from ./components/video_list.js
import YTSearch from 'youtube-api-search'; //This module would search on Youtube
import _ from 'lodash'; //Usually _ is used to refer lodash
import VideoStore from '../store/videostore';
import * as HomeActions from "../actions/homeActions";
import HomeVideos from "../components/Home/HomeVideos";

//const(constant) is part of ES6
const API_KEY = 'Youtube-API-Key'; //youtube API Key

export default class Home extends Component {
    constructor(props) {
        super(props);
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
                <HomeVideos 
                    history= {this.props.history}
                    term='trending'
                    header='Trending'/>
                <HomeVideos 
                    history= {this.props.history}
                    term='recommended'
                    header='Recommended'/>
                <HomeVideos 
                    history= {this.props.history}
                    term='recent'
                    header='Recently Uploaded'/>                    
            </div>

        );
    }
 }
