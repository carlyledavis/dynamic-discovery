
var chai = require( 'chai');
var expect = chai.expect;

var Server = require( '../../models/server');
var testServerId = '9e7a4bab-c820-4443-ac22-2a57bede6476';

describe( 'Server Model', function(){

    it( 'Should construct a server with identifier on Server object creation', function()
    {
        var server = new Server({capabilities: ["http://account.int.cou/account-services"],
            port:3000,
            authentication:'Basic',
            ipAddress: '123.123.123.123'
        });

        expect( server.id).to.be.a('string');
        expect(new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}').test(server.id)).to.equal(true);
        expect( server.port).to.equal( 3000);
        expect( server.authentication).to.equal( 'Basic');
        expect( server.ipAddress).to.equal( '123.123.123.123');
    });

    it( 'Should initialize variables to know values if no scheme is provided', function()
    {
        var server = new Server();
        expect( server.port).to.equal(3000);
        expect( server.capabilities.length).to.equal( 0);
        expect( server.id).to.be.a('string');
    });

    it( 'Should list all capabilities when constructed', function()
    {
        var server = new Server({capabilities:["foo", "bar"]});
        expect( server.capabilities.length).to.equal( 2 );
        expect( server.capabilities).to.contain( 'foo');
        expect( server.capabilities).to.contain( 'bar');
    });

    it( 'Should create the specified server with a fixed server id if specified', function(){
        var server = new Server( {}, 'foo' );
        expect( server.id).to.equal( 'foo');
    });

    it( 'Should create a base64 representation of the server specificeation', function()
    {
        var server = new Server({capabilities:['foo', 'bar']}, '9e7a4bab-c820-4443-ac22-2a57bede6476');
        var str = server.serialize();

        expect( str).to.equal( 'eyJpZCI6IjllN2E0YmFiLWM4MjAtNDQ0My1hYzIyLTJhNTdiZWRlNjQ3NiIsInBvcnQiOjMwMDAsImNhcGFiaWxpdGllcyI6WyJmb28iLCJiYXIiXSwiYXV0aGVudGljYXRpb24iOiJCYXNpYyIsImlwQWRkcmVzcyI6IjAuMC4wLjAifQ==');
    });

    it( 'Should create a server from a bas64 encoded server specification', function()
    {
        var server = Server.deserialize( 'eyJpZCI6IjllN2E0YmFiLWM4MjAtNDQ0My1hYzIyLTJhNTdiZWRlNjQ3NiIsInBvcnQiOjMwMDAsImNhcGFiaWxpdGllcyI6WyJmb28iLCJiYXIiXSwiYXV0aGVudGljYXRpb24iOiJCYXNpYyJ9');

        expect( server.capabilities).to.contain( 'foo');
        expect( server.capabilities).to.contain( 'bar');
        expect( server.id).to.equal( testServerId);
        expect( server.capabilities.length).to.equal( 2 );
    });

});
