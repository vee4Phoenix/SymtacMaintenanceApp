//
//  NSDate+String.h
//  Brownie Points
//
//  Created by Nigel Maloney on 6/10/2015.
//
//

#import <Foundation/Foundation.h>

@interface NSDate (String)

- (NSString *)dateToString;
- (NSString *)dateTimeToString;
+ (NSDate *)dateFromString:(NSString *)string;
+ (NSDate *)dateTimeFromString:(NSString *)string;

@end
