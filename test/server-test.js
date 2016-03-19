'use strict';
const chai = require('chai');
chai.use(require('chai-http'));

var request = chai.request;
var expect = chai.expect;

var mongoose = require('mongoose');
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

describe('users resource testing', () => {

  it('should post lawrence-livermore to users', (done) => {
    request('localhost:3000')
    .post('/users')
    .send({"name": "lawrence-livermore"})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      expect(res.body._id).not.eql(null);
      done();
    });
  });

  it('should get all 1 users', (done) => {
    request('localhost:3000')
    .get('/users')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      expect(res.body.length).eql(1);
      done();
    });
  });



  after((done) => {
    mongoose.connection.db.dropDatabase((err) => {
      if (err) console.log('error dropping database');
      else console.log('database dropped');
      done();
    });
  })

});
