module.exports = {
    AllRates: {
        __resolveType(obj, context, info) {
            if (obj.seasons) {
                return "SeasonRate";
            }

            if (obj.rooms) {
                return "Rate";
            }

            return null;
        }
    },
    Query: {
        agents: (root, args, { db }) => db.getAgents()
},
    Mutation: {
    setRoomRate: (root, { roomRateId, weekdayRate, weekendRate }, { db }) =>
    db.setRoomRate(roomRateId, weekdayRate, weekendRate)
}
};