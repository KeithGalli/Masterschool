function addRow() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();

  sheet.appendRow(['A', 'B' ,'C'])
}

function addMenu() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
  .addItem('Add row','addRow')
  .addItem('Format table', 'formatSpreadsheet')
  .addItem('Get Latitude/Longitude', 'get_lat_long').addToUi();
}

function formatSpreadsheet() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getActiveSheet();

  let headers = sheet.getRange('A2:O2')

  headers.setFontWeight('bold');
  headers.setFontColor('white');
  headers.setBackground('#ABC883');
}

function get_lat_long() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Location');

  let cityname = sheet.getRange("A2").getValue();

  console.log(cityname);

  let appid = "INSERT API KEY HERE"; // <---- replace text with your key

  let url = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&appid=" + appid;
  let response = UrlFetchApp.fetch(url); // get api endpoint
  let json = response.getContentText(); // get the response content as text
  let data = JSON.parse(json); //parse text into json

  let lat = data[0].lat;
  let lon = data[0].lon;

  sheet.getRange("B2").setValue(lat);
  sheet.getRange("C2").setValue(lon);
}
