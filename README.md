<h1><img src="https://raw.githubusercontent.com/alphasights/ember-calendar/develop/images/logo.png" alt="Ember Calendar" width="340px"></h1>

[![Npm Version](https://badge.fury.io/js/ember-calendar.svg)](http://badge.fury.io/js/ember-calendar)
[![Ember Observer Score](http://emberobserver.com/badges/ember-calendar.svg)](http://emberobserver.com/addons/ember-calendar)
[![Code
Climate](https://codeclimate.com/github/alphasights/ember-calendar/badges/gpa.svg)](https://codeclimate.com/github/alphasights/ember-calendar)
[![Build Status](https://circleci.com/gh/alphasights/ember-calendar.svg?style=shield&circle-token=6fa581b50c5f8496cf26768394cf6c1d43dfb98e)](https://circleci.com/gh/alphasights/ember-calendar)

An awesome Ember calendar, designed with composability and reusability in mind.

![Calendar in
action](https://raw.githubusercontent.com/alphasights/ember-calendar/develop/images/calendar.png)

[Check out the demo](https://alphasights.github.io/ember-calendar/demo)

## Features

* Click to add occurrences
* Resize occurrences
* Drag and drop occurrences

## Installation

`ember install ember-calendar`

## Philosophy

Following the principle "Data down, Actions up", the calendar sends these
actions up:

* `onAddOccurrence`
* `onUpdateOccurrence`
* `onRemoveOccurrence`

In addition, you need to provide an `occurrences` Ember Array to the component.
Each occurrence should have these properties:

* `title`
* `startsAt`
* `endsAt`

The component never mutates your data, but merely decorates them and uses these
proxies to display the occurrences in the calendar. In the case you need to access
the original object in the template, it is available as `occurrence.content`.

## Basic Usage

```htmlbars
{{! app/templates/index.hbs }}
{{as-calendar
  title="Ember Calendar"
  occurrences=occurrences
  dayStartingTime="9:00"
  dayEndingTime="18:00"
  timeSlotDuration="00:30"
  onAddOccurrence=(action "calendarAddOccurrence")
  onUpdateOccurrence=(action "calendarUpdateOccurrence")
  onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
```

```javascript
// app/controllers/index.js
import Ember from 'ember';

export default Ember.Controller.extend({
  occurrences: Ember.A(),

  actions: {
    calendarAddOccurrence: function(occurrence) {
      this.get('occurrences').pushObject(Ember.Object.create({
        title: occurrence.get('title'),
        startsAt: occurrence.get('startsAt'),
        endsAt: occurrence.get('endsAt')
      }));
    },

    calendarUpdateOccurrence: function(occurrence, properties) {
      occurrence.setProperties(properties);
    },

    calendarRemoveOccurrence: function(occurrence) {
      this.get('occurrences').removeObject(occurrence);
    }
  }
});
```

## Advanced Usage

All the components which are used in the calendar are highly reusable. For
example, you can customize the appearance of the occurrences by passing a block:

```htmlbars
{{#as-calendar
  title="Schedule call"
  occurrences=occurrences
  dayStartingTime="7:00"
  dayEndingTime="21:30"
  timeSlotDuration="00:30"
  onNavigateWeek=(action "calendarNavigateWeek")
  onAddOccurrence=(action "calendarAddOccurrence") as |occurrence timetable calendar|}}
  {{#if occurrence.content.isEditable}}
    {{as-calendar/timetable/occurrence
      class="selection"
      model=occurrence
      timeSlotHeight=calendar.timeSlotHeight
      timetable=timetable
      timeSlotDuration=calendar.timeSlotDuration
      isResizable=false
      onUpdate=(action "calendarUpdateOccurrence")
      onRemove=(action "calendarRemoveOccurrence")}}
  {{else}}
    {{as-calendar/occurrence
      model=occurrence
      timeSlotHeight=calendar.timeSlotHeight
      timeSlotDuration=calendar.timeSlotDuration}}
  {{/if}}
{{/as-calendar}}
```

In this example, we check if the original occurrence is editable and either show
an occurrence which can be interacted with (`as-calendar/timetable/occurrence`)
or just a static occurrence (`as-calendar/occurrence`). Furthermore, the nested
components try to assume as less as possible about their ancestors, so we pass
in most of their attributes manually.

You can customize the time slots by passing these options:

* `dayStartingTime`
* `dayEndingTime`
* `timeSlotDuration`
* `timeSlotHeight`
* `defaultOccurrenceTitle`
* `defaultOccurrenceDuration`

## Styles

We do not add any vendor CSS to your app by default, but you can include it if you want by doing:

```scss
// app/styles/app.scss

@import 'bower_components/fontawesome/scss/variables';
@import 'bower_components/fontawesome/scss/path';
@import 'bower_components/fontawesome/scss/mixins';
@import 'bower_components/fontawesome/scss/icons';

@import 'addons/ember-calendar/paint-core';
@import 'addons/ember-calendar/main';
```

There are some basic resets applied by default on `.as-calendar`, like `box-sizing: border-box` and `list-style: none` for all inner `ul > li`s.

If you already have those resets in your app add an `$as-calendar-global-resets: false;` before loading the `main` stylesheet.

## Build Options

Font Aweseome assets are exported during a build by default which may conflict
with assets already being exported by your project. To prevent this, add
the following option to your ember-cli-build.js file:

```js
// ember-cli-build.js

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {

    // Add options here
    emberCalendar: {
      includeFontAwesomeAssets: false
    }
  });

  return app.toTree();
};
```

## Developing

### Setup

* `git clone https://github.com/alphasights/ember-calendar.git`
* `npm install && bower install`

### Running

* `ember server`

### Running Tests

* `ember test --server`

## Credits

* [ember-sortable](https://github.com/jgwhite/ember-sortable)
