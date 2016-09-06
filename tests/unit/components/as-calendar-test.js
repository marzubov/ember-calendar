import hbs from 'htmlbars-inline-precompile';
import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';

import {
  timeSlotHeight,
  dayWidth,
  selectTime,
  resizeOccurrence,
  dragOccurrence,
  selectNextWeek,
  selectPreviousWeek
} from 'ember-calendar/test-helpers/all';

moduleForComponent('as-calendar', 'AsCalendarComponent', {
  integration: true,

  beforeEach: function() {
    this.set('occurrences', Ember.A());

    this.on('calendarAddOccurrence', (occurrence) => {
      this.get('occurrences').pushObject(occurrence);
    });

    this.on('calendarRemoveOccurrence', (occurrence) => {
      this.get('occurrences').removeObject(occurrence);
    });

    this.on('calendarUpdateOccurrence', (occurrence, properties) => {
      occurrence.setProperties(properties);
    });
  }
});

test('Add an occurrence', function(assert) {
  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      dayStartingTime="9:00"
      dayEndingTime="18:00"
      timeSlotDuration="00:30"
      onAddOccurrence=(action "calendarAddOccurrence")
      onUpdateOccurrence=(action "calendarUpdateOccurrence")
      onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
  `);

  assert.equal(Ember.$('.as-calendar-occurrence').length, 0,
    'it shows an empty calendar'
  );

  selectTime({ day: 0, timeSlot: 0 });

  assert.equal(Ember.$('.as-calendar-occurrence').length, 1,
    'it adds the occurrence to the calendar'
  );

  assert.ok(this.get('occurrences.firstObject').startsAt instanceof Date,
    'startsAt is a Date'
  );

  assert.ok(this.get('occurrences.firstObject').endsAt instanceof Date,
    'endsAt is a Date'
  );
});

test('Remove an occurrence', function(assert) {
  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      dayStartingTime="9:00"
      dayEndingTime="18:00"
      timeSlotDuration="00:30"
      onAddOccurrence=(action "calendarAddOccurrence")
      onUpdateOccurrence=(action "calendarUpdateOccurrence")
      onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
  `);

  selectTime({ day: 0, timeSlot: 0 });

  assert.equal(Ember.$('.as-calendar-occurrence').length, 1,
    'it adds the occurrence to the calendar'
  );

  Ember.run(() => {
    Ember.$('.as-calendar-occurrence .as-calendar-occurrence__remove').click();
  });

  assert.equal(Ember.$('.as-calendar-occurrence').length, 0,
    'it removes the occurrence from the calendar'
  );
});


test('Resize an occurrence', function(assert) {
  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      dayStartingTime="9:00"
      dayEndingTime="18:00"
      timeSlotDuration="00:30"
      defaultOccurrenceDuration="00:30"
      onAddOccurrence=(action "calendarAddOccurrence")
      onUpdateOccurrence=(action "calendarUpdateOccurrence")
      onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
  `);

  selectTime({ day: 0, timeSlot: 0 });

  assert.equal(Ember.$('.as-calendar-occurrence').length, 1,
    'it adds the occurrence to the calendar'
  );

  resizeOccurrence(Ember.$('.as-calendar-occurrence'), { timeSlots: 2 });

  assert.equal(Ember.$('.as-calendar-occurrence').height(), timeSlotHeight() * 3,
    'it resizes the occurrence');
});

test('Drag an occurrence', function(assert) {
  const pixelAccuracy = 5;
  let assertAlmostEqual = function(first, second, message) {
    assert.ok(Math.abs(first - second) < pixelAccuracy, message);
  };

  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      dayStartingTime="9:00"
      dayEndingTime="18:00"
      timeSlotDuration="00:30"
      onAddOccurrence=(action "calendarAddOccurrence")
      onUpdateOccurrence=(action "calendarUpdateOccurrence")
      onRemoveOccurrence=(action "calendarRemoveOccurrence")}}
  `);

  selectTime({ day: 0, timeSlot: 0 });

  assert.equal(this.$('.as-calendar-occurrence').length, 1,
    'it adds the occurrence to the calendar'
  );

  dragOccurrence(this.$('.as-calendar-occurrence'), { days: 2, timeSlots: 4 });

  var $occurrence = this.$('.as-calendar-occurrence');

  var dayOffset = $occurrence.offset().left -
    this.$('.as-calendar-timetable-content').offset().left;

  var timeSlotOffset = $occurrence.offset().top -
    this.$('.as-calendar-timetable-content').offset().top;

  assertAlmostEqual(dayOffset, dayWidth() * 2,
    'it drags the occurrence to the correct day'
  );

  assertAlmostEqual(timeSlotOffset, timeSlotHeight() * 4,
    'it drags the occurrence to the correct timeslot'
  );

  assertAlmostEqual($occurrence.height(), timeSlotHeight() * 2,
    'it keeps the duration of the occurrence'
  );
});

test('Change week', function(assert) {

  var weekIndex = 0;

  this.on('navigateWeek', (index) => {
    weekIndex += index;
  });

  this.render(hbs`
    {{as-calendar
      title="Ember Calendar"
      occurrences=occurrences
      onRemoveOccurrence=(action "calendarRemoveOccurrence")
      onNavigateWeek=(action "navigateWeek")}}
  `);

  selectNextWeek();

  assert.equal(weekIndex, 1, 'it navigates to the next week');

  selectPreviousWeek();

  assert.equal(weekIndex, 0, 'it navigates back to the current week');
});
