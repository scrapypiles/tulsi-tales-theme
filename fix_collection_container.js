const fs = require('fs');
let content = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', 'utf8');

const target = `<section class="ayus-collection-section" data-section-id="{{ section.id }}" style="background-color: #F9F6F0; padding-bottom: 60px;">
  <div class="ayus-container">
    
    <!-- Hero Banner for Collection (Thinner + Photo) -->
    {% assign hero_bg = section.settings.image | img_url: 'master' %}
    {% if collection.image %}
      {% assign hero_bg = collection.image | img_url: 'master' %}
    {% elsif section.settings.image == blank %}
      {% assign hero_bg = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1600' %}
    {% endif %}
    
    <div class="contact-banner" style="background-image: url('{{ hero_bg }}');">
    <div class="contact-banner-content" style="color: #ffffff;">
      <span class="contact-tagline" style="color: #eeeeee;">THE COLLECTION</span>
      <h1 class="contact-title" style="color: #ffffff !important;">Every product here earned its place.</h1>
      <div class="contact-subtitle" style="color: #ffffff; opacity: 0.9;">Curated from India's finest Ayurvedic makers. Nothing we wouldn't use ourselves.</div>
    </div>
  </div>
    </div>`;

const replacement = `<!-- Hero Banner for Collection -->
{% assign hero_bg = section.settings.image | img_url: 'master' %}
{% if collection.image %}
  {% assign hero_bg = collection.image | img_url: 'master' %}
{% elsif section.settings.image == blank %}
  {% assign hero_bg = 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1600' %}
{% endif %}

<div class="contact-banner" style="background-image: url('{{ hero_bg }}'); margin-bottom: 40px;">
  <div class="contact-banner-content" style="color: #ffffff;">
    <span class="contact-tagline" style="color: #eeeeee;">THE COLLECTION</span>
    <h1 class="contact-title" style="color: #ffffff !important;">Every product here earned its place.</h1>
    <div class="contact-subtitle" style="color: #ffffff; opacity: 0.9;">Curated from India's finest Ayurvedic makers. Nothing we wouldn't use ourselves.</div>
  </div>
</div>

<section class="ayus-collection-section" data-section-id="{{ section.id }}" style="background-color: #F9F6F0; padding-bottom: 60px;">
  <div class="ayus-container">
`;

content = content.replace(target, replacement);
fs.writeFileSync('/home/acharya-kln/.openclaw/workspace/tulsi-tales-theme/ayus-collection.liquid', content);
