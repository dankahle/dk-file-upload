const mg = require('mongoose'),
  ApiError = require('../api-error'),
  _ = require('lodash');

module.exports = class ContactRepo {


  constructor() {
    this.schema = mg.Schema({
      name: {type: String, required: true},
      age: {type: String, required: true},
      file: {type: mg.Schema.Types.ObjectId, ref: 'Files'},
    }, {collection: 'contact'});

    this.schema.set('toObject', {virtuals: true});
    this.schema.virtual('id').get(function() {
      return this._id.toString();
    });
    this.Model = mg.model('Contact', this.schema);
  }

  getMany(limit, skip) {
    const query = this.Model.find();
    if (limit && skip !== undefined) {
      query.skip(Number(skip)).limit(Number(limit))
    }
    query.populate('file');
    return query.exec()
      .then(contacts => {
        return contacts;
      })
  }

  getOne(id) {
    return this.Model.findById(id).exec()
      .then(x => x);
  }

  getOneWithTimestamp(data) {
    return this.Model.findOne({_id: data.id, timestamp: data.timestamp}).exec()
      .then(item => {
        if (!item) {
          const err = new ApiError('Concurrency error, please refresh your data.', null, 400);
          err.name = 'ConcurrencyError';
          throw(err);
        }
        return item;
      });
  }

  add(data) {
    // if versioning items, our edits will actually be adds, so dump the ids in that case
    delete data._id;
    delete data.id;
    const item = new this.Model(data);
    return item.save();
  }

  update(data) {
    return this.get(data)
      .then(item => {
        _.merge(item, data);
        delete item._id;
        delete item.id;
        return item.save()
      });
  }

  remove(id) {
    return this.getOne(id)
      .then(item => item.remove());
  }

}

