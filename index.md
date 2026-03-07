---
layout: page
title: Home
---

<section class="hero">
  <div class="hero-inner">
    <p class="hero-role">GAME DEVELOPER • XR DESIGNER • HCI RESEARCHER</p>
    <h1 class="hero-title">Richard<br>Wang.</h1>
    <p class="hero-tagline">
      I create immersive worlds and interactive experiences across PC, mobile, and XR.
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
      <h3>{{ project.title }}</h3>
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
