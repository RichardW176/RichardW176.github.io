---
layout: page
title: Home
---

<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<div class="hero-pin-track" data-hero-track>
<section class="hero">
  <div class="hero-media" aria-hidden="true">
    <video
      class="hero-media__video"
      data-autoplay-when-visible="true"
      loop
      muted
      playsinline
      preload="none">
      <source src="/assets/Overdawn%20Menu.mp4" type="video/mp4">
    </video>
  </div>
  <div class="hero-inner">
    <p class="hero-role">COMBAT DESIGNER • NARRATIVE DESIGNER • FILMMAKER</p>
    <div class="hero-name-stack">
      <h1 class="hero-title">Richard<br>Wang</h1>
    </div>
    <div class="hero-about">
      <p>Hi there! I&rsquo;m Richard, a USC student and Indie developer seeking gameplay, combat, and narrative design internships in the games industry. I have a background specializing in character / enemy design, cinematics, and quest / encounter sequencing.</p>
      <p>Feel free to contact me using either of the methods below!</p>
    </div>
    <div class="hero-socials">
      <a class="hero-social-btn" href="https://www.linkedin.com/in/ruiqian-wang-140500324/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/images/image-removebg-preview (58).png" alt="LinkedIn">
      </a>
      <a class="hero-social-btn" href="mailto:richardwangsgs@gmail.com">
        <img src="/assets/images/image-removebg-preview (59).png" alt="Email">
      </a>
    </div>
    <div class="hero-scroll-hint" aria-hidden="true">
      <span class="hero-scroll-hint__label">Scroll</span>
      <span class="hero-scroll-hint__chev">
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none"><path d="M2 2l8 8 8-8" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    </div>
  </div>
</section>
</div>

<link rel="stylesheet" href="/assets/custom.css">

