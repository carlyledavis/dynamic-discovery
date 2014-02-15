
var chai = require( 'chai');
var expect = chai.expect;

var Server = require( '../../models/server');

describe( 'Server Model', function(){

    it( 'Should construct a server with identifier on Server object creation', function()
    {
        var server = new Server({capabilities: ["http://account.int.cou/account-services"],
            port:3000,
            authentication:'Basic'
        });

        expect( server.id).to.be.a('string');
        expect(new RegExp('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}').test(server.id)).to.equal(true);
        expect( server.port).to.equal( 3000);
        expect( server.authentication).to.equal( 'Basic');
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

});

Server.prototype.checkIsValid = function()
{

;}
