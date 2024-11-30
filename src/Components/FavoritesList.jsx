import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFavorites, fetchDeleteFavorite, fetchEditFavorite } from '../redux/favoritesSlice';
import { addSearchData } from '../redux/searchDataSlice';
import { openModalEdit, closeModal } from '../redux/modalSlice';
import icon_delete from '../img/icon_delete.png';
import icon_edit from '../img/icon_edit.png';
import icon_search from '../img/icon_search.png';
import { useNavigate } from 'react-router-dom';
import EditModal from './EditModal';

const FavoritesList = () => {
  const { status, data } = useSelector(state => state.favorites);
  const { modalData, isOpen, id } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetFavorites())
  }, [dispatch]);

  const handleModalCancel = () => {
    dispatch(closeModal())
  };

  const onSearch = (favorite) => {
    const url = favorite.title.split('*')[0]
    const parsedUrl = new URL(url)
    dispatch(addSearchData({ request: parsedUrl.searchParams.get('q'), order: parsedUrl.searchParams.get('order'), maxResults: parsedUrl.searchParams.get('maxResults') }));
    navigate('/searchResult');
  };

  const handleFormSubmit = () => {
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${modalData.maxResults}&order=${modalData.order}&q=${modalData.request}&type=video&key=YOUR_API_KEY`
    const editData = { editDataTitle: url + '*' + modalData.title, editDataId: id }
    dispatch(fetchEditFavorite(editData))
    handleModalCancel()
  };

  return (
    <div className='favoritesList'>
      <div className='favoritesList_content'>
        <p className='favoritesList_title title'>Избранное</p>
        {status === 'loading' && <p>Загрузка...</p>}
        {status === 'succeeded' &&
          <ul className='favoritesList_list'>
            {data.map((favorite) => (
              <li className='favoritesList_item' key={favorite.id}>
                {favorite.title.split('*')[1]}
                <div>
                  <img className='favoritesList_setting' onClick={() => onSearch(favorite)} src={icon_search} alt='Search' width={30} />
                  <img className='favoritesList_setting' onClick={() => dispatch(openModalEdit(favorite))} src={icon_edit} alt='Edit' width={30} />
                  <img className='favoritesList_setting' onClick={() => dispatch(fetchDeleteFavorite(favorite))} src={icon_delete} alt='Delete' width={30} />
                </div>
              </li>
            ))}
          </ul>
        }
      </div>
      {isOpen && <EditModal onCancel={handleModalCancel} onSubmit={handleFormSubmit} />}
    </div>
  );
};

export default FavoritesList;