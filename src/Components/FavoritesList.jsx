import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FavoritesList = () => {
  const { favorites } = useSelector(state => state.favorites);

  return (
    <div class='favoritesList'>
    <p class='favoritesList_title title'>Избранное</p>
    <div class='favoritesList_list'>
                    <ul class='favoritesList_list-list'>
                        {favorites.map((favorite) =>
                            <li>
                              {favorite}
                            </li>)}
                    </ul>
    </div>
    
</div>
  )
}

export default FavoritesList