const fs = require('fs');
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

const mobileCarousel = `
      <!-- Mobile Swipeable Carousel -->
      <div class="tt-mobile-carousel">
        <div class="tt-mobile-carousel-track">
          {% for media in product.media %}
            <div class="tt-mobile-carousel-slide">
              <img src="{{ media | img_url: '800x' }}" alt="{{ media.alt | escape }}" loading="lazy">
            </div>
          {% endfor %}
        </div>
        {% if product.media.size > 1 %}
        <div class="tt-mobile-carousel-dots">
          {% for media in product.media %}
            <div class="tt-dot {% if forloop.first %}active{% endif %}"></div>
          {% endfor %}
        </div>
        {% endif %}
      </div>
`;

// Insert the mobile carousel before tt-product-media-gallery
liquid = liquid.replace(/<div class="tt-product-media-gallery">/, mobileCarousel + '\n      <div class="tt-product-media-gallery">');

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', liquid);

let css = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', 'utf8');

css += `
/* --- Mobile Swipeable Carousel --- */
.tt-mobile-carousel {
  display: none;
}
@media (max-width: 768px) {
  .tt-product-media-gallery {
    display: none !important; /* hide desktop gallery */
  }
  .tt-mobile-carousel {
    display: block;
    width: 100%;
    order: 1 !important;
    margin-bottom: 15px !important;
    position: relative;
  }
  .tt-mobile-carousel-track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }
  .tt-mobile-carousel-track::-webkit-scrollbar {
    display: none; /* Safari/Chrome */
  }
  .tt-mobile-carousel-slide {
    flex: 0 0 100%;
    scroll-snap-align: start;
  }
  .tt-mobile-carousel-slide img {
    width: 100%;
    height: auto;
    display: block;
  }
  .tt-mobile-carousel-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 15px;
  }
  .tt-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ccc;
  }
  .tt-dot.active {
    background: #333;
  }
}
`;
fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-styles.css', css);