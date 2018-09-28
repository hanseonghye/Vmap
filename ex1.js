var express = require('express');
var app = express();

// 정적 페이지 폴더 setting
app.use(express.static(__dirname + '/public'));

// request처리를 위해 필요
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', function (req, res) {
    res.send('hello world');
});

app.post('/getMap', function (req, res) {
    let socketData = [
        {
            name: "서울",
            pop: "50"
        },
        {
            name: "부산",
            pop: "30"
        },
        {
            name: "대전",
            pop: "20"
        },
        {
            name: "대구",
            pop: "20"
        },
    ];

    let result = convertArrayOfObjectsToCSV({data: socketData});
    var fs= require('fs');
    fs.writeFile('public/data/data1.csv', result, 'utf8', function(err){
        if (err) throw err;
    })
    res.send({fileName:"data1.csv"});
});

app.listen(3000);


function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    data = args.data || null;


    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
        ctr = 0;
        keys.forEach(function (key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });


    return result;
}