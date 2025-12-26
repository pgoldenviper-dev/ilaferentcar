/**
 * Deploy as Web App (Execute as: Me, Who has access: Anyone, even anonymous)
 * Then set Formspree or your form to POST to the URL.
 */
function doGet(e){
  return ContentService.createTextOutput(JSON.stringify({status:'ok'})).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  try{
    var ss = SpreadsheetApp.openById("REPLACE_SHEET_ID");
    var sheet = ss.getSheetByName("Bookings") || ss.insertSheet("Bookings");
    var data = {};
    if(e.postData && e.postData.contents){
      // try parse as JSON
      try{ data = JSON.parse(e.postData.contents); } catch(err){
        // parse as form-urlencoded
        var params = e.parameter;
        for(var k in params) data[k]=params[k];
      }
    } else {
      data = e.parameter || {};
    }
    var row = [
      new Date(),
      data.name || '',
      data.phone || '',
      data.from || '',
      data.to || '',
      data.car || '',
      data.payment || '',
      data.notes || '',
      data.email || ''
    ];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({status:'success'})).setMimeType(ContentService.MimeType.JSON);
  } catch(err){
    return ContentService.createTextOutput(JSON.stringify({status:'error', message:err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}
