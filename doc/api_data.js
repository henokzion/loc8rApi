define({ "api": [
  {
    "type": "get",
    "url": "/api/locations",
    "title": "Get List of nearby locations",
    "name": "GetLocations_by_distance",
    "group": "Locations",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The users name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "age",
            "description": "<p>The users age</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success:",
          "content": "[\n {\n   \"distance\": 0,\n   \"name\": \"FriendShip\",\n   \"address\": \"Bole\",\n   \"rating\": 3,\n   \"facilities\": [\n     \"Hot drinks\",\n     \"Food\"\n   ],\n   \"_id\": \"591c19b85ea787b7da5e94ae\"\n }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/locations.js",
    "groupTitle": "Locations"
  },
  {
    "type": "get",
    "url": "/api/locations/:locationid",
    "title": "Get one location",
    "name": "Get_one_location",
    "group": "Locations",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The users name.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "age",
            "description": "<p>The users age</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success:",
          "content": "{\n  \"_id\": \"591c19b85ea787b7da5e94ae\",\n  \"name\": \"FriendShip\",\n  \"address\": \"Bole\",\n  \"coords\": [\n    38.78217,\n    8.99046\n  ],\n  \"reviews\": [\n    {\n      \"author\": \"Henok Teklu\",\n      \"_id\": \"591c1b6c5ea787b7da5e94af\",\n      \"rating\": 5,\n      \"timestamp\": \"2016-07-24T21:00:00.000Z\",\n      \"reviewText\": \"What a greate place.\",\n      \"createdOn\": \"2017-05-18T09:28:48.480Z\"\n    }\n  ],\n  \"openingTimes\": [\n    {\n      \"days\": \"Monday - Friday\",\n      \"opening\": \"7:00am\",\n      \"closing\": \"7:00pm\",\n      \"closed\": false\n    },\n    {\n      \"days\": \"Saturday\",\n      \"opening\": \"8:00am\",\n      \"closing\": \"5:pm\",\n      \"closed\": false\n    },\n    {\n      \"days\": \"Sunday\",\n      \"closed\": true\n    }\n  ],\n  \"facilities\": [\n    \"Hot drinks\",\n    \"Food\"\n  ],\n  \"rating\": 3\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./controllers/locations.js",
    "groupTitle": "Locations"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "_home_henok_Projects_nodesites_loc8rApi_doc_main_js",
    "groupTitle": "_home_henok_Projects_nodesites_loc8rApi_doc_main_js",
    "name": ""
  }
] });
