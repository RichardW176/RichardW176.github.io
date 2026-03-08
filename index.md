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

<div class="prose-grid">
{% assign sorted_prose = site.prose | sort: "order" %}
{% for piece in sorted_prose %}
  <a href="{{ piece.url }}" class="prose-card">
    <h3>{{ piece.title }}</h3>
  </a>
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
