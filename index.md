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

<div class="project-sequence">
{% assign sorted_projects = site.projects | sort: "order" %}
{% for project in sorted_projects %}

  <section class="project-showcase" id="{{ project.title | slugify }}">
    <div class="project-showcase__stage">
      <div class="project-showcase__poster-column">
        <div class="project-showcase__poster-frame">
          <img class="project-showcase__poster" src="{{ project.image }}" alt="{{ project.title }}">
        </div>
      </div>

      <aside class="project-showcase__summary">
        <p class="project-showcase__eyebrow">Overview</p>
        <p class="project-showcase__index">{{ forloop.index | prepend: '0' }}</p>
        <h2 class="project-showcase__title">{{ project.title }}</h2>
        <p class="project-showcase__role">
          {% assign project_roles = project.role | split: ", " %}
          {% for role in project_roles %}
            <strong>{{ role }}</strong>{% unless forloop.last %}, {% endunless %}
          {% endfor %}
        </p>
        <p class="project-showcase__desc">{{ project.description }}</p>
      </aside>
    </div>

    <article class="project-showcase__body project-page-inner">
      <div class="project-showcase__details">
        <div class="project-content">
          {{ project.content | markdownify }}
        </div>

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
      </div>
    </article>
  </section>

{% endfor %}
</div>

<script src="/assets/js/project-modal.js" defer></script>
