'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable("items", {
    id: { type: "string", primaryKey: true },
    title: "string",
    description: "string",
    done: "boolean",
    createdAt: "timestamptz",
    lastModified: "timestamptz",
  });
};

exports.down = function(db) {
  return db.dropTable("items");
};

exports._meta = {
  "version": 1
};
