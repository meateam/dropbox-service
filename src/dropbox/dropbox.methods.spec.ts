import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import mongoose from "mongoose";
import chaiSubset from "chai-subset";

const expect: Chai.ExpectStatic = chai.expect;
chai.should();
chai.use(chaiAsPromised);
chai.use(chaiSubset);

describe("File Logic", () => {
  before(async () => {
    await mongoose.connection.db.dropDatabase();
    const collections = ["files", "uploads"];
    for (const i in collections) {
      mongoose.connection.db.createCollection(collections[i], (err) => {});
    }
  });

  beforeEach(async () => {
    const removeCollectionPromises = [];
    for (const i in mongoose.connection.collections) {
      removeCollectionPromises.push(
        mongoose.connection.collections[i].deleteMany({})
      );
    }
    await Promise.all(removeCollectionPromises);
  });

  describe("#hashKey", () => {
    it("sainity check", () => {
      expect(true).to.be.true;
    });
  });
});
