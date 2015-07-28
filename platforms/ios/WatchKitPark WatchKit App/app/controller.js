/*
 *
 *  WatchKit Parker
 *  A NativeScript WatchKit application that keeps track of your parking time.
 *  Antony Bello, Summer 2015.
 *
 */

var SERVER_URL = ''; // <== ENTER SERVER URL HERE

var minutesRemaining, parkingDuration;
var userDefaults = NSUserDefaults.standardUserDefaults();
setUUIDString(userDefaults);
var uuidString = getUUIDString(userDefaults);

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
  timeButtonTap: function() {
    var controller = this;
    var requestParams = setURLParamsWithEnding('getinfo');
    makeRequest('getinfo', requestParams, controller);
  },
  parkButtonTap: function() {
    this.pushControllerWithNameContext("ParkInterfaceController", null);
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

var ParkInterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
    parkingDuration = this._slider.value;
  },
  willActivate: function() {
    this.super.willActivate();
  },
  didDeactivate: function() {
    this.super.didDeactivate();
  },
  "sliderValueChanged:": function(value) {
    parkingDuration = value;
    this._sliderLabel.setText(value + " Minutes");
  },
  slider: function() {
    return this._slider;
  },
  "setSlider:": function(value) {
    this._slider = value;
  },
  parkTapped: function() {
    var controller = this;
    var requestParams = setURLParamsWithEnding('adduser');
    if (parkingDuration) {
      requestParams.setValueForHTTPHeaderField(parkingDuration.toString(), "parkingDuration");
      makeRequest('adduser', requestParams, controller);
    }
  },
  sliderLabel: function() {
    return this._sliderLabel;
  },
  "setSliderLabel:": function(value) {
    this._sliderLabel = value;
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
    sliderLabel: {
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
    "setSliderLabel:": {
      returns: interop.types.void,
      params: [interop.types.id]
    }
  }
});

var TimeInterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
    if (minutesRemaining) {
      this._timeLabel.setText("You have " + minutesRemaining + " minutes remaining.");
    } else {
      this._timeLabel.setText("Park first.")
    }
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


function setURLParamsWithEnding(ending) {
  var response, error;
  var requestData = NSMutableDictionary.alloc().init();
  requestData.setObjectForKey(uuidString, "userID");
  var jsonData = NSJSONSerialization.dataWithJSONObjectOptionsError(requestData, NSJSONWritingPrettyPrinted, error);
  var dateString = initializeDateString();
  var url = NSURL.URLWithString(SERVER_URL + '/'+ ending);
  var request = NSMutableURLRequest.requestWithURL(url);
  request.HTTPMethod = "POST";
  request.setValueForHTTPHeaderField(uuidString, "userID");
  request.setValueForHTTPHeaderField("application/json", "content-type");
  request.setValueForHTTPHeaderField("123", "auth");
  request.setValueForHTTPHeaderField(dateString, "timeParked");
  request.postBody = jsonData;
  return request;
}

function makeRequest(ending, requestParams, controller) {
  var response, error;
  var sessionConfig = NSURLSessionConfiguration.defaultSessionConfiguration();
  var queue = NSOperationQueue.mainQueue();
  var session = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, null, queue);
  var dataTask = session.dataTaskWithRequestCompletionHandler(requestParams, function(data, response, error) {
    if (error) {
      console.log(error);
      return;
    } else {
      handleResponseBasedOnEnding(ending, data, controller);
    }
  });
  dataTask.resume();
}

function handleResponseBasedOnEnding(ending, data, controller) {
  if(ending == "getinfo") {
    minutesRemaining = NSString.alloc().initWithDataEncoding(data, NSUTF8StringEncoding);
    controller.pushControllerWithNameContext("TimeInterfaceController", null);
  } else if (ending == "adduser") {
    minutesRemaining = parkingDuration;
    controller._sliderLabel.setText("Time set successfully.");
  } else {
    console.log("What the hell happened: " + ending);
  }
}

function initializeDateString() {
  var date = NSDate.alloc().init();
  var dateFormatter = NSDateFormatter.alloc().init();
  dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS";
  return dateFormatter.stringFromDate(date);
}

function setUUIDString(userDefaults) {
  if (!userDefaults.stringForKey("AUTH")) {
    var uuidRef = CFUUIDCreate(kCFAllocatorDefault);
    var uuidStringRef = CFUUIDCreateString(kCFAllocatorDefault, uuidRef);
    CFRelease(uuidRef);
    userDefaults.setObjectForKey(uuidStringRef, "AUTH");
    userDefaults.synchronize();
  }
}

function getUUIDString(userDefaults) {
  return userDefaults.stringForKey("AUTH");
}
