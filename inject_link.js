const fs = require('fs');

const path = '/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-header.liquid';
let content = fs.readFileSync(path, 'utf8');

const desktopTarget = `      {% endfor %}
    </div>
    <div class="ayus-logo">`;

const desktopReplacement = `      {% endfor %}
      <div class="ayus-nav-item tt-desktop-dropdown">
        <a href="/pages/our-story" class="ayus-nav-link tt-desktop-link">Our Story</a>
      </div>
    </div>
    <div class="ayus-logo">`;

if (content.includes(desktopTarget)) {
    content = content.replace(desktopTarget, desktopReplacement);
    console.log("Replaced desktop");
}

const mobileTarget = `      {% endfor %}
    </nav>
  </div>`;

const mobileReplacement = `      {% endfor %}
      <div class="tt-mobile-nav-item">
        <a href="/pages/our-story" class="ayus-mobile-link">Our Story</a>
      </div>
    </nav>
  </div>`;

if (content.includes(mobileTarget)) {
    content = content.replace(mobileTarget, mobileReplacement);
    console.log("Replaced mobile");
}

fs.writeFileSync(path, content, 'utf8');
