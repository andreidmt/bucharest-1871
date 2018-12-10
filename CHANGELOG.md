<!-- markdownlint-disable no-duplicate-header line-length -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.1] - 11 December 2018

### Change

- Fix all flow errors

## [0.2.0] - 10 December 2018

### Add

- Add [`getParams`](src/core/router.utils.js#L58) function to `router.utils`. Parse a URL against a defined route
- Add edit POI page

### Change

- Switch from `@connect` and `@withRouter` decorators to wrapper functions due to no flow support

### Remove

- Remove `jsx-control-statements` due to no flow support
- Pipeline and decorator babel plugins

## [0.1.0] - 26 November 2018

First

[Unreleased]: https://github.com/andreidcm/bucharest-1871/compare/v0.2.1...HEAD

[0.2.1]: https://github.com/andreidcm/bucharest-1871/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/andreidcm/bucharest-1871/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/andreidcm/bucharest-1871/compare/v0.1.0
