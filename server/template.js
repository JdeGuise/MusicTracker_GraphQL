const json2csv = require('json2csv');

exports.get = function(req, res) {
  const fields = [
    'name',
    'genres',
    'activeYears',
    'associatedActs',
    'instruments',
    'url',
    'description'
  ];

  const csv = json2csv({ data: '', fields: fields });
  res.set("Content-Disposition", "attachment;filename=artists.csv");
  res.set("Content-Type", "application/octet-stream");

  res.send(csv);
};
