package com.contactpoint.plugin.database;

import android.database.sqlite.SQLiteDatabase;

/**
 * Migration from Version1 to Version2
 *
 * @author Hubert
 */
public class MigrateV1ToV2 extends MigrationImpl {
 
    /**
     * {@inheritDoc}
     */
    @Override
    public int applyMigration(SQLiteDatabase db,
            int currentVersion) {
        prepareMigration(db, currentVersion);
 
        //db.execSQL("ALTER TABLE PROGRAM ADD COLUMN SHOW_SOCIAL_MEDIA_LINKS INTEGER");
        //db.execSQL("ALTER TABLE RECOGNITION ADD COLUMN AWARDED_BY_IMAGE_URL TEXT");

        return getMigratedVersion();
    }
 
    /**
     * {@inheritDoc}
     */
    @Override
    public int getTargetVersion() {
        return 1;
    }
 
    /**
     * {@inheritDoc}
     */
    @Override
    public int getMigratedVersion() {
        return 2;
    }
 
    /**
     * {@inheritDoc}
     */
    @Override
    public Migration getPreviousMigration() {
        return null;
	//return new MigrateV2ToV3();
    }
}
