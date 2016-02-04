//
//  NSDate+String.m
//  Brownie Points
//
//  Created by Nigel Maloney on 6/10/2015.
//
//

#import "NSDate+String.h"

static NSString *const kDateFormat = @"yyyy-MM-dd";
static NSString *const kDateTimeFormat = @"yyyy-MM-dd HH:mm:ss";

@implementation NSDate (String)

- (NSString *)dateToString
{
    if (self) {
        return [[NSDate dateFormatter] stringFromDate:self];
    } else {
        return @"";
    }
}

- (NSString *)dateTimeToString
{
    if (self) {
        return [[NSDate dateTimeFormatter] stringFromDate:self];
    } else {
        return @"";
    }
}

+ (NSDate *)dateFromString:(NSString *)string
{
    return [[NSDate dateFormatter] dateFromString:string];
}

+ (NSDate *)dateTimeFromString:(NSString *)string
{
    return [[NSDate dateTimeFormatter] dateFromString:string];
}

+ (NSDateFormatter *)dateFormatter
{
    NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
    [dateFormat setDateFormat:kDateFormat];
    return dateFormat;
}

+ (NSDateFormatter *)dateTimeFormatter
{
    NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
    [dateFormat setDateFormat:kDateTimeFormat];
    return dateFormat;
}
@end
