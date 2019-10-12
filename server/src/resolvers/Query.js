const users = (parent, args, context) => context.prisma.users();

const user = (parent, args, context, info) => context.prisma.user({ id: args.id });

const locationInRange = (parent, args, context) => {
    function distance(lat1,lon1,lat2,lon2) {
    	var R = 6371; // km (change this constant to get miles)
    	var dLat = (lat2-lat1) * Math.PI / 180;
    	var dLon = (lon2-lon1) * Math.PI / 180;
    	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    		Math.sin(dLon/2) * Math.sin(dLon/2);
    	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    	var d = R * c;
    	if (d>1) return Math.round(d)+"km";
    	else if (d<=1) return Math.round(d*1000)+"m";
    	return d;
    }
    const d = distance(args.lat1, args.lon1, args.lat2, args.lon2);
    return d <= 5;
}

module.exports = {
    users,
    user
}