// /**
//  * @license
//  * Copyright 2019 Google LLC. All Rights Reserved.
//  * SPDX-License-Identifier: Apache-2.0
//  */

import { S2L2ALayer, BBox, CRS_EPSG4326, MimeTypes, ApiType } from '@sentinel-hub/sentinelhub-js';

let imageURL;

const perform = async () => {
  const layer = new S2L2ALayer({ instanceId: '85fae6a2-7590-4318-b540-a43f6b54fd95', layerId: 'L2A-LAYER' });
  const bbox = new BBox(CRS_EPSG4326, 18, 20, 20, 22);

  const getMapParams = {
    bbox: bbox,
    fromTime: new Date(Date.UTC(2018, 11 - 1, 22, 0, 0, 0)),
    toTime: new Date(Date.UTC(2018, 12 - 1, 22, 23, 59, 59)),
    width: 256,
    height: 256,
    format: MimeTypes.JPEG,
  };
  const imageBlob = await layer.getMap(getMapParams, ApiType.WMS);
  imageURL = URL.createObjectURL(imageBlob);
};
perform().then(() => {});


function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 18,
      center: { lat: 37.783, lng: -122.403 },
    }
  );

  const bounds: Record<number, [[number, number], [number, number]]> = {
    17: [
      [20969, 20970],
      [50657, 50658],
    ],
    18: [
      [41939, 41940],
      [101315, 101317],
    ],
    19: [
      [83878, 83881],
      [202631, 202634],
    ],
    20: [
      [167757, 167763],
      [405263, 405269],
    ],
  };

  const imageMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      if (
        zoom < 17 ||
        zoom > 20 ||
        bounds[zoom][0][0] > coord.x ||
        coord.x > bounds[zoom][0][1] ||
        bounds[zoom][1][0] > coord.y ||
        coord.y > bounds[zoom][1][1]
      ) {
        return "";
      }

      return imageURL;
    },
    tileSize: new google.maps.Size(256, 256),
  });

  map.overlayMapTypes.push(imageMapType);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export { };
