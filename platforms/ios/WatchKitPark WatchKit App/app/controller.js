var uuid = NSUUID.alloc().init();

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
var parkingDuration;
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
  "sliderValueChanged:": function(value) {
    parkingDuration = value;
    console.log("time: " + parkingDuration);
    this._timeLabel.setText(value + "Minutes");
  },
  slider: function() {
    return this._slider;
  },
  "setSlider:": function(value) {
    console.log("slider set");
    this._slider = value;
  },
  parkTapped: function() {

    // var url = NSURL.URLWithString("http://api.openweathermap.org/data/2.5/weather?q=Cupertino,usa");
    console.log("tapped at: " + parkingDuration);

    var date = NSDate.alloc().init();
    var response, error = null;
    var url = NSURL.URLWithString("key here.");
    var requestData = NSDictionary.alloc().initWithObjectsAndKeys(uuid, "userID", date, "timeParked", parkingDuration, "parkingDuration", null);

    var requestArray = NSMutableArray.alloc().init();
    requestArray.addObject(requestData);

    var finalRequestBody = NSJSONSerialization.JSONObjectWithDataOptionsError(requestArray, NSJSONWritingPrettyPrinted, error);

    var request = NSURLRequest.requestWithURL(url);
    request.setHTTPBody(finalRequestBody);
    request.setHTTPMethod("POST");

    var responseData = NSURLConnection.sendSynchronousRequestReturningResponseError(request, response, error);
    var json = NSJSONSerialization.JSONObjectWithDataOptionsError(data, null, error);
    console.log(responseData);
    console.log(json);
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
    "sliderValueChanged:": {
      returns: interop.types.void,
      params: [interop.types.float]
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

var TimeInterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
  },
  willActivate: function() {
    this.super.willActivate();
  },
  didDeactivate: function() {
    this.super.didDeactivate();
  },
  timeLabel: function() {
    return this._timeLabel;
  },
  "setTimeLabel:": function(value) {
    this._timeLabel = value;
  }
}, {
  name: "TimeInterfaceController",
  exposedMethods: {
    timeLabel: {
      returns: interop.types.id,
      params: []
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
