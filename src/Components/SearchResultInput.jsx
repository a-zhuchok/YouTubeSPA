import React, { useState, useEffect } from 'react';
import { Input, Tooltip, Button } from 'antd';
import icon_like from '../img/icon_like.png';
import icon_like_saved from '../img/icon_like_saved.png';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchText } from '../redux/searchTextSlice';
import { fetchAddFavorites } from '../redux/favoritesSlice';
import SaveModal from './SaveModal';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const SearchResultInput = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { searchText } = useSelector(state => state.searchText);
    const [open, setOpen] = useState(false);
    const [icon, setIcon] = useState(icon_like);
    const [selectedValue, setSelectedValue] = useState("relevance");
    const [inputValue, setInputValue] = useState(20);
    const [iconTitle, setIconTitle] = useState('');
    const [title, setTitle]=useState('')

    localStorage.setItem('searchText', searchText)
   
    

    const handleSearch = (value) => { //искать запрос
        if(value.length!==0){
            dispatch(addSearchText(value));
            
        }
        else {
            navigate('/search')
        }
        setIcon(icon_like)
        setIconTitle('Сохранить запрос')
    };

    const handleModalOpen = (icon) => { //открыть модальное
        icon===icon_like?setOpen(true):setOpen(false) 
    };

    const handleModalClose = () => { //закрыть модальное
        setOpen(false);
        setInputValue(20);
        setSelectedValue("relevance");
        setTitle('')
    };

    const handleFormFinish = (values) => { //добавить в избранное
        const formValues = { ...values, maxResults: inputValue, request: searchText };
        const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${formValues.maxResults}&order=${formValues.select}&q=${formValues.request}&type=video&key=YOUR_API_KEY`;
        dispatch(fetchAddFavorites(url + '*' + formValues.title));
        handleModalClose();
        setIcon(icon_like_saved);
        setIconTitle('Поиск сохранён в избранных')
    };

    const handleFormFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='searchResultInput'>
            <div className='searchResultInput_content'>
                <p className='searchResultInput_title title'>Поиск видео</p>
                <div className='searchResultInput_input'>
                    <Search
                        placeholder="Введите текст поиска"
                        defaultValue={searchText}
                        allowClear
                        enterButton="Найти"
                        size="large"
                        onSearch={handleSearch}
                        suffix={
                            <Tooltip title={iconTitle} placement="top">
                                <img src={icon} alt="Save" width={28} onClick={()=>handleModalOpen(icon)} />
                            </Tooltip>
                        }
                    />
                </div>

                <SaveModal
                    visible={open}
                    onClose={handleModalClose}
                    onFinish={handleFormFinish}
                    onFinishFailed={handleFormFinishFailed}
                    searchText={searchText}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    title={title}
                    setTitle={setTitle} 
                />
            </div>
        </div>
    );
};

export default SearchResultInput;