<!-- ============================ SHOWCASE (index view) ============================ -->
<div id="portfolio-showcase" data-view="index">

  <nav role="tablist" class="showcase-tabs" aria-label="Portfolio sections">
    <button class="showcase-tab is-active" data-tab="games" role="tab" aria-selected="true" type="button">Video Games</button>
    <button class="showcase-tab" data-tab="writing" role="tab" aria-selected="false" type="button">Writing Samples</button>
  </nav>

  <!-- ---------- VIDEO GAMES ---------- -->
  <div data-panel="games" style="display: block;">
    <p class="showcase-hint">Select a project to see the breakdown</p>
    <div class="project-list">
      {% assign games = site.projects | sort: "order" %}
      {% for p in games %}
        {% assign accent = p.accent_rgb | default: "255 58 138" %}
        {% assign hl = 0 %}
        {% if p.secondary_video %}{% assign hl = hl | plus: 1 %}{% endif %}
        {% if p.tertiary_video %}{% assign hl = hl | plus: 1 %}{% endif %}
        {% if p.quaternary_video %}{% assign hl = hl | plus: 1 %}{% endif %}
        {% if p.quinary_video %}{% assign hl = hl | plus: 1 %}{% endif %}

        <div class="project-card" data-goto="{{ p.title | slugify }}" role="button" tabindex="0" aria-label="Open {{ p.title }}" style="--project-accent-rgb: {{ accent }};">
          <div class="project-card__glow"></div>

          <div class="project-card__shell project-showcase__stage">

            <!-- LEFT: portrait poster (5 / 7) -->
            <div class="project-showcase__poster-column">
              <div class="project-showcase__poster-frame{% if p.poster_frame_flush %} project-showcase__poster-frame--flush{% endif %}{% if p.poster_frame_borderless %} project-showcase__poster-frame--borderless{% endif %}">
                <img class="project-showcase__poster" src="{{ p.image }}" alt="{{ p.title }} poster"{% if p.poster_position %} style="object-position: {{ p.poster_position }};"{% endif %}>
              </div>
            </div>

            <!-- RIGHT: banner video / side art with the title over it -->
            <div class="project-showcase__summary project-showcase__summary--with-video">
              <div class="project-showcase__summary-video{% if p.storm_overlay %} project-showcase__summary-video--storm{% endif %}{% if p.snow_overlay %} project-showcase__summary-video--snow{% endif %}">
                {% if p.video %}
                <video class="project-showcase__summary-video-media" data-autoplay-when-visible="true" loop muted playsinline preload="none">
                  <source src="{{ p.video }}" type="video/mp4">
                </video>
                {% elsif p.summary_image %}
                <img class="project-showcase__summary-video-media project-showcase__summary-image" src="{{ p.summary_image }}" alt="{{ p.summary_image_alt | default: p.title }}">
                {% else %}
                <span class="project-showcase__summary-placeholder" aria-hidden="true"></span>
                {% endif %}
                {% if p.storm_overlay %}<span class="project-showcase__storm-lightning" aria-hidden="true"></span>{% endif %}
              </div>

              <div class="project-showcase__summary-content">
                <h3 class="project-showcase__title">{{ p.title }}</h3>

                {% if p.role_display or p.role %}
                <p class="project-showcase__role">{{ p.role_display | default: p.role }}</p>
                {% endif %}

                {% if p.stage or p.timeline or p.engine %}
                <p class="project-showcase__meta">
                  {% if p.stage %}<span>{{ p.stage }}</span>{% endif %}
                  {% if p.stage and p.timeline %}<span class="project-showcase__meta-sep">&middot;</span>{% endif %}
                  {% if p.timeline %}<span>{{ p.timeline }}</span>{% endif %}
                  {% if p.engine and (p.stage or p.timeline) %}<span class="project-showcase__meta-sep">&middot;</span>{% endif %}
                  {% if p.engine %}<span>{{ p.engine }}</span>{% endif %}
                </p>
                {% endif %}

                {% if p.description and p.description != "" %}
                <p class="project-showcase__desc">{{ p.description }}</p>
                {% endif %}

                <div class="project-card__actions">
                  <span class="project-cta">View project <span class="project-cta__arrow">&rarr;</span></span>
                  {% if p.links and p.links.size > 0 %}
                  <span class="project-card__store" aria-hidden="true"><span class="project-card__store-divider"></span></span>
                  {% for l in p.links %}
                  <span class="project-card__store">
                    <a class="project-card__store-link" href="{{ l.url }}" target="_blank" rel="noopener noreferrer" aria-label="{{ p.title }} on {{ l.label }}">{{ l.label }} <span class="ext" aria-hidden="true">&nearr;</span></a>
                  </span>
                  {% endfor %}
                  {% endif %}
                  {% if hl > 0 %}<span class="project-card__count">{{ hl }} highlight{% unless hl == 1 %}s{% endunless %} inside</span>{% endif %}
                </div>
              </div>
            </div>

          </div>
        </div>
      {% endfor %}
    </div>
  </div>

  <!-- ---------- WRITING SAMPLES ---------- -->
  <div data-panel="writing" style="display: none;">
    <p class="showcase-hint" style="--project-accent-rgb: 122 217 255;">Select a sample to read it</p>
    <div class="writing-grid">
      {% assign samples = site.prose | sort: "order" %}
      {% for s in samples %}
        <div class="project-card writing-card" data-goto="w-{{ s.title | slugify }}" role="button" tabindex="0" aria-label="Read {{ s.title }}">
          <div class="project-card__glow"></div>
          <div class="project-card__shell">
            {% if s.media_type %}<span class="writing-card__type">{{ s.media_type }}</span>{% endif %}
            <h3>{{ s.title }}</h3>
            {% if s.description and s.description != "" %}<p>{{ s.description }}</p>{% endif %}
            <span class="project-cta">Read sample <span class="project-cta__arrow">&rarr;</span></span>
          </div>
        </div>
      {% endfor %}
    </div>
  </div>

</div>

