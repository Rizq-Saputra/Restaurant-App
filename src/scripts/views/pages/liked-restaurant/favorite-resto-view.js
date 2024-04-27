/* eslint-disable class-methods-use-this */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
    <custom-loader></custom-loader>
    <div class="hero">
      <picture>
        <source media="(max-width: 400px)" srcset="../images/heros/hero-image_2-small.jpg" type="image/jpeg"/>
        <img src="../images/heros/hero-image_2-large.jpg" alt="Hero Image" class="hero-image"/>
      </picture>
      <div class="hero-inner">
      </div>
    </div>

    <section class="container-restaurants">
        <section id="heading" class="head-content">
          <h1 tabindex="0">Your Favorite List Restaurant</h1>
        </section>
        <div id="restaurant-search-container">
          <div class="search-bar">
            <input id="query" type="text" placeholder="Search...">
            <button id="searchButton"><i class="fa-solid fa-magnifying-glass"></i><span class="text-search"> Search</span></button>
          </div>
          <div class="text-error" id="textError"></div>
          <div class="restaurant-list" id="restaurant-list"></div>
        </div>
    </section>
    `;
  }

  getFavoriteRestaurantTemplate() {
    return `
    <section class="container-restaurants">
        <section id="heading" class="head-content">
            <h1 tabindex="0">Your Favorite List Restaurant</h1>
        </section>
        <div class="text-error" id="textError"></div>
        <div class="restaurant-list" id="restaurant-list"></div>
    </section>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurant(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.querySelector('.restaurant-list').innerHTML = html;

    document
      .getElementById('restaurant-search-container')
      .dispatchEvent(new Event('restaurant-list:searched:updated'));

    document.getElementById('restaurant-list').dispatchEvent(new Event('restaurant-list:updated'));
  }

  showFavoriteRestaurant(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)),
        '',
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurant-list').innerHTML = html;

    document.getElementById('restaurant-list').dispatchEvent(new Event('restaurant-list:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restaurant untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
