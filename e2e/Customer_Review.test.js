/* eslint-disable no-undef */
Feature('Customer Review');

Before(({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.restaurant-detail__name a', 5);
  const firstRestaurantLink = locate('.restaurant-detail__name a').first();
  I.click(firstRestaurantLink);
  I.waitForElement('#restaurantDetail', 5);
});

Scenario('Adding Customer Review', async ({ I }) => {
  I.seeElement('#name');
  I.seeElement('#review');

  const customerName = 'Customer';
  const customerReview = 'This restaurant is So amazing!';

  I.fillField('#name', customerName);
  I.fillField('#review', customerReview);

  I.seeElement('#submitReview');
  I.click('#submitReview');

  I.waitForText('Review added successfully!', 5);
  I.waitForElement('.swal2-popup', 5);
  I.click('.swal2-confirm');
  I.refreshPage();
  I.waitForElement('.review-item', 5);
  const lastReviewNameElement = locate('.review-item .review-name').last();
  I.seeTextEquals(customerName, lastReviewNameElement);
});
