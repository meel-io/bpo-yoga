const types = `
  type RoomRate {
    id: ID,
    roomType: String!
    weekdayRate: Float!
    weekendRate: Float!
  }
  type Season {
    id: ID,
    name: String!
    startDate: String!
    rooms: [RoomRate]
  }
  type SeasonRate {
    id: ID,
    name: String!
    seasons: [Season]!
  }
  type Rate {
    id: ID,
    name: String!
    rooms: [RoomRate]
  }
  union AllRates = SeasonRate | Rate
  type Agent {
    id: ID
    name: String!
    rates: [AllRates]!
  }
  type Query { 
      agents: [Agent]
  }
  type Mutation { 
    setRoomRate(
      roomRateId: String!,
      weekdayRate: Int!,
      weekendRate: Int!
    ): [RoomRate]
  }
`;

module.exports = types;