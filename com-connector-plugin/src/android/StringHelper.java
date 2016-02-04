package com.contactpoint.plugin.json;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringHelper {

	private static final String kDateFormat = "dd/MM/yyyy";
	private static final String kDateTimeFormat = "dd/MM/yyyy HH:mm:ss";

	public static String toString(Date date) {
		return getDateFormat().format(date);
	}
	
	public static Date fromString(String date) {
		try {
			return getDateTimeFormat().parse(date);
		} catch (ParseException e) {
			return null;
		}
	}
	
	private static DateFormat getDateFormat() {
		return new SimpleDateFormat(kDateFormat);
	}

	private static DateFormat getDateTimeFormat() {
		return new SimpleDateFormat(kDateTimeFormat);
	}
}
