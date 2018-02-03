const request = require('supertest');
const app = require('./server');
const expect = require('chai').expect;

var server;

describe('IOTA External Adaptor', function () {

    this.timeout(5000);
    
    before(function() {
        server = app.listen(3000);
    });

    after(function () {
        server.close();
    });

    it('responds to /', function testSlash(done) {   
        request(app)
            .get('/')
            .expect(200, done);
    });

    it('responds to /account-data', function testInfo(done) {
        request(app)
            .get('/account-data')
            .query({ "seed": "VGMQDIPUZGUMRSWC9GODSXHCSMVTGLASTKWPHLETZPQJUHGBGBQRMZMFRVRRLPNRSUFXPRMPFRLGGZSCZ" })
            .expect(200)
            .end(function(err, res) { 
                expect(res.body.latestAddress).to.be.a('string'); 
                expect(res.body.balance).to.equal(0); 
                done(); 
            });
    });

    it('responds to /info', function testInfo(done) {
        request(app)
            .get('/info')
            .expect(200)
            .end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                expect(res.body.appName).to.equal("IRI"); 
                done(); 
            });
    });

    it('responds to /transaction-object', function testInfo(done) {
        request(app)
            .get('/transaction-object')
            .query({ "transactions": "FXRLFGBUPYASKWPSAEXLHAMZYOBITVCCWAFDWMJCFRKT9D9VBRXOAMHSIODDTJ9UVUVPSRFKQAWFA9999" })
            .expect(200)
            .end(function(err, res) {
                expect(res.body[0].hash).to.be.a('string'); 
                done(); 
            });
    });

    it('responds to /transaction-object-query', function testInfo(done) {
        request(app)
            .get('/transaction-object-query')
            .query({ "bundles": "EWGITWCAJJXTZRCHENSTBXCJFFCSGKRIIGFFACNWVESNIHOFFJBR9UBVHBSBATRRJADWZN9HDHKAYNKYD" })
            .expect(200)
            .end(function(err, res) { 
                expect(res.body).to.be.a('array'); 
                done(); 
            });
    });

    it('404 everything else', function testPath(done) {
        request(app)
            .get('/foo/bar')
            .expect(404, done);
    });
});