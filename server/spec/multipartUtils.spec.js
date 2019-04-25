const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;

const multipart = require('../js/multipartUtils');

describe('server responses', () => {

  it('should find the boundary', (done) => {
    var filename = path.join('.', 'spec', 'water-lg.multipart');
    fs.readFile(filename, (err, fileData) => {
      var boundary = multipart.getBoundary(fileData);
      expect(boundary).to.equal('----WebKitFormBoundaryBGThBfI7YB8GKkr0');
      done();
    });
  });

  it('should decode all parts', (done) => {
    var filename = path.join('.', 'spec', 'water-lg.multipart');
    fs.readFile(filename, (err, fileData) => {
      var parts = multipart.parse(fileData);
      expect(parts.length).to.equal(1);
      done();
    });
  });

  it('should find the image file', (done) => {
    var filename = path.join('.', 'spec', 'water-lg.multipart');
    fs.readFile(filename, (err, fileData) => {
      var file = multipart.getFile(fileData);
      expect(file.filename).to.equal('water-lg.jpg');
      done();
    });
  });

  it('should correctly decode the image file', (done) => {
    var filename = path.join('.', 'spec', 'water-lg.multipart');
    fs.readFile(filename, (err, fileData) => {
      var file = multipart.getFile(fileData);
      fs.readFile('./spec/water-lg.jpg', (err, fileData) => {
        expect(Buffer.compare(fileData, file.data)).to.equal(0);
        done();
      });
    });
  });

});