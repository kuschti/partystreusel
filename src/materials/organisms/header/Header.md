## Documentation

This component is a combination of the ```<header class="header" />``` and all containers & buttons for the off-canvas part.

* small and middle screen => off-canvas navigation
* large screens => default navigation/header

### DOM
**The DOM of the page should look like this (example is simplified): **

    <body class="js-offcanvas">
      <div class="offcanvas">
        <div class="offcanvas__pusher">

          <header class="header">

            <div class="offcanvas__content">
              <button class="offcanvas__close"></button>

              <div class="header__nav">
                <nav class="main-nav"> main navigation...</nav>
              </div>

              <div class="header__meta">
                meta-nav...
              </div>

            </div>

            <button class="offcanvas__opener"></button>

          </header>

          <main> Her comes the content...</main>
          <footer>footer of page</footer>

          <div class="offcanvas__overlay">
        </div>
      </div>
    </body>

### JS
The class ```js-offcanvas``` is to initialize the off-canvas functions (toggle with buttons). Toggle Buttons needs the class ```js-offcanvas__toggler``` for the eventhandler.
