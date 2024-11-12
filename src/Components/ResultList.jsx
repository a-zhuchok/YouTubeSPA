import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetVideos } from '../redux/videosSlice';

const ResultList = () => {
    const { searchText } = useSelector(state => state.searchText);
    const { status, data } = useSelector(state => state.videos);
    const dispatch = useDispatch();
    useEffect(() => {
        if (searchText.length != 0) {
            dispatch(fetchGetVideos(searchText))
        }
    }, [searchText]);
    
    return (
        <div class='resultList'>
            <div class='resultList_content'>
                <p class='resultList_title'>Видео по запросу "{searchText}"</p>
                {status === 'loading' && <p>Загрузка...</p>}
                {status === 'succeeded' &&
                    <ul class='resultList_videos'>
                        {data.map((video) =>
                            <li class='resultList_video'>
                                <iframe width={300} src={"https://www.youtube.com/embed/" + video.id.videoId} allow="autoplay; encrypted-media" allowfullscreen></iframe>
                                <p class='resultList_video-title'>{video.snippet.title}</p>
                                <p class='resultList_video-channelTitle'>{video.snippet.channelTitle}</p>
                            </li>)}
                    </ul>}
            </div>
        </div>
    )
}

export default ResultList
