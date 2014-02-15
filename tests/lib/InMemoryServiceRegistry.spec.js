var expect = require('chai').expect;
var InMemoryServiceRegistry = require( '../../lib/InMemoryServiceRegistry' );
var sinon = require( 'sinon');
var Server = require('../../models/Server');

describe( 'InMemoryServiceRegistry', function()
{

    it( "Should add a server to the registry collection with specified capabilities", function()
    {
        var serviceRegistry = new InMemoryServiceRegistry();
        var sampleServer = new Server( {ipAddress: "123.123.123.123", capabilities:['foo','bar']});

        serviceRegistry.addServer(sampleServer);
        expect( serviceRegistry.registeredServers.length).to.equal(1);
    });

    it( "Should not add a server to the list unless it has capabilities", function(){
        var sampleServer = new Server();
        var serviceRegistry = new InMemoryServiceRegistry();

        serviceRegistry.addServer( sampleServer );
        expect( serviceRegistry.registeredServers.length).to.equal(0);
    });

    it( 'Should return no server when no server has those capabilities', function()
    {
        var serviceRegistry = new InMemoryServiceRegistry();
        expect(serviceRegistry.getAvailableResource( 'foo' )).to.be.undefined;
    });

    it( 'Should return a server with capability loaded when server is registered', function()
    {
        var server = new Server({capabilities:['foo', 'bar']});
        var serviceRegistry = new InMemoryServiceRegistry();

        serviceRegistry.addServer( server );
        expect( serviceRegistry.getAvailableResource( 'foo' )).to.equal( server );
    });

    it( 'Should return a list of all regiestered capabilities independent of servers', function()
    {
        var server1 = new Server({capabilities:['foo']});
        var server2 = new Server({capabilities:['bar']});

        var serviceRegistry = new InMemoryServiceRegistry();
        serviceRegistry.addServer(server1);
        serviceRegistry.addServer(server2);

        var capabilities = serviceRegistry.getAvailableCapabilities();

        expect(capabilities).to.contain( 'foo');
        expect(capabilities).to.contain('bar');
    })


});