
var InMemoryServiceRegistry = module.exports = function()
{
    this.serverCapabilityMap = {};
    this.capabilities = [];
    this.registeredServers = [];
};

InMemoryServiceRegistry.prototype.addServer = function( server )
{
    if( !server || !server.capabilities || server.capabilities.length == 0 )
        return;

    for( var i = 0; i < server.capabilities.length; i++ )
    {
        if( !this.serverCapabilityMap[server.capabilities[i]])
        {
            this.serverCapabilityMap[server.capabilities[i]] = [];
        }

        this.serverCapabilityMap[server.capabilities[i]].push( server );

    }

    this.registeredServers.push( server );;
};


//Return server.
InMemoryServiceRegistry.prototype.getAvailableResource = function( capability )
{
    if( this.serverCapabilityMap[capability] && this.serverCapabilityMap[capability].length > 0 )
        return this.serverCapabilityMap[capability][0];
};

//Todo: WTF, this needs to be cleaned up but works for now.
InMemoryServiceRegistry.prototype.getAvailableCapabilities = function()
{
    var returnList = [];

    for( var i = 0; i < Object.getOwnPropertyNames(this.serverCapabilityMap).length; i++ )
    {
       returnList.push(Object.getOwnPropertyNames(this.serverCapabilityMap)[i]);
    }

    return returnList;
}