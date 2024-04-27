/* eslint-disable no-plusplus */
import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => {
  const {
    name, description, city, address, rating, pictureId, menus, customerReviews,
  } = restaurant;

  const imageUrl = CONFIG.IMAGE.replace('<pictureId>', pictureId);

  const generateReviewsList = () => {
    if (!customerReviews || customerReviews.length === 0) {
      return '<li>No customer reviews available</li>';
    }

    return customerReviews.map((review) => `
      <li class="review-item" tabindex="0">
        <div class="review-header">
          <p class="review-name" tabindex="0">${review.name}</p>
          <p class="review-date" tabindex="0">${review.date}</p>
        </div>
        <p class="review-text" tabindex="0">${review.review}</p>
      </li>
    `).join('');
  };

  const generateMenuCards = (items) => {
    if (!items || items.length === 0) {
      return '<p>No items available</p>';
    }

    return items.map((item) => `
    <div class="menu-card">
      <p class="menu-card__name" tabindex="0">${item.name}</p>
    </div>
    `).join('');
  };

  const htmlTemplate = `
  <div class="restaurant-detail">
  <div class="restaurant-detail__header">
    <img src="${imageUrl}" alt="${name}" tabindex="0" class="restaurant-detail__image">
    <div class="restaurant-detail__info">
      <h2 class="restaurant-detail__name" tabindex="0">${name}</h2>
      <p class="restaurant-detail__location" tabindex="0">City: ${city}</p>
      <p class="restaurant-detail__location" tabindex="0">Address: ${address}</p>
      <p class="restaurant-detail__rating" tabindex="0">Rating: <i class="fa-solid fa-star"></i> ${rating}</p>
      <p class="restaurant-detail__description" tabindex="0">${description}</p>
    </div>
  </div>

  <div class="restaurant-detail__content">
    <div class="restaurant-detail__menus">
      <div class="food__menu">
        <h3 tabindex="0">Food Menu</h3>
        <div class="menu-cards">
          ${generateMenuCards(menus.foods)}
        </div>
      </div>
      
      <div class="drink__menu">
        <h3 tabindex="0">Drink Menu</h3>
        <div class="menu-cards">
          ${generateMenuCards(menus.drinks)}
        </div>
      </div>
    </div>
  </div>

  <div class="restaurant-review">
    <h3 tabindex="0">Add Review</h3>
    <form class="form-review" id="addReviewForm">
      <label tabindex="0" for="name">Your Name:</label>
      <input tabindex="0" type="text" id="name" required>

      <label tabindex="0" for="review">Your Review:</label>
      <textarea tabindex="0" id="review" rows="4" required></textarea>
      <div class="form-review__submit">
        <button aria-label="Submit your review" type="submit" id="submitReview">Submit Review</button>
      </div>
    </form>
  </div>


  <div class="restaurant-detail__reviews">
    <h3 tabindex="0">Customer Reviews</h3>
    <ul>${generateReviewsList()}</ul>
  </div>
</div>

  `;

  return htmlTemplate;
};

const createSkeletonRestaurantItemTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i++) {
    template += `
      <article class="restaurant-item skeleton">
        <div class="skeleton-image"></div>
        <p class="city-label skeleton">City</p>
        <div class="content-item">
          <h2 class="restaurant-detail__name skeleton">Lorem ipsum dolor sit.</h2>
          <div class="rating skeleton">
            <i class="fa-solid fa-star"></i><p class="skeleton">-</p>
          </div>
          <p class="skeleton">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci alias aspernatur, assumenda aut consectetur consequuntur debitis deleniti dicta dolorem dolorum eos exercitationem labore laboriosam magni nihil, nobis obcaecati optio perspiciatis placeat qui recusandae saepe sapiente sequi totam ullam ut.</p>
        </div>
      </article>
    `;
  }

  return template;
};

const createRestaurantItemTemplate = (restaurant) => {
  const imageUrl = `${CONFIG.IMAGE.replace('<pictureId>', restaurant.pictureId)}`;

  return `
    <article class="restaurant-item">
      <img crossorigin="anonymouse" class="lazyload" data-src="${imageUrl}" alt="${restaurant.name || '-'}">
      <p class="city-label" tabindex="0">City: ${restaurant.city || '-'}</p>
      <div class="content-item">
        <h2 class="restaurant-detail__name"><a href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h2>
        <div class="rating">
          <i class="fa-solid fa-star"></i><p tabindex="0">Rating: ${restaurant.rating || '-'}</p>
        </div>
        <p tabindex="0">${restaurant.description || '-'}</p>
      </div>
    </article>
  `;
};

const createFavoriteButtonTemplate = () => `
  <button aria-label="Favorite this restaurant" id="favoriteButton" class="favorite">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createFavoritesButtonTemplate = () => `
  <button aria-label="Unfavorite this restaurant" id="favoriteButton" class="favorite">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createBackButtonTemplate = () => `
  <button aria-label="Go back" id="backButton" class="back-button">
    <i class="fa fa-arrow-left" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createFavoriteButtonTemplate,
  createFavoritesButtonTemplate,
  createBackButtonTemplate,
  createSkeletonRestaurantItemTemplate,
};
