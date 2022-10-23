<<<<<<< Updated upstream
// import { BBox, CRS_EPSG4326, MimeTypes, ApiType } from '@sentinel-hub/sentinelhub-js';

const { BBox, CRS_EPSG4326, MimeTypes, ApiType} = require('@sentinel-hub/sentinelhub-js');
=======
import { BBox, CRS_EPSG4326, MimeTypes, ApiType } from '@sentinel-hub/sentinelhub-js';
>>>>>>> Stashed changes

const bbox = new BBox(CRS_EPSG4326, 18, 20, 20, 22);
const getMapParams = {
  bbox: bbox,
  fromTime: new Date(Date.UTC(2021, 11 - 1, 22, 0, 0, 0)),
  toTime: new Date(Date.UTC(2021, 12 - 1, 22, 23, 59, 59)),
  width: 512,
  height: 512,
  format: MimeTypes.JPEG,
};

const imageBlob = await layer.getMap(getMapParams, ApiType.WMS);
<<<<<<< Updated upstream
const imageBlob2 = await layer.getMap(getMapParams, ApiType.PROCESSING);

document.querySelector("#image").src = imageBlob;

export{};
=======
const imageBlob2 = await layer.getMap(getMapParams, ApiType.PROCESSING);
>>>>>>> Stashed changes
