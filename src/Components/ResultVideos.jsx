import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetVideos } from '../redux/videosSlice';
import iconTable_black from '../img/iconTable_black.png';
import iconList_grey from '../img/iconList_grey.png';
import iconList_black from '../img/iconList_black.png';
import iconTable_grey from '../img/iconTable_grey.png';
import ResultVideosList from './ResultVideosList';
import ResultVideosTable from './ResultVideosTable';

const ResultVideos = () => {
    const dispatch = useDispatch();
    const [tableView, setTableView] = useState(true);
    const [iconList, setIconList] = useState(iconList_grey);
    const [iconTable, setIconTable] = useState(iconTable_black);
    const { searchData } = useSelector(state => state.searchData);
    const { status, data } = useSelector(state => state.videos);
    useEffect(() => {
        dispatch(fetchGetVideos(searchData))
        setTableView(true)
    }, [searchData]);

    const changeTableView = () => {
        setTableView(true)
        setIconList(iconList_grey)
        setIconTable(iconTable_black)
    };

    const changeListView = () => {
        setTableView(false)
        setIconList(iconList_black)
        setIconTable(iconTable_grey)
    };

    return (
        <div class='resultList'>
            <div class='resultList_content'>
                <div class='resultList_header'>
                    <p class='resultList_title'>Видео по запросу "{searchData.request}"</p>
                    <div class='resultList_header-switcher'>
                        <img src={iconTable} alt='iconTable' onClick={() => changeTableView()} />
                        <img src={iconList} alt='iconList' onClick={() => changeListView()} />
                    </div>
                </div>
                {status === 'loading' && <p>Загрузка...</p>}
                {status === 'succeeded' &&
                    (tableView ? <ResultVideosTable data={data} /> : <ResultVideosList data={data} />)}
            </div>
        </div>
    )
}

export default ResultVideos