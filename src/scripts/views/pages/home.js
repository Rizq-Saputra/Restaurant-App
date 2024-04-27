import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate, createSkeletonRestaurantItemTemplate } from '../templates/template-creator';
import '../custom-element/custom-search';
import '../custom-element/custom-loader';

const Home = {
  async render() {
    return `
        <custom-loader></custom-loader>
        <div class="hero">
          <picture>
            <source media="(max-width: 400px)" srcset="../images/heros/hero-image_2-small.jpg" type="image/jpeg"/>
            <img src="../images/heros/hero-image_2-large.jpg" alt="Hero Image" class="hero-image"/>
          </picture>
          <div class="hero-inner">
            <h1 class="hero-title" tabindex="0">Enjoy Your Delicious Food</h1>
            <p class="hero-tagline" tabindex="0">
              Discover the joy of savoring the finest cuisine at our restaurant,
              where every bite is a journey to happiness. Indulge in the exquisite
              flavors and let your taste buds dance with delight.
            </p>
            <button class="hero-button">Learn More</button>
          </div>
        </div>

        <section id="heading" class="head-content">
          <h1 tabindex="0">Explore Restaurant</h1>
        </section>

        <section class="search-container">
          <custom-search aria-label="Search restaurant"></custom-search>
        </section>

        <section class="container-restaurants">
          <div class="text-error" id="textError"></div>
          <div class="restaurant-list" id="restaurant-list">
          ${createSkeletonRestaurantItemTemplate(20)}
          </div>
        </section>
    `;
  },

  async afterRender() {
    const loader = document.querySelector('custom-loader');
    const restaurantContainer = document.querySelector('#restaurant-list');
    const textError = document.querySelector('#textError');
    const searchComponent = document.querySelector('custom-search');

    if (loader) {
      loader.show();
    }

    try {
      const restaurants = await RestaurantSource.restaurantList();

      restaurantContainer.innerHTML = '';
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      textError.innerHTML = '<p style="color:red;">Failed to load data. Please try again later.</p>';
    } finally {
      if (loader) {
        loader.hide();
      }
    }

    searchComponent.addEventListener('search', async (event) => {
      const { query } = event.detail;

      try {
        const searchResults = await RestaurantSource.searchRestaurants(query);

        if (searchResults.error) {
          throw new Error('Failed to fetch search results.');
        }

        if (searchResults.founded === 0) {
          restaurantContainer.innerHTML = '';
          textError.innerHTML = '<p style="color:red;">No result found.</p>';
        } else {
          textError.innerHTML = '';
          restaurantContainer.innerHTML = '';
          searchResults.restaurants.forEach((restaurant) => {
            restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
          });
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        textError.innerHTML = '<p style="color:red;">Failed to load search results. Please try again.</p>';
      } finally {
        if (loader) {
          loader.hide();
        }
      }
    });
  },
};

export default Home;
