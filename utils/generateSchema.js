const Lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const mkdirp = require("mkdirp");
const { resolve } = require("path");
const faker = require("faker");

mkdirp(resolve(__dirname, "../live"));

const db = new Lowdb(new FileSync(resolve(__dirname, "../live/db.json")));

if (db.get("agents")) {
    db.set('agents', [])
        .write()
}

db.defaults({ agents: [] }).write();

const getRandomQuantity = () => {
    return Array.from(Array(Math.floor(Math.random() * 5) + 1));
};

const getRandomBoolean = () => {
    return Math.random() >= 0.5;
};

const getAgents = () => {
    return getRandomQuantity().map(() => {
            return getAgent();
});
};

const getAgent = () => {
    return {
        id: faker.random.uuid(),
        name: faker.name.firstName(),
        rates: getAllRates()
    };
};

const getAllRates = () => {
    return getRandomBoolean() ? getSeasonRates() : getRates();
};

const getSeasonRate = () => {
    return {
        id: faker.random.uuid(),
        name: getRandomBoolean() ? "Non-refundable" : "default",
        seasons: getSeasons()
    };
};

const getSeasonRates = () => {
    return getRandomQuantity().map(() => {
            return getSeasonRate();
});
};

const getSeason = () => {
    const startDate = faker.date.future();
    return {
        id: faker.random.uuid(),
        name: faker.random.word(),
        startDate: `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`,
        rooms: getRoomRates()
    };
};

const getSeasons = () => {
    return getRandomQuantity().map(() => {
            return getSeason();
});
};

const getRates = () => {
    return getRandomQuantity().map(() => {
            return getRate();
});
};

const getRate = () => {
    return {
        name: getRandomBoolean() ? "Non-refundable" : "default",
        rooms: getRoomRates()
    };
};

const getRoomRates = () => {
    return getRandomQuantity().map(() => {
            return {
                id: faker.random.uuid(),
                roomType: `${getRandomQuantity().length} Bed Room`,
                weekdayRate: 0.0,
                weekendRate: 0.0
            };
});
};

db
    .get("agents")
    .push(...getAgents())
    .write();