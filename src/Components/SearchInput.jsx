import React, { useState } from 'react';
import { Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetVideos } from '../redux/videosSlice';
import { useNavigate } from 'react-router-dom';
import { addSearchText } from '../redux/searchTextSlice';

const SearchInput = () => {
    const { Search } = Input;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSearch = (value) => {
        dispatch(addSearchText(value))
        dispatch(fetchGetVideos(value))
        navigate('/searchResult')
    };

    return (
        <div class='searchInput'>
            <p class='searchInput_title title'>Поиск видео</p>
            <div class='searchInput_input'>
                <Search
                    placeholder="введите текст поиска"
                    allowClear
                    enterButton="Найти"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
        </div>
    )
}

export default SearchInput