var Airtable = require('airtable');
const MY_KEY = process.env.MY_KEY;

Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: MY_KEY
});
var base = Airtable.base('appdj0zQ41KsxPuir');
const table = base('dados');

const getData = () => {
    return new Promise((resolve, reject) => {
        const prod_records = [];
        table.select({
            // Selecting the first 3 records in Grid view:
            maxRecords: 50,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
            //console.log(JSON.stringify(records));

            records.forEach(function (record) {
                prod_records.push(record._rawJson);
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();

        }, function done(err) {
            if (err) {
                reject(err);
            } else {              
                resolve(prod_records);
            }
        });

    });
}

export default async function dbHandler(request, response) {
        const data = await getData();
      
        response.setHeader('Access-Control-Allow-Credentials', true);
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

        response.json(data);
}