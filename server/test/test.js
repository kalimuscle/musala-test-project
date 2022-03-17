
var chai    = require("chai");
let chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();

const server = require('../index');

chai.use(chaiHttp);

const SERVER_URL ='http://localhost:3000';

describe('Testing API', () => {
    
    const gateway = { 
        serial: '2356265326', 
        name: 'SimLink', 
        ipv4: '123.45.5.79',
        devices: []
    };

    const gatewayFail1 = { 
        serial: '2356265326', 
        name: 'Ramdom Link', 
        ipv4: '123.45.5.79',
        devices: []
    };
    
    const gatewayFail2 = { 
        serial: '3483778878', 
        name: 'Bizca data', 
        ipv4: '123.45.5.79',
        devices: new Array(11)
    };
    
    const gatewayFail3 = { 
        serial: '7778388899', 
        name: 'The Corp', 
        ipv4: '400.45.5.79',
        devices: new Array(2)
    };

    describe('API endpoint /gateway/create', function () {
        it('Testing API endpoint gateway create', function (done) {
          chai.request(SERVER_URL)
          .post('/gateway/create')
          .send( gateway)
          .end((error, res) => {
            expect(res).to.have.status(201);
            expect(res.body).should.to.be.a('object');
          done();
          });
        });


        it('Testing fail gateway serial number validation', function (done) {
            chai.request(SERVER_URL)
            .post('/gateway/create')
            .send( gatewayFail1)
            .end((error, res) => {
              expect(res).to.have.status(500);
              expect(res.body).property('message')
              expect(res.body).property('message').eql('Element exist or maximum devices by gateway exceeded')
            done();
            });
        });

        it('Testing fail gateway max devices exceeded validation', function (done) {
            chai.request(SERVER_URL)
            .post('/gateway/create')
            .send( gatewayFail2)
            .end((error, res) => {
              expect(res).to.have.status(500);
              expect(res.body).property('message')
              expect(res.body).property('message').eql('Element exist or maximum devices by gateway exceeded')
            done();
            });
         });

         it('Testing fail gateway ipv4 validation', function (done) {
            chai.request(SERVER_URL)
            .post('/gateway/create')
            .send( gatewayFail3)
            .end((error, res) => {
              expect(res).to.have.status(500);
              expect(res.body).property('message')
              expect(res.body).property('message').eql('Address ipv4 not valid')
            done();
            });
         });
    });

    describe('API endpoint /gateway/update', function () {

        let gateway = { 
            serial: '694084590890', 
            name: 'Quest', 
            ipv4: '123.45.5.79',
            devices: []
        };

        

        it('Testing API endpoint gateway update', function (done) {
            chai.request(SERVER_URL)
            .post('/gateway/create')
            .send( gateway)
            .end((error, res) => {
                expect(res).to.have.status(201);

                gateway = res.body;
                let gatewayUpdated = {
                    ...gateway,
                    serial: '694084590890', 
                    name: 'Lord', 
                    ipv4: '123.45.5.80',
                    devices: []
                };

                chai.request(SERVER_URL)
                .post('/gateway/update')
                .send( gatewayUpdated)
                .end((error, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal(gatewayUpdated);
                    expect(res.body).should.to.be.not.eql(gateway) 
                });
                
            done();
            });
         });
    });


    describe('API endpoint /gateway/detail', function () {

        let gateway = { 
            serial: '65-049-09090', 
            name: 'Quest', 
            ipv4: '123.45.5.79',
            devices: []
        };

        it('Testing API endpoint gateway detail', function (done) {
            chai.request(SERVER_URL)
            .post('/gateway/create')
            .send( gateway)
            .end((error, res) => {
                expect(res).to.have.status(201);

                gateway = res.body;

                chai.request(SERVER_URL)
                .post('/gateway/detail')
                .send( {_id: gateway._id})
                .end((error, res) => {
                    expect(res).to.have.status(200);
                   
                });
                
            done();
            });
         });
    });

    describe('API endpoint /gateway/remove', function () {

        let gateway = { 
            serial: 'TTY909-09090', 
            name: 'Quest', 
            ipv4: '123.45.5.79',
            devices: []
        };

        const fake_id = 'disfdsofudois90990-0';

        it('Testing API endpoint gateway remove', function (done) {
            chai.request(SERVER_URL)
            .post('/gateway/create')
            .send( gateway)
            .end((error, res) => {
                expect(res).to.have.status(201);

                gateway = res.body;

                chai.request(SERVER_URL)
                .post('/gateway/remove')
                .send( {_id: gateway._id})
                .end((error, res) => {
                    expect(res).to.have.status(200);
                });
                
            done();
            });
         });
    });

    describe('API endpoint /gateway/list', function () {
        it('respond with matching records', function (done) {
          chai.request(SERVER_URL)
          .get('/gateway/list')
          .end((error, res) => {
              const size = res.body.length;
            res.should.have.status(200);
            expect(res.body).should.to.be.a('object');
          done();
          });
        });
    });
});


