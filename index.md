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
      <div class="project-overlay">
        <h3>{{ project.title }}</h3>
        <p class="project-role">{{ project.role }}</p>
        <p class="project-desc">{{ project.description }}</p>
      </div>
    </a>
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
