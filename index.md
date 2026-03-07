---
layout: home
title: Home
---

# Hello, I'm Richard 👋

Welcome to my personal site.

## Projects

<div class="project-grid">
{% for project in site.projects %}
  <div class="project-card">
    <a href="{{ project.url }}">
      <img src="{{ project.image }}" alt="{{ project.title }}">
      <h3>{{ project.title }}</h3>
    </a>
  </div>
{% endfor %}
</div>
