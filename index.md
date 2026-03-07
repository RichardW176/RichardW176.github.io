---
layout: page
title: Home
---
<link rel="stylesheet" href="/assets/custom.css">
# Ruiqian (Richard) Wang

Welcome to my personal site.

## Video Games

<div class="project-grid">
{% assign sorted_projects = site.projects | sort: "order" %}
{% for project in sorted_projects %}
  <div class="project-card">
    <a href="{{ project.url }}">
      <img src="{{ project.image }}" alt="{{ project.title }}">
      <h3>{{ project.title }}</h3>
    </a>
  </div>
{% endfor %}
</div>

## Prose

<div class="project-grid">
{% assign sorted_prose = site.prose | sort: "order" %}
{% for piece in sorted_prose %}
  <div class="project-card">
    <a href="{{ piece.url }}">
      <img src="{{ piece.image }}" alt="{{ piece.title }}">
      <h3>{{ piece.title }}</h3>
    </a>
  </div>
{% endfor %}
</div>
