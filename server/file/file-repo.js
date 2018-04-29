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
  getMany(parms) {
    const filter = {'metadata.directory': parms.directory};
    if (parms.type) {
      filter['metadata.type'] = parms.type;
    }
    const query = this.Model.find(filter);
    if (parms.limit && parms.skip !== undefined) {
      query.skip(Number(parms.skip)).limit(Number(parms.limit))
    }
    return query.exec();
  }

  getManyIds(ids, parms) {
    const query = this.Model.find({_id: {$in: ids}});
    if (parms.limit && parms.skip !== undefined) {
      query.skip(Number(parms.skip)).limit(Number(parms.limit))
    }
    return query.exec();
  }

  getOne(id) {
    return this.Model.findById(id).exec()
      .then(x => x);
  }

}

