---
layout: page
title: Home
---

<section class="hero">
  <div class="hero-inner">
    <p class="hero-role">GAME DEVELOPER • NARRATIVE DESIGNER • SCRIPTWRITER</p>
    <h1 class="hero-title">Ruiqian<br>Wang</h1>
    <p class="hero-tagline">
      Hi! I'm Ruiqian (Richard), a creative passionate about narrative, boss design, and screenwriting.
    </p>
  </div>
</section>

<link rel="stylesheet" href="/assets/custom.css">

## Video Games

<div class="project-grid">
{% assign sorted_projects = site.projects | sort: "order" %}
{% for project in sorted_projects %}

  <div class="project-card">
    <a href="{{ project.url }}" data-project-template="project-template-{{ forloop.index }}">
      <img src="{{ project.image }}" alt="{{ project.title }}">
    </a>

    <div class="project-info">
      <h3>{{ project.title }}</h3>
      <p class="project-role">{{ project.role }}</p>
      <p class="project-desc">{{ project.description }}</p>
    </div>
  </div>

  <template id="project-template-{{ forloop.index }}">
    <div class="project-page-inner">
      <h1>{{ project.title }}</h1>

      <div class="project-content">
        {{ project.content | markdownify }}
      </div>

      {% if project.media %}
      <section class="project-media">
        <h2>Media</h2>
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
      <section class="project-docs">
        <h2>Documents</h2>
        <div class="project-docs-list">
          {% for doc in project.docs %}
            <button
              type="button"
              class="project-doc-btn"
              data-doc-file="{{ doc.file }}"
              data-doc-title="{{ doc.title }}">
              {{ doc.title }}
            </button>
          {% endfor %}
        </div>
      </section>
      {% endif %}

      {% if project.scripts %}
      <section class="project-scripts">
        <h2>Scripts</h2>
        <div class="project-scripts-grid">
          {% for script in project.scripts %}
            <article
              class="project-script-card"
              data-script-file="{{ script.file }}"
              data-script-title="{{ script.title }}"
              data-script-format="{{ script.format | default: 'Yarn Script' }}">
              <div class="project-script-card__header">
                <div class="project-script-card__meta">
                  <p class="project-script-card__format">{{ script.format | default: 'Yarn Script' }}</p>
                  <h3>{{ script.title }}</h3>
                </div>
                <a class="project-script-card__link" href="{{ script.file }}" target="_blank" rel="noopener noreferrer">Open raw file</a>
              </div>
              <pre class="project-script-card__content">Loading script...</pre>
            </article>
          {% endfor %}
        </div>
      </section>
      {% endif %}
    </div>
  </template>

{% endfor %}
</div>

<!-- SINGLE modal container -->
<div id="project-modal" class="project-modal" aria-hidden="true">
  <div class="project-modal__backdrop" data-modal-close></div>

  <div class="project-modal__panel">
    <button class="project-modal__close" data-modal-close>✕</button>
    <div id="project-modal-inner" class="project-modal__inner"></div>
  </div>
</div>

<div id="doc-modal" class="doc-modal" aria-hidden="true">
  <div class="doc-modal__backdrop" data-doc-close></div>

  <div class="doc-modal__panel">
    <button class="doc-modal__close" data-doc-close>✕</button>
    <div class="doc-modal__toolbar">
      <a id="doc-modal-link" class="doc-modal__link" href="#" target="_blank" rel="noopener noreferrer">Open PDF in new tab</a>
    </div>
    <iframe id="doc-modal-frame" class="doc-modal__frame" title="Project PDF preview"></iframe>
  </div>
</div>

<script src="/assets/js/project-modal.js" defer></script>
