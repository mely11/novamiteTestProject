# novamiteTestProject

This project used 
Google Map API, 

Yarn (dependency management) or npm (node package management) to install node modules, 

including sentinelhub.js


## Build tool: 
Parcel: https://parceljs.org (included in npm package) to combine all imported .js files into one .js file

CANNOT use vite (because of the usage of sentinelhub.js)


### yarn start:
Before that, don't forget to **yarn install**


### **node module need one line change** if there is an error similar to this:

![image](https://user-images.githubusercontent.com/45051238/197378062-eddf0b1c-e23c-452c-905b-f081e10dc897.png)

{

  "name": "@sentinel-hub/sentinelhub-js",
  
  "version": "0.2.82",
  
  "main": "dist/sentinelHub.cjs.js",
  
  "module": "dist/sentinelHub.esm.js",
  
  -> "browser": "dist/sentinelHub.umd.js",  ->  **line 6 in package.json -> dist/sentinelHub.cjs.js**
  
  "dependencies": {
  
    "@turf/area": "^6.0.1",
    
    "@turf/helpers": "^6.1.4",
    
    "@types/xml2js": "^0.4.4",
    
    "axios": "^0.18.1",
    
    "moment": "^2.24.0",
    
    "polygon-clipping": "^0.14.3",
    
    "query-string": "^6.4.2",
    
    "terraformer-wkt-parser": "^1.2.1",
    
    "xml2js": "^0.4.19"
    
  },
