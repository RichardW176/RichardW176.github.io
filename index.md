---
layout: page
title: Home
---
<link rel="stylesheet" href="/assets/custom.css">
# Ruiqian (Richard) Wang

Welcome to my personal site.

## Projects

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
