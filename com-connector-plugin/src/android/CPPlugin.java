package com.contactpoint.plugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class CPPlugin extends CordovaPlugin {
	private static final String CP_METHOD_CONSTANT = "methodName";

    @Override
	public boolean execute(final String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException {
		cordova.getThreadPool().execute(new Runnable() {

			@Override
			public void run() {
				try {
					//QueryBuilder.LOG_SQL = true;
					//QueryBuilder.LOG_VALUES = true;
					if (action.equals(CP_METHOD_CONSTANT)) {
						methodName(callbackContext);
					}
				} catch (Exception e) {
					e.printStackTrace();
					System.err.println("Exception: " + e.getMessage());
					callbackContext.error(e.getMessage());
				}

			}

		});
		System.out.println(action + " " + args.toString());
		return true;
	}

	private void methodName(CallbackContext callbackContext) {
		JSONArray jsonArray = new JSONArray();

		PluginResult pr = new PluginResult(PluginResult.Status.OK, jsonArray);
		callbackContext.sendPluginResult(pr);
	}
    
}