<!-- ============================ PROJECT DETAIL VIEWS ============================ -->
{% assign games = site.projects | sort: "order" %}
{% for p in games %}
  {% assign accent = p.accent_rgb | default: "255 58 138" %}
  <div data-view="{{ p.title | slugify }}" style="--project-accent-rgb: {{ accent }};">
    <div class="detail-hero">
      {% if p.video %}
      <video class="detail-hero__media" data-autoplay-when-visible="true" loop muted playsinline preload="none">
        <source src="{{ p.video }}" type="video/mp4">
      </video>
      {% else %}
      <img class="detail-hero__media" src="{{ p.summary_image | default: p.image }}" alt="">
      {% endif %}
      <div class="detail-hero__inner">
        <button class="detail-back" data-back="games" type="button"><span>&larr;</span> All projects</button>
        <div class="detail-hero__text">
          {% if p.stage or p.timeline or p.engine %}
          <span class="detail-eyebrow">
            {%- if p.stage %}{{ p.stage }}{% endif -%}
            {%- if p.stage and p.timeline %} &middot; {% endif -%}
            {%- if p.timeline %}{{ p.timeline }}{% endif -%}
            {%- if p.engine and (p.stage or p.timeline) %} &middot; {% endif -%}
            {%- if p.engine %}{{ p.engine }}{% endif -%}
          </span>
          {% endif %}
          <h1>{{ p.title }}</h1>
          {% if p.description and p.description != "" %}<p class="detail-hero__desc">{{ p.description }}</p>{% endif %}
          {% if p.role_display or p.role %}<p class="detail-hero__roles">{{ p.role_display | default: p.role }}</p>{% endif %}
        </div>
      </div>
    </div>
    <div class="detail-body">

      {% if p.secondary_video or p.tertiary_video or p.quaternary_video or p.quinary_video %}
      <h2>Highlights</h2>
      <div class="highlight-grid">
        {% if p.secondary_video %}
        <figure>
          <video data-autoplay-when-visible="true" loop muted playsinline preload="none"><source src="{{ p.secondary_video }}" type="video/mp4"></video>
          <figcaption>
            <strong>{{ p.secondary_video_title }}</strong>
            {% if p.secondary_video_subtitle %}<span>{{ p.secondary_video_subtitle }}</span>{% endif %}
            {% if p.secondary_feature_items %}<ul class="hl-notes">{% for item in p.secondary_feature_items %}<li><b>{{ item.label }}:</b> {{ item.text }}</li>{% endfor %}</ul>{% endif %}
          </figcaption>
        </figure>
        {% endif %}
        {% if p.tertiary_video %}
        <figure>
          <video data-autoplay-when-visible="true" loop muted playsinline preload="none"><source src="{{ p.tertiary_video }}" type="video/mp4"></video>
          <figcaption>
            <strong>{{ p.tertiary_video_title }}</strong>
            {% if p.tertiary_video_subtitle %}<span>{{ p.tertiary_video_subtitle }}</span>{% endif %}
            {% if p.tertiary_feature_items %}<ul class="hl-notes">{% for item in p.tertiary_feature_items %}<li><b>{{ item.label }}:</b> {{ item.text }}</li>{% endfor %}</ul>{% endif %}
          </figcaption>
        </figure>
        {% endif %}
        {% if p.quaternary_video %}
        <figure>
          <video data-autoplay-when-visible="true" loop muted playsinline preload="none"><source src="{{ p.quaternary_video }}" type="video/mp4"></video>
          <figcaption>
            <strong>{{ p.quaternary_video_title }}</strong>
            {% if p.quaternary_video_subtitle %}<span>{{ p.quaternary_video_subtitle }}</span>{% endif %}
            {% if p.quaternary_feature_items %}<ul class="hl-notes">{% for item in p.quaternary_feature_items %}<li><b>{{ item.label }}:</b> {{ item.text }}</li>{% endfor %}</ul>{% endif %}
          </figcaption>
        </figure>
        {% endif %}
        {% if p.quinary_video %}
        <figure>
          <video data-autoplay-when-visible="true" loop muted playsinline preload="none"><source src="{{ p.quinary_video }}" type="video/mp4"></video>
          <figcaption>
            <strong>{{ p.quinary_video_title }}</strong>
            {% if p.quinary_video_subtitle %}<span>{{ p.quinary_video_subtitle }}</span>{% endif %}
            {% if p.quinary_feature_items %}<ul class="hl-notes">{% for item in p.quinary_feature_items %}<li><b>{{ item.label }}:</b> {{ item.text }}</li>{% endfor %}</ul>{% endif %}
          </figcaption>
        </figure>
        {% endif %}
      </div>
      {% endif %}

      {% if p.plain_feature_items %}
      <h2>{{ p.plain_feature_heading | default: "What I did" }}</h2>
      <div class="detail-notes">
        {% for item in p.plain_feature_items %}
        <p><strong>{{ item.label }}:</strong> {{ item.text }}</p>
        {% endfor %}
      </div>
      {% endif %}

      {% if p.awards %}
      <h2>Awards</h2>
      <div class="detail-awards">
        {% for award in p.awards %}
        <img src="{{ award.file }}" alt="{{ award.alt | default: award.title | default: p.title }}">
        {% endfor %}
      </div>
      {% endif %}

      <a class="detail-fulllink" href="{{ p.url }}">Full project page &mdash; documents, scripts &amp; gallery <span aria-hidden="true">&rarr;</span></a>
    </div>
  </div>
{% endfor %}

