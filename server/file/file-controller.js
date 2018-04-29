const ApiError = require('../api-error'),
  Repo = require('./file-repo'),
  schema = {},
  mg = require('mongoose'),
  dbPromise = require('../mongoose-conn'),
  Grid = require('gridfs-stream');

module.exports = class FileController {

  constructor(repo, schema) {
    this.repo = new Repo();
    this.schema = schema;
  }

  getMany(req, res, next) {
    this.repo.getMany(req.query.limit, req.query.skip)
      .then(rules => res.send(rules))
      .catch(next);
  }

  getOne(req, res, next) {
    dbPromise.then(db => {
      var gfs = Grid(db, mg.mongo);
      gfs.findOne({_id: req.params.id}, function (err, file) {
        if (err) {
          return res.status(400).send(err);
        }
        else if (!file) {
          return res.status(404).send('Error on the database looking for the file.');
        }

        res.set('Content-Type', file.contentType);
        res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

        var readstream = gfs.createReadStream({
          _id: req.params.id
        });

        readstream.on("error", function(err) {
          res.end();
        });
        readstream.pipe(res);
      });
    });
  }

  addMultiple(req, res, next) {
    return this.repo.getManyIds(req.files.map(file => file.id))
      .then(files => res.send(files))
      .catch(next);
  }

  addSingle(req, res, next) {
    return this.repo.getOne(req.file.id)
      .then(file => res.send(file))
      .catch(next);
  }

  update(req, res, next) {
    const data = req.body;
    this.verifyProperties(data, ['id', 'timestamp']);
    if (req.params.id !== data.id) {
      throw new ApiError('Body id doesn\'t match url id.', data, 400)
    }
    this.repo.update(data)
      .then(item => {
        if (item) {
          res.send(item);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(next)
  }

  remove(req, res, next) {
    this.repo.remove(req.params.id)
      .then(item => res.send(item))
      .catch(next);
  }

  verifyProperties(data, arr) {
    arr.forEach(prop => {
      if (!data[prop]) {
        throw new ApiError(`Property missing: ${prop}.`, data, 400)
      }
    })
  }

}

