import Ember from 'ember';

var timeSlotHeight = function() {
  return Ember.$('.as-calendar-timetable-content')
    .find('.as-calendar-timetable__slot-item:first')
    .height();
};

var dayWidth = function() {
  var $content = Ember.$('.as-calendar-timetable-content');
  return $content.width() / $content.find('.as-calendar-timetable__day').length;
};

var pointForTime = function(options) {
  var $target = Ember.$('.as-calendar-timetable-content');
  var offsetX = options.day * dayWidth();
  var offsetY = options.timeSlot * timeSlotHeight();
  var pageX = $target.offset().left + offsetX;
  var pageY = $target.offset().top + offsetY;

  return {
    pageX: pageX,
    pageY: pageY,
    clientX: pageX - Ember.$(document).scrollLeft(),
    clientY: pageY - Ember.$(document).scrollTop()
  };
};

var selectTime = function(options) {
  Ember.run(() => {
    var $target = Ember.$('.as-calendar-timetable-content');
    var point = pointForTime(options);
    var event = Ember.$.Event('click');

    event.pageX = point.pageX;
    event.pageY = point.pageY;

    $target.trigger(event);
  });
};

var resizeOccurrence = function(occurrence, options) {
  Ember.run(() => {
    occurrence.find('.as-calendar-occurrence__resize-handle').simulate('drag', {
      dx: 0,
      dy: options.timeSlots * timeSlotHeight() + occurrence.height()
    });
  });
};

var dragOccurrence = function(occurrence, options) {
  Ember.run(() => {
    occurrence.simulate('drag', {
      dx: options.days * dayWidth(),
      dy: options.timeSlots * timeSlotHeight() + occurrence.height()
    });
  });
};

var selectNextWeek = function() {
  Ember.run(() => {
    Ember.$('button.as-calendar-header__nav-group-action--next-week').click();
  });
};

var selectPreviousWeek = function() {
  Ember.run(() => {
    Ember.$('button.as-calendar-header__nav-group-action--previous-week').click();
  });
};

export {
  timeSlotHeight,
  dayWidth,
  selectTime,
  resizeOccurrence,
  dragOccurrence,
  selectNextWeek,
  selectPreviousWeek
};
