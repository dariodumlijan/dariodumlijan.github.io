---
order: 4
title: "Project Status"
description: "Open-source, zero cost SPA (React) app for displaying projects/softwares current status, release notes & roadmap"
language: "React"
---

# Project Status

An open-source, zero cost SPA (React) app for displaying projects'/softwares' current status, release notes & roadmap

Live example site at [project-status.dariodumlijan.com](https://project-status.dariodumlijan.com)

Checkout the code at [git/project-status](https://github.com/dariodumlijan/project-status)

### Ok, but why?

Whenever you have a public, user-facing application that should be up 24/7, there will come a time when a bug will disrupt your weekend. A small status page is always useful for quickly communicating to the end user that a team is aware of an issue and is working on it. Reducing at least some amount of angry messages from clients asking is the fix deployed!

This template can be used as a basic status page. And because it is using GitHub resources, there is zero cost to host and maintain it.

Using [GitHubs' API](https://docs.github.com/en/rest/quickstart?apiVersion=2022-11-28) we are getting:

- **Release notes**, from projects' [latest release](https://github.com/dariodumlijan/project-status/releases)
- **Current status**, from [this issues'](https://github.com/dariodumlijan/project-status/issues/1) description
- **Individual service statuses**, from [these sub issues](https://github.com/dariodumlijan/project-status/issues/1)
- **Roadmap**, from [this project](https://github.com/users/dariodumlijan/projects/2)

<br />

![feature_graphic](@images/projects/project_status/feature_graphic.webp)
