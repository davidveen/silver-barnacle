# Divodex

Search and select your favourite Pokemon. Create your dream team of up to six to rule the world (or your imagination).

This project was created as part of an Assessment.

The project demonstrates a 'hypermodern' Angular application (19.1), using
- standalone components
- Signals over RxJS wherever possible
- experimental Zoneless change detection
- state management with NgRx SignalStore
- hybrid SSR and lazy loading

Notable features and design choices:
- a responsive multicolumn virtual scroller, implemented with a custom datasource and dynamic screen size detection
- a custom number input implementing ControlValueAccessor
- simple and flat architecture, with 'smart' components under /components, and 'dumb' components under /shared
- touch-device enabled (using HammerJS)
- browser API calls (e.g. window, localStorage) implemented in an SSR-safe manner

All data and images are taken from [Fanzeyi's repository](https://github.com/fanzeyi/pokemon.json), a compilation of data collected by the editors of Bulbapedia.
This data is copyrighted by Pokémon company and its affiliates.

## Usage

### Development
Perform the following actions:
- `npm install`
- `npm run build`
- `npm run serve:ssr`
[in another tab]
- `npm start`


## Assessment (original)

Build a basic Product Listing Page, showing some fake products originating from a JSON file of your own creation.

Add a “wishlist” widget that allows adding/removing products on the wishlist. Wishlist items should have a quantity that can be changed. Wishlist items should persist between browser sessions. 

The page should have a header with a company logo and a “favorites” icon. The favorites icon should have a badge showing the number of items currently on the wishlist, much like a shopping cart on a webshop that is showing the number of items in the cart. 

The wishlist itself should be presented in a “side panel” which can be opened by clicking the “favorites” icon in the header. The side panel should overlay the Product Listing Page. 

And finally; think outside the box. This is an invitation to showcase your craftsmanship and creativity, to show what’s important to you, and we like to be technically surprised.
