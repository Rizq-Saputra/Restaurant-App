/* eslint-disable no-undef */
Feature('Unfavorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('Unfavorite one Restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.restaurant-detail__name a');
  const firstResto = locate('.restaurant-detail__name a').first();
  I.click(firstResto);
  I.waitForVisible('#favoriteButton', 5);
  I.click('#favoriteButton');
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  I.click(firstResto);
  I.waitForVisible('#favoriteButton', 5);
  I.click('#favoriteButton');
  I.amOnPage('/#/favorite');
  I.wait(10)
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});
