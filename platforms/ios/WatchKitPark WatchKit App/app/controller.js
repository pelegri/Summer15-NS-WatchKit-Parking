
var InterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
  },
  willActivate: function() {
    this.super.willActivate();
  },
  didDeactivate: function() {
    this.super.didDeactivate();
  },
  parkButtonTap: function() {
    this.pushControllerWithNameContext("ParkInterfaceController", null);
  },
  timeButtonTap: function() {
    this.pushControllerWithNameContext("TimeInterfaceController", null);
  }
}, {
  name: "InterfaceController",
  exposedMethods: {
    parkButtonTap: {
      returns: interop.types.void,
      params: []
    },
    timeButtonTap: {
      returns: interop.types.void,
      params: []
    }
  }
});
var time;
var ParkInterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
    console.log("park controller #summoned");
  },
  willActivate: function() {
    this.super.willActivate();
  },
  didDeactivate: function() {
    this.super.didDeactivate();
  },
  sliderValueChanged: function(value) {
    console.log("time set: " + value);
    this._timeLabel.setText(value + "Minutes");
    // return value;
  },
  slider: function() {
    return this._slider;
  },
  "setSlider:": function(value) {
    console.log("slider set");
    this._slider = value;
  },
  parkTapped: function() {
    console.log("parktapped");
    console.log("tapped at: " + time);
  },
  timeLabel: function() {
    return this._timeLabel;
  },
  "setTimeLabel:": function(value) {
    this._timeLabel = value;
  }
}, {
  name: "ParkInterfaceController",
  exposedMethods: {
    sliderValueChanged: {
      returns: interop.types.void,
      params: [interop.types.void]
    },
    parkTapped: {
      returns: interop.types.void,
      params: []
    },
    timeLabel: {
      returns: interop.types.id,
      params: []
    },
    slider: {
      returns: interop.types.id,
      params: []
    },
    "setSlider:": {
      returns: interop.types.void,
      params: [interop.types.id]
    },
    "setTimeLabel:": {
      returns: interop.types.void,
      params: [interop.types.id]
    }
  }
});

var NotificationController = WKUserNotificationInterfaceController.extend({
  willActivate: function() {
    this.super.willActivate();
    console.log("NotificationController: willActivate");
  },
  didDeactivate: function() {
    this.super.didDeactivate();
    console.log("NotificationController: didDeactivate");
  }
}, {
  name: "NotificationController"
});

var GlanceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
    console.log("GlanceController: awakeWithContext");
  },
  willActivate: function() {
    this.super.willActivate();
    console.log("GlanceController: willActivate");
  },
  didDeactivate: function() {
    this.super.didDeactivate();
    console.log("GlanceController: didDeactivate");
  }
}, {
  name: "GlanceController"
});

console.log("declared controllers");
