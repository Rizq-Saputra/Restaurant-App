import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate, createFavoriteButtonTemplate, createBackButtonTemplate } from '../templates/template-creator';
import FavoriteButtonInitiator from '../../utils/favorite-button-initiator';

const Detail = {
  async render() {
    return `
        <custom-loader></custom-loader>
        <section class="container-restaurants">
          <div class="text-error" id="textError"></div>
          <div id="restaurantDetail" class="restaurant-detail"></div>
        </section>
          <div id="favoriteButtonContainer"></div>
          <div id="backButton"></div>
    `;
  },

  async afterRender() {
    const loader = document.querySelector('custom-loader');

    if (loader) {
      loader.show();
    }

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const restaurants = await RestaurantSource.detailRestaurant(url.id);
      const restaurantDetailContainer = document.querySelector('#restaurantDetail');
      const favoriteButtonContainer = document.querySelector('#favoriteButtonContainer');
      const backButtonContainer = document.querySelector('#backButton');

      restaurantDetailContainer.innerHTML = createRestaurantDetailTemplate(restaurants.restaurant);
      favoriteButtonContainer.innerHTML = createFavoriteButtonTemplate();
      backButtonContainer.innerHTML = createBackButtonTemplate();

      const updateDetail = async () => {
        const updatedRestaurants = await RestaurantSource.detailRestaurant(url.id);
        restaurantDetailContainer.innerHTML = createRestaurantDetailTemplate(
          updatedRestaurants.restaurant,
        );
      };

      await updateDetail();

      document.getElementById('submitReview').addEventListener('click', async (event) => {
        event.preventDefault();
        const nameCustomer = document.getElementById('name').value;
        const reviewCustomer = document.getElementById('review').value;
        const Swal = (await import('sweetalert2')).default;
        try {
          const reviewData = {
            id: url.id,
            name: nameCustomer,
            review: reviewCustomer,
          };

          const response = await RestaurantSource.addReview(reviewData);
          if (!response.error) {
            document.querySelector('#name').value = '';
            document.querySelector('#review').value = '';
            Swal.fire({
              title: 'Review added successfully!',
              text: 'Your Review has been added.',
              icon: 'success',
            }).then(async () => {
              await updateDetail();
            });
          } else {
            Swal.fire({
              title: 'Failed to add review. Please try again.',
              text: 'Your Review Failed to add.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error adding review:', error);
          Swal.fire({
            title: 'Failed to add review. Please try again.',
            text: 'An error occurred while adding the review. Please try again later.',
            icon: 'error',
          });
        }
        await updateDetail();
      });

      FavoriteButtonInitiator.init({
        favoriteButtonContainer: document.querySelector('#favoriteButtonContainer'),
        restaurant: {
          id: restaurants.restaurant.id,
          name: restaurants.restaurant.name,
          description: restaurants.restaurant.description,
          city: restaurants.restaurant.city,
          rating: restaurants.restaurant.rating,
          pictureId: restaurants.restaurant.pictureId,
        },
      });

      backButtonContainer.addEventListener('click', () => {
        window.history.back();
      });

      if (loader) {
        setTimeout(() => {
          loader.hide();
        }, 500);
      }
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
      const textError = document.querySelector('#textError');
      textError.innerHTML = '<p style="color:red;">Failed to load data. Please try again later.</p>';
    } finally {
      if (loader) {
        loader.hide();
      }
    }
  },
};

export default Detail;
