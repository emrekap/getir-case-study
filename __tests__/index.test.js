const request = require('supertest');
const app = require('../app.js')
describe('Test getRecords', () => {
    test('It should response the POST method', () => {
        return request(app).post("/getRecords").then(response => {
            //console.log(response.body);
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

    test('It should greater or equal 3000 and less than or equal 3500 response the POST method', () => {
        return request(app).post("/getRecords").send({"minCount": 3000, "maxCount": 3500}).then(response => {
            //console.log(response.body.records);
            if(response.body.records){
                response.body.records.map(record=> {
                    expect(record.totalCount).toBeLessThanOrEqual(3500);
                    expect(record.totalCount).toBeGreaterThanOrEqual(3000);
                });
            }
        }).catch(err => {
            console.log(err);
        })

    });

})
