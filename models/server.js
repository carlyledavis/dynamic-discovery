var uuid = require( 'node-uuid');

var Server = module.exports = function( serverDescription )
{

    var serverDescription = serverDescription || {};
    this.id = uuid.v4();
    this.port = serverDescription.port || 3000;
    this.capabilities = serverDescription.capabilities || [];
    this.authentication = serverDescription.authentication || 'Basic';
};
