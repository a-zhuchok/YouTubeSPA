import React, { useEffect } from 'react';
import { Input, Tooltip, Button } from 'antd';
import icon_like from '../img/icon_like.png';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchText } from '../redux/searchTextSlice';
import { addFavorites } from '../redux/favoritesSlice';
import { useNavigate } from 'react-router-dom';

const SearchResultInput = () => {
    const { searchText } = useSelector(state => state.searchText);
    const { favorites } = useSelector(state => state.favorites);
    const navigate = useNavigate();
    useEffect(()=>{
        if(searchText ===''){
            navigate('/search')
        } 
    }, [searchText])
    const { Search } = Input;
    const dispatch = useDispatch();
    const onSearch = (value) => {
        dispatch(addSearchText(value))
    };
    const elect = () => {
        dispatch(addFavorites(searchText))
    };
   
    return (
        <div class='searchResultInput'>
            <div class='searchResultInput_content'>
                <p class='searchResultInput_title title'>Поиск видео</p>
                <div class='searchResultInput_input'>
                    <Search
                        placeholder="введите текст поиска"
                        defaultValue={searchText}
                        allowClear
                        enterButton="Найти"
                        size="large"
                        onSearch={onSearch}
                        suffix={
                            <Tooltip title="Сохранить запрос">
                                <img src={icon_like} width={28} onClick={elect}/>
                            </Tooltip>}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchResultInput