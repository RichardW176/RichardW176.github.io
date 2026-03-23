---
layout: page
title: Home
---

<section class="hero">
  <div class="hero-media" aria-hidden="true">
    <video
      class="hero-media__video"
      data-autoplay-when-visible="true"
      loop
      muted
      playsinline
      preload="metadata">
      <source src="/assets/Overdawn%20Menu.mp4" type="video/mp4">
    </video>
  </div>
  <div class="hero-inner">
    <p class="hero-role">COMBAT DESIGNER • NARRATIVE DESIGNER • FILMMAKER</p>
    <div class="hero-name-stack">
      <h1 class="hero-title">Ruiqian<br>Wang</h1>
    </div>
    <p class="hero-tagline">
      Hi! I'm Ruiqian (Richard), a creative passionate about narrative, boss design, and screenwriting.
    </p>
  </div>
</section>

<link rel="stylesheet" href="/assets/custom.css">

<section class="portfolio-panel" id="video-games">
  <nav class="portfolio-nav" aria-label="Portfolio sections">
    <a class="portfolio-nav__link portfolio-nav__link--active" href="#video-games" aria-current="page">Video Games</a>
    <a class="portfolio-nav__link" href="#writing-samples">Writing Samples</a>
  </nav>

<div class="project-sequence">
{% assign sorted_projects = site.projects | sort: "order" %}
{% for project in sorted_projects %}

  <section
    class="project-showcase"
    id="{{ project.title | slugify }}"
    {% if project.accent_rgb %}style="--project-accent-rgb: {{ project.accent_rgb }};"{% endif %}>
    <div class="project-showcase__stage">
      <div class="project-showcase__poster-column">
        <div class="project-showcase__poster-frame{% if project.poster_frame_flush %} project-showcase__poster-frame--flush{% endif %}{% if project.poster_frame_borderless %} project-showcase__poster-frame--borderless{% endif %}">
          <img
            class="project-showcase__poster{% if project.poster_fit %} project-showcase__poster--{{ project.poster_fit }}{% endif %}"
            src="{{ project.image }}"
            {% if project.poster_position %}style="object-position: {{ project.poster_position }};"{% endif %}
            alt="{{ project.title }}">
        </div>
      </div>

      <aside class="project-showcase__summary{% if project.video or project.video_sources %} project-showcase__summary--with-video{% endif %}">
        {% if project.video or project.video_sources %}
        <div class="project-showcase__summary-video">
          <video
            class="project-showcase__summary-video-media"
            data-autoplay-when-visible="true"
            loop
            muted
            playsinline
            preload="metadata"
            aria-label="{{ project.title }} preview video">
            {% if project.video_sources %}
              {% for video_source in project.video_sources %}
            <source src="{{ video_source }}" type="video/mp4">
              {% endfor %}
            {% elsif project.video %}
            <source src="{{ project.video }}" type="video/mp4">
            {% endif %}
          </video>
        </div>
        {% if project.inline_awards and project.awards %}
        <div class="project-showcase__summary-awards" aria-label="{{ project.title }} awards">
          {% for award in project.awards %}
          <figure class="project-showcase__summary-award">
            <img
              src="{{ award.file }}"
              alt="{{ award.alt | default: award.title | default: project.title }}"
              class="project-showcase__summary-award-image">
          </figure>
          {% endfor %}
        </div>
        {% endif %}
        {% endif %}
        <div class="project-showcase__summary-content">
        {% unless project.hide_summary_intro %}
        <p class="project-showcase__eyebrow">Overview</p>
        <p class="project-showcase__index">{{ forloop.index | prepend: '0' }}</p>
        {% endunless %}
        <h2 class="project-showcase__title">{{ project.title }}</h2>
        {% if project.role_display %}
        <p class="project-showcase__role">{{ project.role_display }}</p>
        {% else %}
        <p class="project-showcase__role">
          {% assign project_roles = project.role | split: ", " %}
          {% for role in project_roles %}
            <strong>{{ role }}</strong>{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        </p>
        {% endif %}
        {% if project.stage or project.timeline or project.engine %}
        <p class="project-showcase__meta">
          {% if project.stage %}<span>{{ project.stage }}</span>{% endif %}
          {% if project.stage and project.timeline %}<span class="project-showcase__meta-sep">&middot;</span>{% endif %}
          {% if project.timeline %}<span>{{ project.timeline }}</span>{% endif %}
          {% if project.engine and (project.stage or project.timeline) %}<span class="project-showcase__meta-sep">&middot;</span>{% endif %}
          {% if project.engine %}<span>{{ project.engine }}</span>{% endif %}
        </p>
        {% endif %}
        {% if project.description and project.description != "" %}
        <p class="project-showcase__desc">{{ project.description }}</p>
        {% endif %}
        </div>
      </aside>
    </div>

    {% if project.secondary_video %}
    <div class="project-showcase__secondary-feature">
      <div class="project-showcase__secondary-video">
        <video
          class="project-showcase__secondary-video-media"
          data-autoplay-when-visible="true"
          loop
          muted
          playsinline
          preload="metadata"
          aria-label="{{ project.title }} secondary preview video">
          <source src="{{ project.secondary_video }}" type="video/mp4">
        </video>
        {% if project.secondary_video_title or project.secondary_video_subtitle %}
        <div class="project-showcase__secondary-video-copy">
          {% if project.secondary_video_title %}
          <h3 class="project-showcase__secondary-video-title">{{ project.secondary_video_title }}</h3>
          {% endif %}
          {% if project.secondary_video_subtitle %}
          <p class="project-showcase__secondary-video-subtitle">{{ project.secondary_video_subtitle }}</p>
          {% endif %}
        </div>
        {% endif %}
      </div>
      {% if project.secondary_feature_heading or project.secondary_feature_items or project.secondary_feature_media %}
      <div class="project-showcase__secondary-panel">
        {% if project.secondary_feature_heading %}
        <h3 class="project-showcase__secondary-panel-heading">{{ project.secondary_feature_heading }}</h3>
        {% endif %}
        {% if project.secondary_feature_items %}
        <div class="project-showcase__secondary-panel-copy">
          {% for item in project.secondary_feature_items %}
          <p class="project-showcase__secondary-panel-line"><strong>{{ item.label }}:</strong> {{ item.text }}</p>
          {% endfor %}
        </div>
        {% endif %}
        {% if project.secondary_feature_media %}
        <div class="project-showcase__secondary-panel-media">
          {% for item in project.secondary_feature_media %}
          <figure class="project-showcase__secondary-panel-card">
            <img
              src="{{ item.file }}"
              alt="{{ item.alt | default: project.title }}"
              class="project-showcase__secondary-panel-image">
            {% if item.description %}
            <figcaption>{{ item.description }}</figcaption>
            {% endif %}
          </figure>
          {% endfor %}
        </div>
        {% endif %}
      </div>
      {% endif %}
    </div>
    {% endif %}

    {% if project.tertiary_video %}
    <div class="project-showcase__secondary-feature">
      <div class="project-showcase__secondary-video">
        <video
          class="project-showcase__secondary-video-media"
          data-autoplay-when-visible="true"
          loop
          muted
          playsinline
          preload="metadata"
          {% if project.tertiary_video_position %}style="object-position: {{ project.tertiary_video_position }};"{% endif %}
          aria-label="{{ project.title }} tertiary preview video">
          <source src="{{ project.tertiary_video }}" type="video/mp4">
        </video>
        {% if project.tertiary_video_title or project.tertiary_video_subtitle %}
        <div class="project-showcase__secondary-video-copy">
          {% if project.tertiary_video_title %}
          <h3 class="project-showcase__secondary-video-title">{{ project.tertiary_video_title }}</h3>
          {% endif %}
          {% if project.tertiary_video_subtitle %}
          <p class="project-showcase__secondary-video-subtitle">{{ project.tertiary_video_subtitle }}</p>
          {% endif %}
        </div>
        {% endif %}
      </div>
      {% if project.tertiary_feature_heading or project.tertiary_feature_items or project.tertiary_feature_media %}
      <div class="project-showcase__secondary-panel">
        {% if project.tertiary_feature_heading %}
        <h3 class="project-showcase__secondary-panel-heading">{{ project.tertiary_feature_heading }}</h3>
        {% endif %}
        {% if project.tertiary_feature_items %}
        <div class="project-showcase__secondary-panel-copy">
          {% for item in project.tertiary_feature_items %}
          <p class="project-showcase__secondary-panel-line"><strong>{{ item.label }}:</strong> {{ item.text }}</p>
          {% endfor %}
        </div>
        {% endif %}
        {% if project.tertiary_feature_media %}
        <div class="project-showcase__secondary-panel-media">
          {% for item in project.tertiary_feature_media %}
          <figure class="project-showcase__secondary-panel-card">
            <img
              src="{{ item.file }}"
              alt="{{ item.alt | default: project.title }}"
              class="project-showcase__secondary-panel-image">
            {% if item.description %}
            <figcaption>{{ item.description }}</figcaption>
            {% endif %}
          </figure>
          {% endfor %}
        </div>
        {% endif %}
      </div>
      {% endif %}
    </div>
    {% endif %}

    {% if project.quinary_video %}
    <div class="project-showcase__secondary-feature">
      <div class="project-showcase__secondary-video">
        <video
          class="project-showcase__secondary-video-media"
          data-autoplay-when-visible="true"
          loop
          muted
          playsinline
          preload="metadata"
          {% if project.quinary_video_position %}style="object-position: {{ project.quinary_video_position }};"{% endif %}
          aria-label="{{ project.title }} quinary preview video">
          <source src="{{ project.quinary_video }}" type="video/mp4">
        </video>
        {% if project.quinary_video_title or project.quinary_video_subtitle %}
        <div class="project-showcase__secondary-video-copy">
          {% if project.quinary_video_title %}
          <h3 class="project-showcase__secondary-video-title">{{ project.quinary_video_title }}</h3>
          {% endif %}
          {% if project.quinary_video_subtitle %}
          <p class="project-showcase__secondary-video-subtitle">{{ project.quinary_video_subtitle }}</p>
          {% endif %}
        </div>
        {% endif %}
      </div>
      {% if project.quinary_feature_heading or project.quinary_feature_items or project.quinary_feature_media %}
      <div class="project-showcase__secondary-panel">
        {% if project.quinary_feature_heading %}
        <h3 class="project-showcase__secondary-panel-heading">{{ project.quinary_feature_heading }}</h3>
        {% endif %}
        {% if project.quinary_feature_items %}
        <div class="project-showcase__secondary-panel-copy">
          {% for item in project.quinary_feature_items %}
          <p class="project-showcase__secondary-panel-line"><strong>{{ item.label }}:</strong> {{ item.text }}</p>
          {% endfor %}
        </div>
        {% endif %}
        {% if project.quinary_feature_media %}
        <div class="project-showcase__secondary-panel-media">
          {% for item in project.quinary_feature_media %}
          <figure class="project-showcase__secondary-panel-card">
            <img
              src="{{ item.file }}"
              alt="{{ item.alt | default: project.title }}"
              class="project-showcase__secondary-panel-image">
            {% if item.description %}
            <figcaption>{{ item.description }}</figcaption>
            {% endif %}
          </figure>
          {% endfor %}
        </div>
        {% endif %}
      </div>
      {% endif %}
    </div>
    {% endif %}

    {% if project.quaternary_video %}
    <div class="project-showcase__secondary-feature">
      <div class="project-showcase__secondary-video">
        <video
          class="project-showcase__secondary-video-media"
          data-autoplay-when-visible="true"
          loop
          muted
          playsinline
          preload="metadata"
          {% if project.quaternary_video_position %}style="object-position: {{ project.quaternary_video_position }};"{% endif %}
          aria-label="{{ project.title }} quaternary preview video">
          <source src="{{ project.quaternary_video }}" type="video/mp4">
        </video>
        {% if project.quaternary_video_title or project.quaternary_video_subtitle %}
        <div class="project-showcase__secondary-video-copy">
          {% if project.quaternary_video_title %}
          <h3 class="project-showcase__secondary-video-title">{{ project.quaternary_video_title }}</h3>
          {% endif %}
          {% if project.quaternary_video_subtitle %}
          <p class="project-showcase__secondary-video-subtitle">{{ project.quaternary_video_subtitle }}</p>
          {% endif %}
        </div>
        {% endif %}
      </div>
      {% if project.quaternary_feature_heading or project.quaternary_feature_items or project.quaternary_feature_media %}
      <div class="project-showcase__secondary-panel">
        {% if project.quaternary_feature_heading %}
        <h3 class="project-showcase__secondary-panel-heading">{{ project.quaternary_feature_heading }}</h3>
        {% endif %}
        {% if project.quaternary_feature_items %}
        <div class="project-showcase__secondary-panel-copy">
          {% for item in project.quaternary_feature_items %}
          <p class="project-showcase__secondary-panel-line"><strong>{{ item.label }}:</strong> {{ item.text }}</p>
          {% endfor %}
        </div>
        {% endif %}
        {% if project.quaternary_feature_media %}
        <div class="project-showcase__secondary-panel-media">
          {% for item in project.quaternary_feature_media %}
          <figure class="project-showcase__secondary-panel-card">
            <img
              src="{{ item.file }}"
              alt="{{ item.alt | default: project.title }}"
              class="project-showcase__secondary-panel-image">
            {% if item.description %}
            <figcaption>{{ item.description }}</figcaption>
            {% endif %}
          </figure>
          {% endfor %}
        </div>
        {% endif %}
      </div>
      {% endif %}
    </div>
    {% endif %}

    {% unless project.hide_body %}
    <article class="project-showcase__body project-page-inner">
      <div class="project-showcase__details">
        <div class="project-content">
          {{ project.content | markdownify }}
        </div>

        {% if project.media %}
        <section class="project-media">
          <h3>Media</h3>
          <div class="project-media-grid">
            {% for item in project.media %}
            <figure class="project-media-card">
              <img src="{{ item.file }}" alt="{{ item.alt | default: project.title }}" class="project-media-image">
              {% if item.description %}
              <figcaption>{{ item.description }}</figcaption>
              {% endif %}
            </figure>
            {% endfor %}
          </div>
        </section>
        {% endif %}

        {% if project.docs %}
        {% assign preview_docs = project.docs | where_exp: "doc", "doc.preview == true" %}
        {% assign standard_docs = project.docs | where_exp: "doc", "doc.preview != true" %}
        <section class="project-docs">
          <h3>Documents</h3>
          {% if preview_docs.size > 0 %}
          <div class="project-docs-grid">
            {% for doc in preview_docs %}
            <article class="project-doc-card">
              <div class="project-doc-card__header">
                <h4>{{ doc.title }}</h4>
                <a class="project-doc-card__link" href="{{ doc.file }}" target="_blank" rel="noopener noreferrer">Open PDF</a>
              </div>
              <iframe
                class="project-doc-card__frame"
                src="{{ doc.file }}#toolbar=1&navpanes=0&scrollbar=1&zoom=page-width"
                title="{{ doc.title }}">
              </iframe>
            </article>
            {% endfor %}
          </div>
          {% endif %}

          {% if standard_docs.size > 0 %}
          <div class="project-docs-list">
            {% for doc in standard_docs %}
              <button
                type="button"
                class="project-doc-btn"
                data-doc-file="{{ doc.file }}"
                data-doc-title="{{ doc.title }}">
                {{ doc.title }}
              </button>
            {% endfor %}
          </div>
          {% endif %}
        </section>
        {% endif %}

        {% if project.scripts %}
        <section class="project-scripts">
          <h3>Scripts</h3>
          <div class="project-scripts-grid">
            {% for script in project.scripts %}
              <article
                class="project-script-card"
                data-script-file="{{ script.file }}"
                data-script-title="{{ script.title }}"
                data-script-format="{{ script.format | default: 'Yarn Script' }}"
                {% if script.content %}data-script-inline="true"{% endif %}>
                <div class="project-script-card__header">
                  <div class="project-script-card__meta">
                    <p class="project-script-card__format">{{ script.format | default: 'Yarn Script' }}</p>
                    <h4>{{ script.title }}</h4>
                  </div>
                  <a class="project-script-card__link" href="{{ script.file }}" target="_blank" rel="noopener noreferrer">Open raw file</a>
                </div>
                <pre class="project-script-card__content">{% if script.content %}{{ script.content | escape }}{% else %}Loading script...{% endif %}</pre>
              </article>
            {% endfor %}
          </div>
        </section>
        {% endif %}

        {% if project.awards %}
        <section class="project-awards">
          <h3>Awards</h3>
          <div class="project-awards-grid">
            {% for award in project.awards %}
            <figure class="project-award-card">
              <img src="{{ award.file }}" alt="{{ award.alt | default: award.title | default: project.title }}" class="project-award-image">
            </figure>
            {% endfor %}
          </div>
        </section>
        {% endif %}

        {% if project.collaborations %}
        <section class="project-collaborations">
          <h3>Collaborations</h3>
          <div class="collaboration-grid collaboration-grid--project">
            {% for item in project.collaborations %}
            <figure class="collaboration-card">
              <img src="{{ item.file }}" alt="{{ item.alt | default: project.title }}" class="collaboration-card__image">
              {% if item.description %}
              <figcaption>{{ item.description }}</figcaption>
              {% endif %}
            </figure>
            {% endfor %}
          </div>
        </section>
        {% endif %}
      </div>
    </article>
    {% endunless %}
  </section>

{% endfor %}
</div>
</section>

<section class="portfolio-panel portfolio-panel--writing" id="writing-samples">
  <nav class="portfolio-nav" aria-label="Portfolio sections">
    <a class="portfolio-nav__link" href="#video-games">Video Games</a>
    <a class="portfolio-nav__link portfolio-nav__link--active" href="#writing-samples" aria-current="page">Writing Samples</a>
  </nav>

  {% assign sorted_prose = site.prose | sort: "order" %}
  {% if sorted_prose.size > 0 %}
  <div class="writing-grid">
    {% for piece in sorted_prose %}
    <article class="writing-card">
      <p class="writing-card__eyebrow">Writing Sample</p>
      <h3 class="writing-card__title">{{ piece.title }}</h3>
      <p class="writing-card__summary">
        {% if piece.description %}
          {{ piece.description }}
        {% else %}
          {{ piece.excerpt | strip_html | strip_newlines | truncate: 220 }}
        {% endif %}
      </p>
      <div class="writing-card__content">
        {{ piece.content | markdownify }}
      </div>
      <a class="writing-card__link" href="{{ piece.url }}">Open Sample</a>
    </article>
    {% endfor %}
  </div>
  {% else %}
  <p class="writing-empty-state">Add files to <code>_prose</code> to populate this section.</p>
  {% endif %}
</section>

<script src="/assets/js/project-modal.js" defer></script>
