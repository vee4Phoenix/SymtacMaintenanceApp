//
//  NSManagedObject+Serialization.h
//  ReportItQuick
//
//  Created by Hubert on 8/04/2015.
//  Copyright (c) 2015 Contact Point. All rights reserved.
//

#import <CoreData/CoreData.h>

@interface NSManagedObject (Serialization)

- (NSDictionary *)toDictionary;

- (void)populateFromDictionary:(NSDictionary *)dict;

+ (instancetype)initWithDictionary:(NSDictionary *)dict
                         inContext:(NSManagedObjectContext *)context;

@end
