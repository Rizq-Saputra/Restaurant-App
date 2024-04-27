/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import FavoriteRestoSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-resto-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurant/favorite-resto-view';

describe('Searching Restaurant', () => {
  let presenter;
  let favoriteRestaurant;
  let view;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurant = {
      getAllRestaurant: jest.fn(),
      searchRestaurant: jest.fn(),
    };

    presenter = new FavoriteRestoSearchPresenter({
      favoriteRestaurant,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurant.searchRestaurant.mockImplementation(() => []);
      searchRestaurant('resto a');

      expect(presenter.latestQuery).toEqual('resto a');
    });
    it('should ask the model to search for liked resto', () => {
      favoriteRestaurant.searchRestaurant.mockImplementation(() => []);
      searchRestaurant('resto a');

      expect(favoriteRestaurant.searchRestaurant).toHaveBeenCalledWith('resto a');
    });
    it('should show the resto found by Favorite resto', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurant-list:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);

          done();
        });

      favoriteRestaurant.searchRestaurant.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'ada juga resto abcde' },
            { id: 333, name: 'ini juga boleh resto a' },
          ];
        }

        return [];
      });

      searchRestaurant('resto a');
    });
    it('should show the name of the resto found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurant-list:searched:updated', () => {
          const restaurantName = document.querySelectorAll('.restaurant-detail__name');
          expect(restaurantName.item(0).textContent).toEqual('resto abc');
          expect(restaurantName.item(1).textContent).toEqual('ada juga resto abcde');
          expect(restaurantName.item(2).textContent).toEqual('ini juga boleh resto a');
          done();
        });
      favoriteRestaurant.searchRestaurant.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'ada juga resto abcde' },
            { id: 333, name: 'ini juga boleh resto a' },
          ];
        }
        return [];
      });
      searchRestaurant('resto a');
    });
    it('should show - when the resto returned does not contain a name', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurant-list:searched:updated', () => {
          const restaurantName = document.querySelectorAll('.restaurant-detail__name');
          expect(restaurantName.item(0).textContent)
            .toEqual('-');

          done();
        });

      favoriteRestaurant.searchRestaurant.mockImplementation((query) => {
        if (query === 'resto a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurant('resto a');
    });
  });
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurant.getAllRestaurant.mockImplementation(() => []);
      searchRestaurant(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurant('    ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurant('');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestaurant('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should show all favorite resto', () => {
      favoriteRestaurant.getAllRestaurant.mockImplementation(() => []);
      searchRestaurant('    ');
      expect(favoriteRestaurant.getAllRestaurant).toHaveBeenCalled();
    });
  });
  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurant-search-container')
        .addEventListener('restaurant-list:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
          done();
        });
      favoriteRestaurant.searchRestaurant.mockImplementation((query) => []);
      searchRestaurant('resto a');
    });
    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant-search-container')
        .addEventListener('restaurant-list:searched:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);

          done();
        });

      favoriteRestaurant.searchRestaurant.mockImplementation((query) => []);

      searchRestaurant('resto a');
    });
  });
});
