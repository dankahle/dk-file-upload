const mg = require('mongoose'),
  ApiError = require('../api-error'),
  _ = require('lodash');

// this is for fs.files only (file info gets), has nothing to do with upload/download/remove files
module.exports = class FileRepo {

  constructor() {
    this.schema = mg.Schema({
      length: Number,
      uploadDate: String,
      filename: String,
      contentType: String,
      metadata: Object
    }, {collection: 'fs.files'});

    this.schema.set('toObject', {virtuals: true});
    this.schema.virtual('id').get(function() {
      return this._id.toString();
    });
    this.Model = mg.model('Files', this.schema);
  }

  // must have a directory, can also have type, limit, skip
  getMany(rq) {
    const filter = {'metadata.directory': rq.directory};
    if (rq.type) {
      filter['metadata.type'] = rq.type;
    }
    const query = this.Model.find(filter);
    if (rq.limit && rq.skip !== undefined) {
      query.skip(Number(rq.skip)).limit(Number(rq.limit))
    }
    return query.exec();
  }

  getManyIds(ids, rq) {
    const query = this.Model.find({_id: {$in: ids}});
    if (rq.limit && rq.skip !== undefined) {
      query.skip(Number(rq.skip)).limit(Number(rq.limit))
    }
    return query.exec();
  }

  getOne(id) {
    return this.Model.findById(id).exec()
      .then(x => x);
  }

}

