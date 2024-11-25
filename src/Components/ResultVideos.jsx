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
    const[tableView, setTableView]=useState(true);
   const[iconList, setIconList]=useState(iconList_grey);
   const[iconTable, setIconTable]=useState(iconTable_black);
    const { searchText } = useSelector(state => state.searchText);
    const { status, data } = useSelector(state => state.videos);
    const dispatch = useDispatch();
    useEffect(() => {
            dispatch(fetchGetVideos(searchText))
       
    }, [searchText]);
    console.log('status:', status);
    console.log('data:', data);
    console.log('tableView:', tableView);
    const changeTableView=()=>{
        setTableView(true)
        setIconList(iconList_grey)
        setIconTable(iconTable_black)
    }

    const changeListView=()=>{
        setTableView(false)
        setIconList(iconList_black)
        setIconTable(iconTable_grey)
    }
    
    return (
        <div class='resultList'>
            <div class='resultList_content'>
                <div class='resultList_header'>
                <p class='resultList_title'>Видео по запросу "{searchText}"</p>
                <div class='resultList_header-switcher'>
                    <img src={iconTable} alt='iconTable_activ' onClick={()=>changeTableView()}/>
                    <img src={iconList} alt='iconTable_activ' onClick={()=>changeListView()}/>
                </div>
                </div>
                {status === 'loading' && <p>Загрузка...</p>}
                {status === 'succeeded' &&
                tableView? <ResultVideosTable data={data}/> :<p>lll</p>}
                
            </div>
        </div>
    )
}

export default ResultVideos