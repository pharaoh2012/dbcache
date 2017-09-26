var MongoClient = require('mongodb').MongoClient;

const cachetime = 5 * 60 * 1000;
var dbCache = {};
async function getDb(name) {

	if (dbCache[name]) {
		let info = dbCache[name];
		if (info.time > Date.now()) {
			info.time = Date.now() + cachetime;
			dbCache[name] = info;
			return info.db;
		}
	}
	let db = await MongoClient.connect(name);
	dbCache[name] = {
		db: db,
		time: Date.now() + cachetime
	};
	return db;
}

exports.getDb = getDb;