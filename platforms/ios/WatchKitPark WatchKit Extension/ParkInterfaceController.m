//
//  ParkInterfaceController.m
//  WatchKitPark
//
//  Created by Antony Bello on 7/20/15.
//  Copyright (c) 2015 Telerik. All rights reserved.
//

#import "ParkInterfaceController.h"

@interface ParkInterfaceController()
@property (weak, nonatomic) IBOutlet WKInterfaceLabel *sliderLabel;
@property (weak, nonatomic) IBOutlet WKInterfaceSeparator *separator;
@property (weak, nonatomic) IBOutlet WKInterfaceLabel *headerLabel;
@property (weak, nonatomic) IBOutlet WKInterfaceSlider *slider;
@end

@implementation ParkInterfaceController

- (void)awakeWithContext:(id)context {
    [super awakeWithContext:context];

    // Configure interface objects here.
}

- (void)willActivate {
    // This method is called when watch view controller is about to be visible to user
    [super willActivate];
}

- (void)didDeactivate {
    // This method is called when watch view controller is no longer visible
    [super didDeactivate];
}

- (IBAction)sliderValueChanged:(float)value {
}

- (IBAction)parkTapped {
}

@end
