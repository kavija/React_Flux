import React, { Component } from 'react';  //React module is imported.
import HomeList from '../../components/Search/video_list_home';//Import the Video List component from ./components/video_list.js
import VideoStore from '../../store/videostore';
import videoStore from '../../store/videostore';

export default class HomeVideos extends Component {
    constructor(props) {
        super(props);

        this.state= {
            // when the component reloads
            // it should get the stored videos from the store
            videos: VideoStore.getVideos(this.props.term)
        };

        this.loadVideos = this.loadVideos.bind(this);
    }

    //when the video is selected 
    //it should redirect us to the detailed page
    videoSelect(selectedVideo) {
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
        VideoStore.on("loaded", this.loadVideos);
        // console.log('listener is registered');
    }

    //unregister the listener to avoid memory leaks
    componentWillUnmount() {
        VideoStore.removeListener("loaded", this.loadVideos);
        // console.log('listener is unregistered');
    }

    loadVideos() {
        this.setState({videos:  VideoStore.getVideos(this.props.term)});
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
                <div>
                    <h1>
                        {this.props.header}
                    </h1>
                    <HomeList
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
            </div>
        );
    }
 }