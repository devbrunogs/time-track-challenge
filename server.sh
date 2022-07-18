#!/bin/bash
http-server --proxy http://localhost:8080? ./dist & json-server -H 0.0.0.0 db.json