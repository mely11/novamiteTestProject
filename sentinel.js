import { S2L2ALayer, BBox, CRS_EPSG4326, MimeTypes, ApiType } from '@sentinel-hub/sentinelhub-js';

const perform = async () => {
  const layer = new S2L2ALayer({ instanceId: '85fae6a2-7590-4318-b540-a43f6b54fd95', layerId: 'L2A-LAYER' });
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
  document.querySelector("#image").src = URL.createObjectURL(imageBlob);
};
perform().then(() => { });

