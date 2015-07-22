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

    var url = NSURL.URLWithString("")

    console.log("tapped at: " + parkingDuration);

    var date = NSDate.alloc().init();
    var dateFormatter = NSDateFormatter.alloc().init();
    dateFormatter.dateFormat = "HH:mm";
    var dateString = dateFormatter.stringFromDate(date);
    console.log(dateString);
    var response, error = null;
    var uuidString = uuid.UUIDString;

    var requestData = NSMutableDictionary.alloc().init();
    requestData.setObjectForKey(uuidString, "userID");
    requestData.setObjectForKey(dateString, "timeParked");
    requestData.setObjectForKey(parkingDuration, "parkingDuration");
    var jsonData = NSJSONSerialization.dataWithJSONObjectOptionsError(requestData, NSJSONWritingPrettyPrinted, error);
    var jsonString = NSString.alloc().initWithDataEncoding(jsonData, NSUTF8StringEncoding);
    console.log(jsonString);
    var request = NSURLRequest.requestWithURL(url);
    request.setHTTPBody(jsonData);
    request.addValueForHTTPHeaderField(123,"auth");
    request.setHTTPMethod("POST");
    request.setValueForHTTPHeaderField("application/json","content-type");
    console.log("request: " + request);
    var responseData = NSURLConnection.sendSynchronousRequestReturningResponseError(request, response, error);
    var serializedResponse = NSJSONSerialization.JSONObjectWithDataOptionsError(data, null, error);
    console.log(responseData);
    console.log(serializedResponse);
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