<!-- ============================ WRITING READING VIEWS ============================ -->
{% assign samples = site.prose | sort: "order" %}
{% for s in samples %}
  <div data-view="w-{{ s.title | slugify }}" style="--project-accent-rgb: 122 217 255;">
    <div class="detail-hero">
      {% if s.image %}<img class="detail-hero__media" src="{{ s.image }}" alt="">{% endif %}
      <div class="detail-hero__inner">
        <button class="detail-back" data-back="writing" type="button"><span>&larr;</span> All writing samples</button>
        <div class="detail-hero__text">
          {% if s.media_type %}<span class="detail-eyebrow">{{ s.media_type }}</span>{% endif %}
          <h1 style="font-size: clamp(2.6rem, 6vw, 4.4rem);">{{ s.title }}</h1>
          {% if s.description and s.description != "" %}<p class="detail-hero__desc">{{ s.description }}</p>{% endif %}
          {% if s.pdf %}<a class="read-pdf" href="{{ s.pdf }}" target="_blank" rel="noopener noreferrer">Full PDF <span aria-hidden="true">&nearr;</span></a>{% endif %}
        </div>
      </div>
    </div>
    <div class="read-body">
      {{ s.content | markdownify }}
    </div>
  </div>
{% endfor %}

<div class="project-modal" id="project-modal" aria-hidden="true">
  <div class="project-modal__backdrop" data-modal-close></div>
  <div class="project-modal__panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
    <button class="project-modal__close" type="button" aria-label="Close overlay" data-modal-close>&times;</button>
    <div class="project-modal__inner" id="project-modal-inner"></div>
  </div>
</div>

<div class="doc-modal" id="doc-modal" aria-hidden="true">
  <div class="doc-modal__backdrop" data-doc-close></div>
  <div class="doc-modal__panel" role="dialog" aria-modal="true" aria-labelledby="doc-modal-link">
    <button class="doc-modal__close" type="button" aria-label="Close document viewer" data-doc-close>&times;</button>
    <div class="doc-modal__toolbar">
      <a class="doc-modal__link" id="doc-modal-link" href="#" target="_blank" rel="noopener noreferrer">Open PDF in new tab</a>
    </div>
    <iframe class="doc-modal__frame" id="doc-modal-frame" title="Document viewer"></iframe>
  </div>
</div>

<script src="/assets/js/project-modal.js" defer></script>
<script src="/assets/js/hero-scroll.js" defer></script>
<script src="/assets/js/showcase.js" defer></script>
