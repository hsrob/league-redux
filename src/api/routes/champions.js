let express = require('express');
let router = express.Router();
import mongodb from 'mongodb';
let mdbc = mongodb.MongoClient;
let Promise = require('bluebird');
let co = require('co-bluebird');
let _ = require('lodash');
const mongoUrl = 'mongodb://localhost:27017/leagueredux';
let league = require('leagueapi');
league.init('3ad1d074-743c-41cc-9955-48428009e43b', 'na');

router.get('/', (req, res) => {
    co(function*() {
        var db = yield mdbc.connect(mongoUrl);
        var col = db.collection('champions');
        var r = yield col.find({}, _.pick(req.query, ['skip', 'limit', 'sort'])).toArray();
        db.close();
        res.json(r);
    }).catch((err) => {
        console.log('Error in GET /champions', err);
    })
});
router.post('/', (req, res) => {
    co(function*() {
        let champions = yield league.Static.getChampionList({ champData: 'altimages,blurb,image,info,partype,passive,skins,spells,stats,tags'});
        //console.log('champions.data', _.keys(champions.data).length);
        let mappedChamps = _.map(_.values(champions.data), (c) => {
            c._id = c.id;
            return c;
        });
        console.log('mapped ' + mappedChamps.length + ' champions!');
        let db = yield mdbc.connect(mongoUrl);
        let col = db.collection('champions');
        var r = yield col.insertMany(mappedChamps);
        db.close();
        res.json({ insertedCount: r.insertedCount});
    }).catch((err) => {
        console.log(err);
    });
});

module.exports = router;