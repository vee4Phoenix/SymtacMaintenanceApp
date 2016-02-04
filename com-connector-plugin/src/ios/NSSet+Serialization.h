//
//  NSSet+Serialization.h
//  ReportItQuick
//
//  Created by Hubert on 9/04/2015.
//  Copyright (c) 2015 Contact Point. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>

@interface NSSet (Serialization)

- (NSArray *)toDictionaryArray;
- (void)clearSet;

@end
