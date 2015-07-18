console.log("Hello World!");

var InterfaceController = WKInterfaceController.extend({
  awakeWithContext: function(context) {
    this.super.awakeWithContext(context);
    this._optionsTable.setNumberOfRowsWithRowType(2, "tableRowController");
    var row1 = this._optionsTable.rowControllerAtIndex(0);
    var row2 = this._optionsTable.rowControllerAtIndex(1);
    row1._interfaceLabel.setText("Park");
    //       row1._interfaceImage.setImage(UIImage.imageNamed("transport122.png"));
    row2._interfaceLabel.setText("Time remaining");
    //       row2._interfaceImage.setImage(UIImage.imageNamed("clock136.png"));
    console.log("loaded?");
  },
  willActivate: function() {
    this.super.willActivate();
    console.log("InterfaceController: willActivate");
  },
  didDeactivate: function() {
    this.super.didDeactivate();
    console.log("InterfaceController: didDeactivate");
  },
  optionsTable: function() {
    return this._optionsTable;
  },
  "setOptionsTable:": function(value) {
    this._optionsTable = value;
    console.log("Set table: " + value);
  }
}, {
  name: "InterfaceController",
  exposedMethods: {
    loadTable: {
      returns: interop.types.void,
      params: []
    },
    optionsTable: {
      returns: interop.types.id,
      params: []
    },
    "setOptionsTable:": {
      returns: interop.types.void,
      params: [interop.types.id]
    }
  }
});

var TableRowController = NSObject.extend({
  //  interfaceImage: function() { return this._interfaceImage; },
  interfaceLabel: function() {
    return this._interfaceLabel;
  },
  //  "setInterfaceImage:": function(image) { this._interfaceImage = image; },
  "setInterfaceLabel:": function(label) {
    this._interfaceLabel = label;
  }
}, {
  name: "TableRowController",
  exposedMethods: {
    //        interfaceImage: { returns: interop.types.id, params: [] },
    interfaceLabel: {
      returns: interop.types.id,
      params: []
    },
    "setInterfaceLabel:": {
      returns: interop.types.void,
      params: [interop.types.id]
    }
    //        "setInterfaceImage:": { returns: interop.types.void, params: [interop.types.id] }
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
