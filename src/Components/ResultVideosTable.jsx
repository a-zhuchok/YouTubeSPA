import React from 'react';

const ResultVideosTable = ({data}) => {
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
        <div class='resultVideosTable'>
                
                    <ul class='resultVideosTable_videos'>
                        
                        {data.map((video) =>
                            <li class='resultVideosTable_video'>
                                <iframe width={300} src={"https://www.youtube.com/embed/" + video.id.videoId} allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                <p class='resultVideosTable_video-title'>{video.snippet.title}</p>
                                <p class='resultVideosTable_video-channelTitle'>{video.snippet.channelTitle}</p>
                                <p class='resultVideosTable_video-viewCount'>{formatViewsCount(video.viewCount)}</p>
                               
                            </li>)}
                
                    </ul>
        </div>
    )
}

export default ResultVideosTable