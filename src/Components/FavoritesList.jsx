import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFavorites, fetchDeleteFavorite } from '../redux/favoritesSlice';
import { fetchSearchFavorite } from '../redux/videosSlice';
import { addSearchText } from '../redux/searchTextSlice';
import icon_delete from '../img/icon_delete.png';
import icon_edit from '../img/icon_edit.png';
import icon_search from '../img/icon_search.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import EditModal from './EditModal'; // Импортируем новый компонент

const FavoritesList = () => {
  const { status, data } = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [requestValue, setRequestValue] = useState('');
  const [nameRequest, setNameRequest] = useState('');
  const [orderRequest, setOrderRequest] = useState('');
  const [maxResultRequest, setMaxResultRequest] = useState();

  useEffect(() => {
    dispatch(fetchGetFavorites());
  }, [dispatch]);

  const editRequest = (favorite) => {
    const parsedUrl = new URL(favorite.title.split('*')[0]);
    setRequestValue(parsedUrl.searchParams.get('q'));
    setNameRequest(favorite.title.split('*')[1]);
    setOrderRequest(parsedUrl.searchParams.get('order'));
    setMaxResultRequest(parsedUrl.searchParams.get('maxResult'));
    setOpen(true);
  };

  const deleteRequest = (favorite) => {
    dispatch(fetchDeleteFavorite(favorite));
  };

  const handleModalCancel = () => {
    setOpen(false);
    setRequestValue('');
    setNameRequest('');
    setOrderRequest('');
    setMaxResultRequest('');
  };

  const searchRequest = (favorite) => { 
    const url = favorite.title.split('*')[0];
    const parsedUrl = new URL(url);
    const qValue = parsedUrl.searchParams.get('q');
    dispatch(fetchSearchFavorite(url));
    dispatch(addSearchText(qValue));
    navigate('/searchResult');
  };

  const handleFormSubmit = (values) => {
    console.log('Updated values:', values);
    handleModalCancel(); 
  };

  const handleSelectChange = (value) => {
    setOrderRequest(value);
  };

  const handleSliderChange = (value) => {
    setMaxResultRequest(value);
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
                  <img className='favoritesList_setting' onClick={() => searchRequest(favorite)} src={icon_search} alt="Search" width={30} />
                  <img className='favoritesList_setting' onClick={() => editRequest(favorite)} src={icon_edit} alt="Edit" width={30} />
                  <img className='favoritesList_setting' onClick={() => deleteRequest(favorite)} src={icon_delete} alt="Delete" width={30} />
                </div>
              </li>
            ))}
          </ul>
        }
      </div>

      <EditModal 
        open={open}
        onCancel={handleModalCancel}
        onSubmit={handleFormSubmit}
        requestValue={requestValue}
        nameRequest={nameRequest}
        orderRequest={orderRequest}
        maxResultRequest={maxResultRequest}
        handleSelectChange={handleSelectChange}
        handleSliderChange={handleSliderChange}
      />
    </div>
  );
};

export default FavoritesList;