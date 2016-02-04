//
//  NSArray+Serialization.h
//  TollICR
//
//  Created by Nigel Maloney on 27/01/2015.
//
//

#import <Foundation/Foundation.h>

@interface NSArray (Serialization)

- (NSString *)jsonString;
+ (NSArray *)arrayFromJSONString:(NSString *)jsonString;

@end
