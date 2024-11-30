import React from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addSearchData } from '../redux/searchDataSlice';

const SearchInput = () => {

    const { Search } = Input;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSearch = (value) => {
        if (value !== '') {
            dispatch(addSearchData({ request: value, order: 'relevance', maxResults: 20 }))
            navigate('/searchResult')
        }
    };

    return (
        <div class='searchInput'>
            <p class='searchInput_title title'>Поиск видео</p>
            <div class='searchInput_input'>
                <Search
                    placeholder='введите текст поиска'
                    allowClear
                    enterButton='Найти'
                    size='large'
                    onSearch={onSearch}
                />
            </div>
        </div>
    )
}

export default SearchInput