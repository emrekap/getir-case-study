const request = require('supertest');
const app = require('../app.js')
describe('Test getRecords', () => {
    test('It should response the POST method', () => {
        return request(app).post("/getRecords").then(response => {
            console.log(response.body);
            expect(response.statusCode).toBe(200)
            expect(response.body.code).toBe(0);
            expect(response.body.msg).toBe('Success');
            //expect(response.body.records).toBe();


        }).catch(err => {
            console.log(err);
        })
    });

    test('It should not response the GET method', () => {
        return request(app).get("/getRecords").then(response => {
            console.log(response.body);
            expect(response.statusCode).toBe(404)
            //expect(response.body.records).toBe();


        }).catch(err => {
            console.log(err);
        })
    });

})