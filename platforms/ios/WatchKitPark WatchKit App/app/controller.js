var uuid = NSUUID.alloc().init();
var uuidString = uuid.UUIDString;

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
  },
  willActivate: function() {
    this.super.willActivate();
  },
  didDeactivate: function() {
    this.super.didDeactivate();
  },
  "sliderValueChanged:": function(value) {
    parkingDuration = value;
    this._timeLabel.setText(value + "Minutes");
  },
  slider: function() {
    return this._slider;
  },
  "setSlider:": function(value) {
    this._slider = value;
  },
  parkTapped: function() {
    console.log("tapped at: " + parkingDuration);
    var url  = NSURL.URLWithString("");

    var date = NSDate.alloc().init();
    var dateFormatter = NSDateFormatter.alloc().init();
    dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS";
    var dateString = dateFormatter.stringFromDate(date);
    var response, error = null;

    var requestData = NSMutableDictionary.alloc().init();
    requestData.setObjectForKey(uuidString, "userID");
    requestData.setObjectForKey(dateString, "timeParked");
    requestData.setObjectForKey(parkingDuration, "parkingDuration");
    var jsonData = NSJSONSerialization.dataWithJSONObjectOptionsError(requestData, NSJSONWritingPrettyPrinted, error);
    var jsonString = NSString.alloc().initWithDataEncoding(jsonData, NSUTF8StringEncoding);


    console.log(jsonString);

    var request = NSMutableURLRequest.requestWithURL(url);
    request.HTTPMethod = "POST";
    request.setValueForHTTPHeaderField("123", "auth");
    request.setValueForHTTPHeaderField("application/json", "content-type");
    request.setValueForHTTPHeaderField(uuidString, "userID");
    request.setValueForHTTPHeaderField(dateString, "timeParked");
    request.setValueForHTTPHeaderField(parkingDuration.toString(), "parkingDuration");
    request.postBody = jsonData;

    var sessionConfig = NSURLSessionConfiguration.defaultSessionConfiguration();
    var queue = NSOperationQueue.mainQueue();
    var session = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, null, queue);

    var dataTask = session.dataTaskWithRequestCompletionHandler(request, function(data, response, error) {
      if (error) {
        console.log(error);
      } else {
        var string = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding);
        console.log(string);
      }
    });
    dataTask.resume();

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
    var url  = NSURL.URLWithString("");
    var requestData = NSMutableDictionary.alloc().init();
    requestData.setObjectForKey(uuidString, "userID");

    var response, error = null;
    var jsonData = NSJSONSerialization.dataWithJSONObjectOptionsError(requestData, NSJSONWritingPrettyPrinted, error);
    var request = NSMutableURLRequest.requestWithURL(url);
    request.HTTPMethod = "POST";
    request.setValueForHTTPHeaderField(uuidString, "userID");
    request.setValueForHTTPHeaderField("123", "auth");

    var sessionConfig = NSURLSessionConfiguration.defaultSessionConfiguration();
    var queue = NSOperationQueue.mainQueue();
    var session = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, null, queue);

    var dataTask = session.dataTaskWithRequestCompletionHandler(request, function(data, response, error) {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    });
    dataTask.resume();
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
