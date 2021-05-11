// We have included this script for reference. This file contains the code that runs each time a Google
// Forms submission is made. We perform a lookup with the Google Maps API to convert the user-entered
// address string into a machine readable lat/long object, with all associated metadata.

const API_KEY = '<REDACTED>'
const SHEET_ID = '<REDACTED>'
const kId = 'What is the ID Number on your kindness card? (We need this to track the spread of kindness!)'
const kAddress = 'Where did the act of kindness take place? Be as specific as you want - we will look it up on Google Maps later.'
const kDescription = 'Tell us about the act of kindness you received!'

function onFormSubmit(e) {
  // sleep for 5 seconds to avoid any race conditions
  Utilities.sleep(5 * 1000)
  var items = e.response.getItemResponses();
  var itemValues = {}
  for (i in items) {
    itemValues[items[i].getItem().getTitle()] = items[i].getResponse();
  }
  updateSpreadsheet(itemValues)
}

function rowOfEntry(sheet, itemValues) {
  const data = sheet.getDataRange().getValues();
  const id = itemValues[kId]
  const address = itemValues[kAddress]
  const description = itemValues[kDescription]

  // filter
  const filt = data
    .map((d, i) => ({
      data: d,
      index: i,
    }))
    .filter(d => (`${d.data[1]}` === `${id}` && d.data[2] === address && d.data[3] === description))

  if (filt.length === 0) {
    console.error('NO DATA ENTRY FOUND')
    return null // TODO do something here
  }

  // return last entry's index - add 1 for indexing
  const rowNumber = filt[filt.length - 1].index + 1
  console.log('rowNumber!', rowNumber)
  return rowNumber
}

function updateSpreadsheet(itemValues) {
  console.log("\n***** Updating Spreadsheet *****\n")
  console.log("Kindness Form Dictionary -->", itemValues)

  var address = itemValues[kAddress]

  // TODO: add logic handling issues with this url fetch not working/address not able to return an actual location
  console.log("Address Supplied to Google Maps API -->", address)
  var response = UrlFetchApp.fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + address + '&key=' + API_KEY);
  console.log("\n\nGoogle Maps API URL Fetch Response Context Text -->", response.getContentText());
  const rawGeoText = response.getContentText();
  var geoData = JSON.parse(rawGeoText);

  // Center of the Geographic Location
  const latitude = geoData.results[0].geometry.location.lat;
  const longitude = geoData.results[0].geometry.location.lng;

  // Geocoded Data for Location
  var formatted_address = geoData.results[0].formatted_address

  const address_components = geoData.results[0].address_components

  var street_number = ""
  var street_name = ""
  var admin_3 = ""
  var admin_2 = ""
  var admin_1 = ""
  var country = ""
  var zip_code = ""

  // Populate Variables based on the adress_components parsed
  address_components.forEach(element => {
    console.log("element in components => ", element)
    var types = element.types
    // Street Number
    if (types.includes("street_number")) {
      street_number = element.long_name
    }
    // Street_name
    else if (types.includes("route")) {
      street_name = element.long_name
    }
    // locality [admin_level_3] (city)
    else if (types.includes("locality")) {
      admin_3 = element.long_name
    }
    // admin_2 (county)
    else if (types.includes("administrative_area_level_2")) {
      admin_2 = element.long_name
    }
    // admin_1 (state)
    else if (types.includes("administrative_area_level_1")) {
      admin_1 = element.long_name
    }
    // country
    else if (types.includes("country")) {
      country = element.long_name
    }
    // // country
    // else if (types.includes("postal_code_suffix")) {
    //   zip_code = element.long_name
    // }
    // country
    else if (types.includes("postal_code")) {
      zip_code = "'" + element.long_name
    }
  })



  var sheet = SpreadsheetApp.openById(SHEET_ID);
  var lastRow = sheet.getLastRow()
  var lastRowNew = rowOfEntry(sheet, itemValues)
  if (lastRow !== lastRowNew) {
    // update - trust the new version
    lastRow = lastRowNew
  }

  console.log("Inserting Geographic Data in row -->", lastRow)

  sheet.getRange(`I${lastRow}`).setValue(latitude)
  sheet.getRange(`J${lastRow}`).setValue(longitude)

  // Entries for the raw geo formatted data
  sheet.getRange(`K${lastRow}`).setValue(formatted_address)
  sheet.getRange(`L${lastRow}`).setValue(street_number)
  sheet.getRange(`M${lastRow}`).setValue(street_name)
  sheet.getRange(`N${lastRow}`).setValue(admin_3)
  sheet.getRange(`O${lastRow}`).setValue(admin_2)
  sheet.getRange(`P${lastRow}`).setValue(admin_1)
  sheet.getRange(`Q${lastRow}`).setValue(country)
  sheet.getRange(`R${lastRow}`).setValue(zip_code)

  console.log("GEOCODED lat ==> ", latitude)
  console.log("GEOCODED lng ==> ", longitude)
  console.log("GEOCODED address_components ==> ", address_components)
  console.log("GEOCODED formatted_address ==> ", formatted_address)
  console.log("GEOCODED street_number ==> ", street_number)
  console.log("GEOCODED street_name ==> ", street_name)
  console.log("GEOCODED admin_3 ==> ", admin_3)
  console.log("GEOCODED admin_2 ==> ", admin_2)
  console.log("GEOCODED admin_1 ==> ", admin_1)
  console.log("GEOCODED country ==> ", country)
  console.log("GEOCODED zip ==> ", zip_code)

  // Disabled writing the full raw geo data so we don't use it when not necessary
  // sheet.getRange(`N${lastRow}`).setValue(rawGeoText)

  console.log(`\nGoogle Maps [Lat, Lng] --> [${latitude}, ${longitude}]`)

  // Bounding Box around Geographic Location (if exists)
  if (geoData.results[0].geometry.bounds) {
    const topRight = geoData.results[0].geometry.bounds.northeast
    const bottomLeft = geoData.results[0].geometry.bounds.southwest
    console.log("\nBounding Box Top Right Lat/Lon -->", topRight)
    console.log("\nBounding Box Bottom Left Lat/Lon -->", bottomLeft)

    sheet.getRange(`E${lastRow}`).setValue(topRight.lat)
    sheet.getRange(`F${lastRow}`).setValue(topRight.lng)
    sheet.getRange(`G${lastRow}`).setValue(bottomLeft.lat)
    sheet.getRange(`H${lastRow}`).setValue(bottomLeft.lng)
  }

  console.log("\n***** Stopped Spreadsheet Update *****\n")
}

