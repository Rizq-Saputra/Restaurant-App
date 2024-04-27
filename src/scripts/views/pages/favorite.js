/* eslint-disable no-new */
/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantView from './liked-restaurant/favorite-resto-view';
import FavoriteRestaurantShowPresenter from './liked-restaurant/favorite-resto-show-presenter';
import FavoriteRestoSearchPresenter from './liked-restaurant/favorite-resto-search-presenter';

const view = new FavoriteRestaurantView();

const Favorite = {

  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    const loader = document.querySelector('custom-loader');
    if (loader) {
      loader.show();
    }
    setTimeout(async () => {
      try {
        new FavoriteRestaurantShowPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });
        new FavoriteRestoSearchPresenter({ view, favoriteRestaurant: FavoriteRestaurantIdb });
      } catch (error) {
        console.error('Error fetching favorite restaurants:', error);
        const textError = document.querySelector('#textError');
        textError.innerHTML = '<p style="color:red;">Failed to load data. Please try again later.</p>';
      } finally {
        if (loader) {
          loader.hide();
        }
      }
    }, 500);
  },
};

export default Favorite;
