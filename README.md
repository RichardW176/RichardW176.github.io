# RichardW176.github.io

Portfolio site for Richard Wang. Jekyll on GitHub Pages, `minima` theme plus
`assets/custom.css`.

## Layout

    _projects/     games       -> Games tab
    _films/        films       -> Films tab
    _prose/        writing     -> Writing Samples tab
    _includes/     shared partials (film-art.html)
    _layouts/      project.html (standalone pages -- NOT linked from the site)
    index.md       the whole site: hero, tabs, every card and detail view
    assets/
      custom.css   ~3.9k lines, layered chronologically -- later blocks override
      js/          hero-scroll, showcase, project-modal
      images/      images/icarus/ and images/nim/ per film
      video/       mp4
      docs/        pdf
      scripts/     yarn dialogue

Content lives in front matter, not page bodies. Detail views are toggled with
`display` by `assets/js/showcase.js` -- they are not separate URLs, so every
view is in the DOM at once.

## Local checks

No local Jekyll (system Ruby 2.6 cannot resolve its dependencies). Instead:

    ruby /tmp/lint_liquid.rb index.md      # Liquid parses
    ruby /tmp/render_real.rb               # renders with real front matter
