// Definisikan class untuk custom element
class CustomSearch extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = `
        <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
          .search-form {
            display: flex;
          }
  
          input {
            flex: 1;
            width: 600px;
            padding: 1em;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-right: 5px;
          }
  
          button {
            padding: 1em;
            font-size: 16px;
            background-color: #A32B00;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
  
          button:hover {
            background-color: #ff6347;
          }

          /* Tablet */
          @media (max-width: 768px) {
            .search-form {
              input {
                width: 450px !important;
              }
            }
          }
          
          /* Mobile */
          @media screen and (max-width: 600px) {
            .search-form {
              input {
                width: 245px !important;
                padding: 1em !important;
                font-size: 14px !important;
              }
          
              button {
                padding: 1em !important;
                font-size: 15px !important;
              }
            }
          
            .text-search {
              position: absolute !important;
              height: 1px;
              width: 1px;
              overflow: hidden;
              clip: rect(1px, 1px, 1px, 1px);
              white-space: nowrap;
            }
          }

          *[tabindex="0"]:focus {
            outline: 4px dashed orange;
          }
          
          /* Small Screen */
          @media screen and (max-width: 420px) {
            .search-form input {
              width: 185px !important;
            }
          }
        </style>
  
        <form class="search-form" id="search-form">
        <input type="text" id="query" placeholder="Search Restaurant..."/>
        <button aria-label="Search restaurant" type="submit">
          <i class="fa-solid fa-magnifying-glass"></i>
          <span class="text-search"> Search</span>
        </button>
      </form>
    `;

    shadowRoot.innerHTML = template;

    const form = shadowRoot.querySelector('#search-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchInput = shadowRoot.querySelector('#query').value.trim();

      const searchEvent = new CustomEvent('search', {
        bubbles: true,
        composed: true,
        detail: { query: searchInput },
      });

      this.dispatchEvent(searchEvent);
    });
  }
}

customElements.define('custom-search', CustomSearch);
