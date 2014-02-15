var uuid = require( 'node-uuid');


var Server = module.exports = function( serverDescription, serverId )
{

    var serverDescription = serverDescription || {};
    this.id = serverId || uuid.v4();
    this.port = serverDescription.port || 3000;
    this.capabilities = serverDescription.capabilities || [];
    this.authentication = serverDescription.authentication || 'Basic';
    this.ipAddress = serverDescription.ipAddress || '0.0.0.0';
};

Server.prototype.serialize = function()
{
    var str = JSON.stringify( this );
    return new Buffer( str).toString( 'base64');
};

Server.deserialize = function( str )
{
    var buf = new Buffer( str, 'base64');
    return JSON.parse( buf );
};