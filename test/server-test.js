'use strict';
const chai = require('chai');
chai.use(require('chai-http'));

var request = chai.request;
var expect = chai.expect;

var mongoose = require('mongoose');
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

describe('test time', () => {

  it('post lawrence-livermore to users', (done) => {
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

  it('post hilda-garde to users', (done) => {
    request('localhost:3000')
    .post('/users')
    .send({"name": "hilda-garde"})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      expect(res.body._id).not.eql(null);
      done();
    });
  });

  it('post lawrence-livermore to users but not create because already exists', (done) => {
    request('localhost:3000')
    .post('/users')
    .send({"name": "lawrence-livermore"})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      expect(res.body._id).eql(undefined);
      done();
    });
  });

  it('get all 2 users', (done) => {
    request('localhost:3000')
    .get('/users')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      expect(res.body.length).eql(2);
      done();
    });
  });

  it('get user hilda-garde', (done) => {
    request('localhost:3000')
    .get('/users/hilda-garde')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      expect(res.body.name).eql('hilda-garde');
      done();
    });
  });

  it('put lawrence-livermore-III to lawrence-livermore', (done) => {
    request('localhost:3000')
    .put('/users/lawrence-livermore')
    .send({"name": "lawrence-livermore-III"})
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('delete lawrence-livermore-III', (done) => {
    request('localhost:3000')
    .del('/users/lawrence-livermore-III')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      done();
    });
  });

  it('get all 1 users', (done) => {
    request('localhost:3000')
    .get('/users')
    .end((err, res) => {
      expect(err).eql(null);
      expect(res).status(200);
      expect(res.body.length).eql(1);
      done();
    });
  });

  // it('post file name:plz, content:squirrel to user hilda-garde', (done) => {
  //
  // });


  after((done) => {
    mongoose.connection.db.dropDatabase((err) => {
      if (err) console.log('error dropping database');
      else console.log('database dropped');
      done();
    });
  });

});
