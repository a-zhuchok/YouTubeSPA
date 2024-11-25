import React from 'react';

const ResultVideosList = ({data}) => {
    
        const formatViewsCount = (count) => {
            if (count >= 1e6) {
                return (count / 1e6).toFixed(1).replace(/\.0$/, '') + ' млн просмотров'; 
            }
            if (count >= 1e3) {
                return (count / 1e3).toFixed(1).replace(/\.0$/, '') + ' тыс просмотров'; 
            }
            return count + ' просмотров'; 
        };
 
    return (
        <div class='resultVideosList'>
                    <ul class='resultVideosList_videos'>
                        
                        {data.map((video) =>
                            <li class='resultVideosList_video'>
                                <div class='resultVideosList_video-video'>
                                <iframe width={300} src={"https://www.youtube.com/embed/" + video.id.videoId} allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                </div>
                                <div class='resultVideosList_video-video'>
                                <p class='resultVideosList_video-title'>{video.snippet.title}</p>
                                <p class='resultVideosList_video-channelTitle'>{video.snippet.channelTitle}</p>
                                <p class='resultVideosList_video-viewCount'>{formatViewsCount(video.viewCount)}</p>
                                </div>
                            </li>)}
                    </ul>
        </div>
    )
}

export default ResultVideosList
