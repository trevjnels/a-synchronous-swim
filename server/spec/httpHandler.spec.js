
const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const server = require('./mockServer');

const httpHandler = require('../js/httpHandler');
const messageQueue = require('../js/messageQueue')


describe('server responses', () => {

  it('should respond to a OPTIONS request', (done) => {
    let {req, res} = server.mock('/', 'OPTIONS');


    httpHandler.router(req, res);
    expect(res._responseCode).to.equal(200);
    expect(res._ended).to.equal(true);


    done();
  });

  xit('should respond to a GET request for a swim command', (done) => {
    let {req, res} = server.mock('/', 'GET');
    var testDirections = ['left', 'right', 'up', 'down'];

    httpHandler.router(req, res);
    console.log("res: " ,res, "| req: ", req)
    expect(res._responseCode).to.equal(200);
    expect(res._ended).to.equal(true);
    expect(testDirections.includes(res._data[0])).to.equal(true);
    done();
  });

  it('should respond with 404 to a GET request for a missing background image', (done) => {
    httpHandler.backgroundImageFile = path.join('.', 'spec', 'missing.jpg');
    let {req, res} = server.mock('/background', 'GET');

    httpHandler.router(req, res, () => {
      expect(res._responseCode).to.equal(404);
      expect(res._ended).to.equal(true);
      done();
    });
  });

  it('should respond with 200 to a GET request for a present background image', (done) => {
    // write your test here


    done();
  });

  it('should respond to a POST request to save a background image', (done) => {
    // write your test here
    done();
  });

  it('should send back the previously saved image', (done) => {
    // write your test here
    done();
  });
});