function debug() {
  // Bounding Box and Lat/Lon
  var test_dict = {
    'ID NUMBER on kindness card': '123',
    'CITY where act of kindness took place': 'Boston',
    'STATE': 'MA',
    '[OPTIONAL] ZIP CODE': '02111',
    '[Optional] STREET NAME': '49 Washington Street',
    '[Optional] Tell us about the act of kindness you received!': 'Test 123'
  }

  // Just Lat/Lon Data
  var other_test_dict = {
    'ID NUMBER on kindness card': '123',
    'CITY where act of kindness took place': 'Portland',
    'STATE': 'ME',
    '[OPTIONAL] ZIP CODE': '04917',
    '[Optional] STREET NAME': '123 Main Street',
    '[Optional] Tell us about the act of kindness you received!': 'Test 456'
  }
  updateSpreadsheet(test_dict)
}

function debugGeoCode() {
  geoData = {
    "results": [
      {
        "address_components": [
          {
            "long_name": "50",
            "short_name": "50",
            "types": ["street_number"]
          },
          {
            "long_name": "Crescent Lane",
            "short_name": "Crescent Ln",
            "types": ["route"]
          },
          {
            "long_name": "Sudbury",
            "short_name": "Sudbury",
            "types": ["locality", "political"]
          },
          {
            "long_name": "Middlesex County",
            "short_name": "Middlesex County",
            "types": ["administrative_area_level_2", "political"]
          },
          {
            "long_name": "Massachusetts",
            "short_name": "MA",
            "types": ["administrative_area_level_1", "political"]
          },
          {
            "long_name": "United States",
            "short_name": "US",
            "types": ["country", "political"]
          },
          {
            "long_name": "01776",
            "short_name": "01776",
            "types": ["postal_code"]
          },
          {
            "long_name": "1674",
            "short_name": "1674",
            "types": ["postal_code_suffix"]
          }
        ],
        "formatted_address": "50 Crescent Ln, Sudbury, MA 01776, USA",
        "geometry": {
          "bounds": {
            "northeast": {
              "lat": 42.389049,
              "lng": -71.4228746
            },
            "southwest": {
              "lat": 42.3888415,
              "lng": -71.4231171
            }
          },
          "location": {
            "lat": 42.38895120000001,
            "lng": -71.4229557
          },
          "location_type": "ROOFTOP",
          "viewport": {
            "northeast": {
              "lat": 42.3902942302915,
              "lng": -71.4216468697085
            },
            "southwest": {
              "lat": 42.3875962697085,
              "lng": -71.4243448302915
            }
          }
        },
        "place_id": "ChIJmSsbarGP44kRZ5LubMQHCdQ",
        "types": ["premise"]
      }
    ],
    "status": "OK"
  }

  // Center of the Geographic Location
  const latitude = geoData.results[0].geometry.location.lat;
  const longitude = geoData.results[0].geometry.location.lng;

  // Geocoded Data for Location
  var formatted_address = geoData.results[0].formatted_address

  const address_components = geoData.results[0].address_components

  var street_number = 0
  var street_name = ""
  var admin_3 = ""
  var admin_2 = ""
  var admin_1 = ""
  var country = ""
  var zip_code = ""

  address_components.forEach(element => {
    console.log("element in components => ", element)
    var types = element.types
    // Street Number
    if (types.includes("street_number")) {
      admin_2 = element.long_name
    }
    // Street_name
    else if (types.includes("route")) {
      street_name = element.long_name
    }
    // locality [admin_level_3] (city)
    else if (types.includes("locality")) {
      admin_3 = element.long_name
    }
    // admin_2 (county)
    else if (types.includes("administrative_area_level_2")) {
      admin_2 = element.long_name
    }
    // admin_1 (state)
    else if (types.includes("administrative_area_level_1")) {
      admin_1 = element.long_name
    }
    // country
    else if (types.includes("country")) {
      country = element.long_name
    }
    // country
    else if (types.includes("postal_code")) {
      zip_code = element.long_name
    }
  })

  console.log("lat ==> ", latitude)
  console.log("lng ==> ", longitude)
  console.log("address_components ==> ", address_components)
  console.log("formatted_address ==> ", formatted_address)
  console.log("street_number ==> ", street_number)
  console.log("street_name ==> ", street_name)
  console.log("admin_3 ==> ", admin_3)
  console.log("admin_2 ==> ", admin_2)
  console.log("admin_1 ==> ", admin_1)
  console.log("country ==> ", country)
  console.log("zip ==> ", zip_code)
}
