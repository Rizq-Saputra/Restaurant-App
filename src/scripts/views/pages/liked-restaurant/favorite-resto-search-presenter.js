class FavoriteRestoSearchPresenter {
  constructor({ view, favoriteRestaurant }) {
    this._view = view;
    this._favoriteRestaurant = favoriteRestaurant;
    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._queryElement = document.getElementById('query');
    this._queryElement.addEventListener('change', (event) => {
      this._searchRestaurant(event.target.value);
    });
  }

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundResto;
    if (this.latestQuery.length > 0) {
      foundResto = await this._favoriteRestaurant.searchRestaurant(this.latestQuery);
    } else {
      foundResto = await this._favoriteRestaurant.getAllRestaurant();
    }
    this._showFoundRestaurant(foundResto);
  }

  _showFoundRestaurant(restaurants) {
    this._view.showRestaurant(restaurants);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestoSearchPresenter;
