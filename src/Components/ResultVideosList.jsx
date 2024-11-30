import React from 'react';

const ResultVideosList = ({ data }) => {
    const formatViewsCount = (count) => {
        if (count >= 1e6) {
            return (count / 1e6).toFixed(1).replace(/\.0$/, '') + ' млн просмотров'
        }
        if (count >= 1e3) {
            return (count / 1e3).toFixed(1).replace(/\.0$/, '') + ' тыс просмотров'
        }
        return count + ' просмотров'
    };
    
    return (
        <div>
            <ul class='resultVideosList'>
                {data.map((video) =>
                    <li class='resultVideosList_video'>
                        <iframe width={300} src={'https://www.youtube.com/embed/' + video.id.videoId} allow='autoplay; encrypted-media' allowfullscreen></iframe>
                        <div class='resultVideosList_text'>
                            <p class='videoTitle'>{video.snippet.title}</p>
                            <p class='videoChannelTitle'>{video.snippet.channelTitle}</p>
                            <p class='videoViewCount'>{formatViewsCount(video.viewCount)}</p>
                        </div>
                    </li>)}
            </ul>
        </div>
    )
}

export default ResultVideosList