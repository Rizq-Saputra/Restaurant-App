const BASE_URL = '../data/DATA.json';

document.addEventListener("DOMContentLoaded", async () => {
    const restaurantList = document.querySelector(".restaurant-list");
    const menuBtn = document.getElementById('menu');
    const main = document.getElementById('main');
    const navbarMenu = document.querySelector('.navbar-menu');

    let restaurantsData; // Menyimpan data restoran di luar event listener

    // Event listener untuk toggle menu
    menuBtn.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
      if (navbarMenu.classList.contains('active')) {
        menuBtn.innerHTML = '<i class="fa-solid close fa-xmark"></i>';
        menuBtn.setAttribute('aria-label', 'close menu');
        menuBtn.style.zIndex = '1000';
        main.style.opacity = '0.5'; 
      } else {
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        menuBtn.setAttribute('aria-label', 'toggle menu');
        main.style.opacity = '1'; 
      }
    });
  
  
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants data');
      }
      restaurantsData = await response.json(); 
  
      // Fungsi untuk menampilkan data restoran
      const renderRestaurants = (restaurants) => {
        restaurantList.innerHTML = ''; 
  
        if (restaurants.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No restaurants match your search.';
            restaurantList.appendChild(noResultsMessage);
        } else {
          restaurants.forEach(restaurant => {
              const restaurantItem = document.createElement("article");
              restaurantItem.classList.add("restaurant-item");
  
              restaurantItem.innerHTML = `
              <img src="${restaurant.pictureId}" alt="${restaurant.name}" tabindex="0">
              <p class="city-label" tabindex="0">City: ${restaurant.city}</p>
              <div class="content-item">
                <h2 tabindex="0">${restaurant.name}</h2>
                <div class="rating">
                  <i class="fa-solid fa-star"></i><p tabindex="0">Rating: ${restaurant.rating}</p>
                </div>
                <p tabindex="0">${restaurant.description}</p>
              </div>`;
  
              restaurantList.appendChild(restaurantItem);
            });
        }
      };
      
      // Event listener untuk form pencarian
      document.querySelector('.search-form').addEventListener('submit', function(event) {
          event.preventDefault();
          
          const searchQuery = document.querySelector('#search-input').value.toLowerCase();
          const filteredRestaurants = restaurantsData.restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(searchQuery) || restaurant.city.toLowerCase().includes(searchQuery);
          });
  
          renderRestaurants(filteredRestaurants);
      });
  
      renderRestaurants(restaurantsData.restaurants);
    } catch (error) {
      console.error('Error:', error.message);
    }
  });
  