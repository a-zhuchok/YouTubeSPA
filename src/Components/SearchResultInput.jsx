import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';
import icon_like from '../img/icon_like.png';
import icon_like_saved from '../img/icon_like_saved.png';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchData } from '../redux/searchDataSlice';
import { fetchAddFavorites } from '../redux/favoritesSlice';
import SaveModal from './SaveModal';
import { useNavigate } from 'react-router-dom';
import { updateModalData, openModal, closeModal } from '../redux/modalSlice';

const { Search } = Input;

const SearchResultInput = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { searchData } = useSelector(state => state.searchData);
    const { modalData, isOpen } = useSelector(state => state.modal);
    const [icon, setIcon] = useState(icon_like);
    const [iconTitle, setIconTitle] = useState('');

    const onSearch = (value) => {
        if (value.length !== 0) {
            dispatch(addSearchData({ request: value, order: 'relevance', maxResults: 20 }));
        }
        else {
            navigate('/search')
        }
        setIcon(icon_like)
        setIconTitle('Сохранить запрос')
    };
    
    const handleModalOpen = (icon) => {
        dispatch(updateModalData(modalData))
        icon === icon_like ? dispatch(openModal()) : false
    };

    const handleModalClose = () => {
        dispatch(closeModal())
    };

    const handleFormFinish = () => {
        const url = import.meta.env.VITE_APP_LOGIN_URL + `&maxResults=${modalData.maxResults}&order=${modalData.order}&q=${searchData.request}&type=video&key=YOUR_API_KEY`;
        dispatch(fetchAddFavorites(url + '*' + modalData.title));
        handleModalClose()
        setIcon(icon_like_saved);
        setIconTitle('Поиск сохранён в избранных')
    };

    return (
        <div className='searchResultInput'>
            <div className='searchResultInput_content'>
                <p className='searchResultInput_title title'>Поиск видео</p>
                <div className='searchResultInput_input'>
                    <Search
                        placeholder='Введите текст поиска'
                        defaultValue={searchData.request}
                        allowClear
                        enterButton='Найти'
                        size='large'
                        onSearch={onSearch}
                        suffix={
                            <Tooltip title={iconTitle} placement='top'>
                                <img src={icon} alt='Save' width={28} onClick={() => handleModalOpen(icon)} />
                            </Tooltip>
                        }
                    />
                </div>
                {isOpen && <SaveModal onClose={handleModalClose} onFinish={handleFormFinish} />}
            </div>
        </div>
    );
};

export default SearchResultInput;