const fs = require('fs');
let liquid = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', 'utf8');

const script = `
<script>
  document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector('.tt-mobile-carousel-track');
    const dots = document.querySelectorAll('.tt-mobile-carousel-dots .tt-dot');
    if (track && dots.length > 0) {
      track.addEventListener('scroll', function() {
        let index = Math.round(track.scrollLeft / track.clientWidth);
        dots.forEach(d => d.classList.remove('active'));
        if(dots[index]) dots[index].classList.add('active');
      });
    }
  });
</script>
`;

liquid = liquid.replace(/<\/div>\n\s*\{\% endif \%\}\n\s*<\/div>/, '</div>\n        {% endif %}\n      </div>\n' + script);

fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-product-main.liquid', liquid);