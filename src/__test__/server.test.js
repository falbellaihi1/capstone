
import {afterAll, describe, expect, it} from "@jest/globals";
const app = require("../server/server");
const superTest = require('supertest');
const request = superTest(app);

// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.
    it('testing server.js / point', async done =>{

        const response = await request.get('/all')
        expect(response.status).toBe(200)

        done();


    })
});

