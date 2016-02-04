package com.contactpoint.plugin.cache;

import android.app.Activity;
import android.content.SharedPreferences;

public class CPSharedPreferences {
	
	private static final String SharedPreferencesKey = "BrowniePointsPref";
	
	public static String getPreferences(Activity act, String key) {
		SharedPreferences sp = act.getSharedPreferences(SharedPreferencesKey, 0);
		return sp.getString(key, "");
	}

	public static void setPreferences(Activity act, String key, String value) {
		SharedPreferences sp = act.getSharedPreferences(SharedPreferencesKey, 0);
		SharedPreferences.Editor editor = sp.edit();
		editor.putString(key, value);
		editor.commit();			
	}
}
