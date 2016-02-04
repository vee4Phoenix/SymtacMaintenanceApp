//
//  CPPlugin.h
//  ProjectName
//
//  Created by Hubert Yap on 20/06/2014.
//
//

#import <Cordova/CDVPlugin.h>

@interface CPPlugin : CDVPlugin

//- (void)methodName:(CDVInvokedUrlCommand *)command;
- (void)setTickets:(CDVInvokedUrlCommand *)command;
- (void)getTickets:(CDVInvokedUrlCommand *)command;
- (void)setVisuals:(CDVInvokedUrlCommand *)command;
- (void)getVisuals:(CDVInvokedUrlCommand *)command;
- (void)setVisualFiles:(CDVInvokedUrlCommand *)command;
- (void)getVisualFiles:(CDVInvokedUrlCommand *)command;
- (void)setPreference:(CDVInvokedUrlCommand *)command;
- (void)getPreference:(CDVInvokedUrlCommand *)command;
- (void)setProjects:(CDVInvokedUrlCommand *)command;
- (void)getProjects:(CDVInvokedUrlCommand *)command;
- (void)setTasks:(CDVInvokedUrlCommand *)command;
- (void)getTasks:(CDVInvokedUrlCommand *)command;

@end
