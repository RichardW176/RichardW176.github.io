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
    <a href="{{ project.url }}">
      <img src="{{ project.image }}" alt="{{ project.title }}">
    </a>

    <div class="project-info">
      <h3>{{ project.title }}</h3>
      <p class="project-role">{{ project.role }}</p>
      <p class="project-desc">{{ project.description }}</p>
    </div>
  </div>

{% endfor %}
</div>

## Prose

<div class="project-grid">
{% assign sorted_projects = site.projects | sort: "order" %}
{% for project in sorted_projects %}
  <div class="project-card" data-project="{{ project.slug }}">
    <img src="{{ project.image }}" alt="{{ project.title }}">

    <!-- Hidden project content -->
    <div class="project-hidden-content" id="project-{{ project.slug }}">
      <h1>{{ project.title }}</h1>
      <p>{{ project.description }}</p>
      {{ project.content }}

      {% if project.docs %}
      <div class="project-docs-list">
        {% for doc in project.docs %}
          <button
            type="button"
            class="project-doc-btn"
            data-doc-file="{{ doc.file }}">
            {{ doc.title }}
          </button>
        {% endfor %}
      </div>
      {% endif %}
    </div>
  </div>
{% endfor %}
</div>

<!-- Modal container (keeps hidden until opened) -->
<div id="project-modal" class="project-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Project details">
  <div class="project-modal__backdrop" data-modal-close></div>

  <div class="project-modal__panel" role="document">
    <button class="project-modal__close" aria-label="Close project" data-modal-close>✕</button>
    <div class="project-modal__inner" id="project-modal-inner">
      <!-- fetched project content will be injected here -->
      <div class="project-modal__spinner" aria-hidden="true">Loading…</div>
    </div>
  </div>
</div>

<!-- include the modal script -->
<script src="/assets/js/project-modal.js" defer></script>

<div id="project-modal" class="project-modal" aria-hidden="true">
  <div class="project-modal-backdrop"></div>
  <div class="project-modal-panel">
    <button class="project-modal-close">✕</button>
    <div id="project-modal-inner"></div>
  </div>
</div>
