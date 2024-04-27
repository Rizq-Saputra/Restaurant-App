/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite resto', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('Favorite one Restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');
  I.seeElement('.restaurant-detail__name a');

  const firstResto = locate('.restaurant-detail__name a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestoName = await I.grabTextFrom('.restaurant-detail__name');

  assert.strictEqual(firstRestoName, likedRestoName);
});

Scenario('searching Resto', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');
  I.seeElement('.restaurant-detail__name a');

  const names = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant-detail__name a').at(i));
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');

    const restaurantName = await I.grabTextFrom('.restaurant-detail__name');
    names.push(restaurantName);
    console.log(`Added '${restaurantName}' to favorites.`);

    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');
  I.waitForVisible('.restaurant-item', 10);

  const visibleFavoriteResto = await I.grabNumberOfVisibleElements('.restaurant-item');
  console.log(`Number of visible favorite restaurants: ${visibleFavoriteResto}`);
  console.log('Expected restaurant names in favorites:', names);

  assert.strictEqual(names.length, visibleFavoriteResto);
});
