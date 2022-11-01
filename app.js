// // Map
// // Initialize and add the map
// function initMap() {
//   // The location of rome
//   const rome = { lat: 41.9, lng: 12.5 };
//   // The map, centered at rome
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom:10,
//     center: rome,
//   });
//   // The marker, positioned at rome
//   const marker = new google.maps.Marker({
//     position: rome,
//     map: map,
//   });
// }

import { BBox, CRS_EPSG4326, MimeTypes, ApiType } from '@sentinel-hub/sentinelhub-js';


// window.initMap = initMap;

// mobile animation 
const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')
menu.addEventListener('click', function () {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});

// default dropdown button 
var subjectObject = {
  "Front-end": {
    "HTML": ["Links", "Images", "Tables", "Lists"],
    "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
    "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
  },
  "Back-end": {
    "PHP": ["Variables", "Strings", "Arrays"],
    "SQL": ["SELECT", "UPDATE", "DELETE"]
  }
}
window.onload = function () {
  var subjectSel = document.getElementById("subject");
  var topicSel = document.getElementById("topic");
  var chapterSel = document.getElementById("chapter");
  for (var x in subjectObject) {
    subjectSel.options[subjectSel.options.length] = new Option(x, x);
  }
  subjectSel.onchange = function () {
    //empty Chapters- and Topics- dropdowns
    chapterSel.length = 1;
    topicSel.length = 1;
    //display correct values
    for (var y in subjectObject[this.value]) {
      topicSel.options[topicSel.options.length] = new Option(y, y);
    }
  }
  topicSel.onchange = function () {
    //empty Chapters dropdown
    chapterSel.length = 1;
    //display correct values
    var z = subjectObject[subjectSel.value][this.value];
    for (var i = 0; i < z.length; i++) {
      chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
    }
  }
}

/*
async function getimagefroms3() {
  const response = await fetch('https://vtag6coa54.execute-api.us-east-1.amazonaws.com/1/sdf-test-image-1?file=Honolulu-Hawaii-Airbus.jpg');
  const json = await response.json();
  console.log(json.message);
}
getimagefroms3();*/

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
  var apigClient = {};
  if (config === undefined) {
    config = {
      accessKey: '',
      secretKey: '',
      sessionToken: '',
      region: '',
      apiKey: undefined,
      defaultContentType: 'application/json',
      defaultAcceptType: 'application/json'
    };
  }
  if (config.accessKey === undefined) {
    config.accessKey = '';
  }
  if (config.secretKey === undefined) {
    config.secretKey = '';
  }
  if (config.apiKey === undefined) {
    config.apiKey = '';
  }
  if (config.sessionToken === undefined) {
    config.sessionToken = '';
  }
  if (config.region === undefined) {
    config.region = 'us-east-1';
  }
  //If defaultContentType is not defined then default to application/json
  if (config.defaultContentType === undefined) {
    config.defaultContentType = 'application/json';
  }
  //If defaultAcceptType is not defined then default to application/json
  if (config.defaultAcceptType === undefined) {
    config.defaultAcceptType = 'application/json';
  }


  // extract endpoint and path from url
  var invokeUrl = 'https://vtag6coa54.execute-api.us-east-1.amazonaws.com/1';
  var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
  var pathComponent = invokeUrl.substring(endpoint.length);

  var sigV4ClientConfig = {
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    sessionToken: config.sessionToken,
    serviceName: 'execute-api',
    region: config.region,
    endpoint: endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType
  };

  var authType = 'NONE';
  if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
    authType = 'AWS_IAM';
  }

  var simpleHttpClientConfig = {
    endpoint: endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType
  };

  var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);



  apigClient.bucketGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) { additionalParams = {}; }

    apiGateway.core.utils.assertParametersDefined(params, ['bucket', 'file'], ['body']);

    var bucketGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/{bucket}').expand(apiGateway.core.utils.parseParametersToObject(params, ['bucket',])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['file']),
      body: body
    };


    return apiGatewayClient.makeRequest(bucketGetRequest, authType, additionalParams, config.apiKey);
  };


  return apigClient;
};

const bbox = new BBox(CRS_EPSG4326, 18, 20, 20, 22);
const getMapParams = {
  bbox: bbox,
  fromTime: new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0)),
  toTime: new Date(Date.UTC(2018, 12 - 1, 22, 23, 59, 59)),
  width: 512,
  height: 512,
  format: MimeTypes.JPEG,
};

const imageBlob = await layer.getMap(getMapParams, ApiType.WMS);
const imageBlob2 = await layer.getMap(getMapParams, ApiType.PROCESSING);
document.querySelector("#image").src = imageBlob;
