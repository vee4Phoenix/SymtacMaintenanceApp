//
//  CPPlugin.m
//  ProjectName
//
//  Created by Hubert Yap on 20/06/2014.
//
//

#import "CPPlugin.h"
#import "CPUserDefaults.h"
#import "TBCoreDataStoreS1.h"
#import "NSDictionary+Serialization.h"
#import "NSManagedObject+Serialization.h"
#import "Client.h"
#import "Ticket.h"
#import "ClientVisual.h"
#import "VisualFile.h"
#import "Project.h"
#import "Task.h"

static BOOL const kDebug = YES;

@implementation CPPlugin

- (void)methodName:(CDVInvokedUrlCommand *)command {
    if (kDebug) {
        NSLog(@"methodName: %@", command.arguments);
    }

    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        // return result
        NSArray *validJSONResult = @[];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                          messageAsArray:validJSONResult];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)setClients:(CDVInvokedUrlCommand *)command
{
    if (kDebug) {
        NSLog(@"setClients: %@", command.arguments);
    }
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSError *error;
        
        NSArray *objects = [command.arguments objectAtIndex:0];
        
        for (NSDictionary *object in objects) {
            NSNumber *objectID = [object integerForKey:kCoreClientAttrID];
            
            Client *obj = (Client *)[self getObject:kCoreClient 
                                         withIDAttr:kCoreClientAttrID 
                                              andID:objectID 
                                            context:context 
                                              error:&error];
            if (error) {
                // error during fetch
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
                break;
            } else if (obj == nil) {
                // no project with same id, create new object
                NSLog(@"Inserting... %@", objectID);
                [Client initWithDictionary:object inContext:context];
            } else {
                // edit existing object
                NSLog(@"Updating... %@", objectID);
                [obj populateFromDictionary:object];
            }
        }
        
        if (error == nil) {
            // save and generate return values
            [context save:&error];
            
            // return result
            if (error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            }
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)getClients:(CDVInvokedUrlCommand *)command {
    if (kDebug) {
        NSLog(@"getClients: %@", command.arguments);
    }
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSError *error;
        
        NSFetchRequest *fr = [NSFetchRequest fetchRequestWithEntityName:kCoreClient];
        NSSortDescriptor *sortDescriptor = [NSSortDescriptor sortDescriptorWithKey:kCoreClientAttrOrganisation ascending:YES];
        fr.sortDescriptors = @[sortDescriptor];
        
        NSArray *objects = [context executeFetchRequest:fr error:&error];
        
        if (error) {
            // error during fetch
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsString:error.localizedDescription];
        } else {
            // return result
            NSMutableArray *validJSONResult = [NSMutableArray array];
            for (Client *object in objects) {
                [validJSONResult addObject:[object toDictionary]];
            }
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                              messageAsArray:validJSONResult];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)setTickets:(CDVInvokedUrlCommand *)command
{
    if (kDebug) {
        NSLog(@"setTicket: %@", command.arguments);
    }
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSError *error;
        
        NSArray *tickets = [command.arguments objectAtIndex:0];
        
        for (NSDictionary *ticket in tickets) {
            NSNumber *ticketID = [ticket integerForKey:kCoreTicketAttrID];
            
            Ticket *obj = (Ticket *)[self getObject:kCoreTicket 
                                         withIDAttr:kCoreTicketAttrID 
                                              andID:ticketID 
                                            context:context 
                                              error:&error];
            if (error) {
                // error during fetch
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
                break;
            } else if (obj == nil) {
                // no ticket with same id, create new ticket
                NSLog(@"Inserting... %@", ticketID);
                [Ticket initWithDictionary:ticket inContext:context];
            } else {
                // edit existing ticket
                NSLog(@"Updating... %@", ticketID);
                [obj populateFromDictionary:ticket];
            }
        }
        
        if (error == nil) {
            // save and generate return values
            [context save:&error];
            
            // return result
            if (error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            }
        }

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)getTickets:(CDVInvokedUrlCommand *)command {
    if (kDebug) {
        NSLog(@"getTickets: %@", command.arguments);
    }

    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSNumber *clientID = command.arguments[0];
        NSError *error;
        
        NSFetchRequest *fr = [NSFetchRequest fetchRequestWithEntityName:kCoreTicket];
        NSSortDescriptor *sortDescriptor = [NSSortDescriptor sortDescriptorWithKey:kCoreTicketAttrID ascending:NO];
        fr.sortDescriptors = @[sortDescriptor];
        NSPredicate *pred = [NSPredicate predicateWithFormat:@"self.%@ == %@", kCoreTicketAttrClientID, clientID];
        fr.predicate = pred;
        
        NSArray *tickets = [context executeFetchRequest:fr error:&error];
        
        if (error) {
            // error during fetch
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsString:error.localizedDescription];
        } else {
            // return result
            NSMutableArray *validJSONResult = [NSMutableArray array];
            for (Ticket *ticket in tickets) {
                [validJSONResult addObject:[ticket toDictionary]];
            }
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                              messageAsArray:validJSONResult];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)setVisuals:(CDVInvokedUrlCommand *)command
{
    if (kDebug) {
        NSLog(@"setVisuals: %@", command.arguments);
    }
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSError *error;
        
        NSArray *visuals = [command.arguments objectAtIndex:0];
        
        for (NSDictionary *visual in visuals) {
            NSNumber *visualID = [visual integerForKey:kCoreVisualAttrID];
            
            ClientVisual *obj = (ClientVisual *)[self getObject:kCoreVisual 
                                                     withIDAttr:kCoreVisualAttrID 
                                                          andID:visualID 
                                                        context:context 
                                                          error:&error];
            if (error) {
                // error during fetch
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
                break;
            } else if (obj == nil) {
                // no object with same id, create new object
                NSLog(@"Inserting... %@", visualID);
                [ClientVisual initWithDictionary:visual inContext:context];
            } else {
                // edit existing object
                NSLog(@"Updating... %@", visualID);
                [obj populateFromDictionary:visual];
            }
        }
        
        if (error == nil) {
            // save and generate return values
            [context save:&error];
            
            // return result
            if (error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            }
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)getVisuals:(CDVInvokedUrlCommand *)command {
    if (kDebug) {
        NSLog(@"getVisuals: %@", command.arguments);
    }

    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSNumber *clientID = command.arguments[0];
        NSError *error;
        
        NSFetchRequest *fr = [NSFetchRequest fetchRequestWithEntityName:kCoreVisual];
        NSSortDescriptor *sortDescriptor = [NSSortDescriptor sortDescriptorWithKey:kCoreVisualAttrID ascending:NO];
        fr.sortDescriptors = @[sortDescriptor];
        NSPredicate *pred = [NSPredicate predicateWithFormat:@"self.%@ == %@", kCoreVisualAttrClientID, clientID];
        fr.predicate = pred;
        
        NSArray *visuals = [context executeFetchRequest:fr error:&error];
        
        if (error) {
            // error during fetch
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsString:error.localizedDescription];
        } else {
            // return result
            NSMutableArray *validJSONResult = [NSMutableArray array];
            for (ClientVisual *visual in visuals) {
                [validJSONResult addObject:[visual toDictionary]];
            }
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                              messageAsArray:validJSONResult];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)setVisualFiles:(CDVInvokedUrlCommand *)command
{
    if (kDebug) {
        NSLog(@"setVisualFiles: %@", command.arguments);
    }
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSError *error;
        
        NSArray *visualFiles = [command.arguments objectAtIndex:0];
        
        for (NSDictionary *file in visualFiles) {
            NSNumber *fileID = [file integerForKey:kCoreVisualFileAttrID];
            
            VisualFile *obj = (VisualFile *)[self getObject:kCoreVisualFile 
                                                 withIDAttr:kCoreVisualFileAttrID 
                                                      andID:fileID 
                                                    context:context 
                                                      error:&error];
            if (error) {
                // error during fetch
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
                break;
            } else if (obj == nil) {
                // no object with same id, create new object
                NSLog(@"Inserting... %@", fileID);
                [VisualFile initWithDictionary:file inContext:context];
            } else {
                // edit existing object
                NSLog(@"Updating... %@", fileID);
                [obj populateFromDictionary:file];
            }
        }
        
        if (error == nil) {
            // save and generate return values
            [context save:&error];
            
            // return result
            if (error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            }
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)getVisualFiles:(CDVInvokedUrlCommand *)command {
    if (kDebug) {
        NSLog(@"getVisualFiles: %@", command.arguments);
    }
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSNumber *clientVisualID = command.arguments[0];
        NSError *error;
        
        NSFetchRequest *fr = [NSFetchRequest fetchRequestWithEntityName:kCoreVisualFile];
        NSSortDescriptor *sortDescriptor = [NSSortDescriptor sortDescriptorWithKey:kCoreVisualFileAttrID ascending:YES];
        fr.sortDescriptors = @[sortDescriptor];
        NSPredicate *pred = [NSPredicate predicateWithFormat:@"self.%@ == %@", kCoreVisualFileAttrClientVisualID, clientVisualID];
        fr.predicate = pred;
        
        NSArray *files = [context executeFetchRequest:fr error:&error];
        
        if (error) {
            // error during fetch
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsString:error.localizedDescription];
        } else {
            // return result
            NSMutableArray *validJSONResult = [NSMutableArray array];
            for (VisualFile *file in files) {
                [validJSONResult addObject:[file toDictionary]];
            }
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                              messageAsArray:validJSONResult];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)setProjects:(CDVInvokedUrlCommand *)command
{
    if (kDebug) {
        NSLog(@"setProjects: %@", command.arguments);
    }
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSError *error;
        
        NSArray *objects = [command.arguments objectAtIndex:0];
        
        for (NSDictionary *object in objects) {
            NSNumber *objectID = [object integerForKey:kCoreProjectAttrID];
            
            Project *obj = (Project *)[self getObject:kCoreProject 
                                           withIDAttr:kCoreProjectAttrID 
                                                andID:objectID 
                                              context:context 
                                                error:&error];
            if (error) {
                // error during fetch
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
                break;
            } else if (obj == nil) {
                // no project with same id, create new project
                NSLog(@"Inserting... %@", objectID);
                [Project initWithDictionary:object inContext:context];
            } else {
                // edit existing project
                NSLog(@"Updating... %@", objectID);
                [obj populateFromDictionary:object];
            }
        }
        
        if (error == nil) {
            // save and generate return values
            [context save:&error];
            
            // return result
            if (error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            }
        }

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)getProjects:(CDVInvokedUrlCommand *)command {
    if (kDebug) {
        NSLog(@"getProjects: %@", command.arguments);
    }

    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSNumber *clientID = command.arguments[0];
        NSError *error;
        
        NSFetchRequest *fr = [NSFetchRequest fetchRequestWithEntityName:kCoreProject];
        NSSortDescriptor *sortDescriptor = [NSSortDescriptor sortDescriptorWithKey:kCoreProjectAttrDateDue ascending:YES];
        fr.sortDescriptors = @[sortDescriptor];
        NSPredicate *pred = [NSPredicate predicateWithFormat:@"self.%@ == %@", kCoreProjectAttrClientID, clientID];
        fr.predicate = pred;
        
        NSArray *objects = [context executeFetchRequest:fr error:&error];
        
        if (error) {
            // error during fetch
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsString:error.localizedDescription];
        } else {
            // return result
            NSMutableArray *validJSONResult = [NSMutableArray array];
            for (Project *object in objects) {
                [validJSONResult addObject:[object toDictionary]];
            }
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                              messageAsArray:validJSONResult];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)setTasks:(CDVInvokedUrlCommand *)command
{
    if (kDebug) {
        NSLog(@"setTasks: %@", command.arguments);
    }
    
    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSError *error;
        
        NSArray *objects = [command.arguments objectAtIndex:0];
        
        for (NSDictionary *object in objects) {
            NSNumber *objectID = [object integerForKey:kCoreTaskAttrID];
            
            Task *obj = (Task *)[self getObject:kCoreTask 
                                     withIDAttr:kCoreTaskAttrID 
                                          andID:objectID 
                                        context:context 
                                          error:&error];
            if (error) {
                // error during fetch
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
                break;
            } else if (obj == nil) {
                // no project with same id, create new project
                NSLog(@"Inserting... %@", objectID);
                [Task initWithDictionary:object inContext:context];
            } else {
                // edit existing project
                NSLog(@"Updating... %@", objectID);
                [obj populateFromDictionary:object];
            }
        }
        
        if (error == nil) {
            // save and generate return values
            [context save:&error];
            
            // return result
            if (error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                                 messageAsString:error.localizedDescription];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            }
        }

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)getTasks:(CDVInvokedUrlCommand *)command {
    if (kDebug) {
        NSLog(@"getTasks: %@", command.arguments);
    }

    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        
        // initialise
        NSManagedObjectContext *context = [TBCoreDataStoreS1 privateQueueContext];
        NSNumber *projectID = command.arguments[0];
        NSError *error;
        
        NSFetchRequest *fr = [NSFetchRequest fetchRequestWithEntityName:kCoreTask];
        NSSortDescriptor *sortDescriptor = [NSSortDescriptor sortDescriptorWithKey:kCoreTaskAttrDateDue ascending:YES];
        NSSortDescriptor *sortDescriptor2 = [NSSortDescriptor sortDescriptorWithKey:kCoreTaskAttrID ascending:YES];
        fr.sortDescriptors = @[sortDescriptor, sortDescriptor2];
        NSPredicate *pred = [NSPredicate predicateWithFormat:@"self.%@ == %@", kCoreTaskAttrProjectID, projectID];
        fr.predicate = pred;
        
        NSArray *objects = [context executeFetchRequest:fr error:&error];
        
        if (error) {
            // error during fetch
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR
                                             messageAsString:error.localizedDescription];
        } else {
            // return result
            NSMutableArray *validJSONResult = [NSMutableArray array];
            for (Project *object in objects) {
                [validJSONResult addObject:[object toDictionary]];
            }
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                                              messageAsArray:validJSONResult];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)setPreference:(CDVInvokedUrlCommand *)command {
    if (kDebug) {
        NSLog(@"setPreference: %@", command.arguments);
    }

    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        NSString *key = [command.arguments objectAtIndex:0];
        NSString *value = [command.arguments objectAtIndex:1];
        
        [CPUserDefaults setValue:value key:key];
        
        // return result
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (void)getPreference:(CDVInvokedUrlCommand *)command {
    if (kDebug) {
        NSLog(@"getPreference: %@", command.arguments);
    }

    [self.commandDelegate runInBackground:^{
        CDVPluginResult *pluginResult = nil;
        NSString *key = [command.arguments objectAtIndex:0];
        
        NSString *value = [CPUserDefaults getValue:key];
        
        // return result
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:value];
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}


- (NSManagedObject *)getObject:(NSString *)entityName 
                    withIDAttr:(NSString *)idAttr 
                         andID:(NSNumber *)objectID 
                       context:(NSManagedObjectContext *)context 
                         error:(NSError **)error
{
    NSFetchRequest *fr = [NSFetchRequest fetchRequestWithEntityName:entityName];
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"self.%@ == %@", idAttr, objectID];
    fr.predicate = predicate;
    
    // fetch
    NSArray *filteredObjects = [context executeFetchRequest:fr error:error];
    
    if (!*error && filteredObjects.count == 1) {
        return filteredObjects[0];
    } else {
        return nil;
    }
}

@end
