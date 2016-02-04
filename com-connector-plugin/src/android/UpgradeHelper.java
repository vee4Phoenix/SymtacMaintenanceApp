package com.contactpoint.plugin.database;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteDatabase.CursorFactory;

import com.contactpoint.model.DaoMaster.OpenHelper;

/**
 * A simple helper which determines which migration (if any) is required to be
 * applied when a database is opened.
 *
 * @author Hubert
 */
public class UpgradeHelper extends OpenHelper {
 
    public UpgradeHelper(Context context, String name, CursorFactory factory) {
        super(context, name, factory);
    }
 
    /**
     * Apply the appropriate migrations to update the database.
     */
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        switch (newVersion) {
            case 2:
                new MigrateV1ToV2().applyMigration(db, oldVersion);
                break;
            case 3:
                new MigrateV2ToV3().applyMigration(db, oldVersion);
                break;
            case 4:
                new MigrateV3ToV4().applyMigration(db, oldVersion);
                break;
            default:
            return;
        }
    }
}
