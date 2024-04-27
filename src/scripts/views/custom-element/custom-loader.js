class CustomLoader extends HTMLElement {
  constructor() {
    super();

    // Buat shadow DOM untuk custom element
    const shadowRoot = this.attachShadow({ mode: 'open' });

    // Definisikan template HTML untuk custom element (spinner)
    const template = `
      <style>
        #loader {
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          transition: opacity 0.75s, visibility 0.75s;
          position: fixed;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 9999;
        }

        #loader p {
          margin-top: 20px;
          color: white;
          font-size: 25px;
          font-weight: 500;
        }

        .hidden {
          opacity: 0;
          visibility: hidden;
        }

        /* Loading Screen */
        .loader {
          --c: no-repeat linear-gradient(#ff5001 0 0);
          background: var(--c), var(--c), var(--c), var(--c), var(--c), var(--c), var(--c), var(--c), var(--c);
          background-size: 16px 16px;
          animation: l32-1 1s infinite, l32-2 1s infinite;
          border-radius: 50%;
          width: 90px;
          height: 90px;
        }

        @keyframes l32-1 {
          0%, 100% {
            width: 90px;
            height: 90px;
          }
          35%, 65% {
            width: 130px;
            height: 130px;
          }
        }

        @keyframes l32-2 {
          0%, 40% {
            background-position: 0 0, 0 50%, 0 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0, 50% 0, 50% 50%;
          }
          60%, 100% {
            background-position: 0 50%, 0 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0, 50% 0, 0 0, 50% 50%;
          }
        }
      </style>
      <div id="loader" class="hidden">
        <div class="loader"></div>
        <p>Loading</p>
      </div>
    `;

    shadowRoot.innerHTML = template;
  }

  show() {
    const loader = this.shadowRoot.querySelector('#loader');
    loader.classList.remove('hidden');
  }

  hide() {
    const loader = this.shadowRoot.querySelector('#loader');
    loader.classList.add('hidden');
  }
}

customElements.define('custom-loader', CustomLoader);
