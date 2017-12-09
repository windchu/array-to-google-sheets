let ArrayToGoogleSheets = require('../index');

let timeout = t => new Promise(cb => setInterval(cb, t));

// pls refer to the README how to get the docKey and creds
let docKey = "1ArUzJT6kYZGkQ8K8OD0eArp6fITGmrZL9FZMNqn_CcA";
let creds = require('../creds.json');
let a2gs = new ArrayToGoogleSheets(docKey, creds);

describe('Update Google Sheets', () => {
    it('Array with Number/String', async () => {
        let sheetName = "testing1";
        let values = [
            [0],
            [1, 2, 3],
            ['a', 'b', 'c'],
        ];

        try {
            await a2gs.updateGoogleSheets(sheetName, values, {margin: 1, minRow: 0, minCol: 1});
        }catch (err){
            console.log('caught error');
            console.log(err);
        }

    }).timeout(30 * 1000); // we have to wait longer for large data set

    it('Array With Formula', async () => {
        // pls refer to the README how to set this value
        let sheetName = "testing2";
        let values = [
            [1, 2, 3, {formula: '=sum(%1:%2)', cells: [{row: 1, col: 1}, {row: 1, col: 3}]}], // =sum(A1:C1)
            [4, 5, 6, {formula: '=%1/50', cells: [{row: 1, col: 3}]}], // =C1/50
            [7, 8, 9, {formula: '=sum(%1:%2)', cells: [{row: 'this', col: 1}, {row: 'this', col: 3}]}], // =sum(A3:C3)
            [{formula: '=sum(%1:%2)', cells: [{row: 1, col: 0}, {row: 1, col: 0}]}], // =sum(1:1);
            [{formula: '=sum(%1:%2)', cells: [{row: 1}, {row: 1}]}], // =sum(1:1);
            [{formula: '=sum(%1:%2)', cells: [{row: 0, col: 2}, {row: 0, col: 2}]}], // =sum(B:B);
        ];

        try {
            await a2gs.updateGoogleSheets(sheetName, values, {margin: 5, minRow: 10, minCol: 10, clear: false, resize: false});
        }catch (err){
            console.log('caught error');
            console.log(err);
        }

    }).timeout(30 * 1000); // we have to wait longer for large data set
});

