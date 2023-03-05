# mundo-maps

## What?

- MUNDO is an acronym for "Model United Nations Development and Operations"
- MUNDO is a Model United Nations focusing on UN peacekeeping operations and the UNDP
- mundo-maps is focusing simulates the development and operation of geospatial information systems in the United Nations
- mundo-maps is based on OpenStreetMap, ReliefWeb and other Open Data

## Why?

- The United Nations actively promotes the development of open source software
- However, much of the actual data from the UN is confidential and not publicly available
- It is also not clear what kind of software and data the UN is looking for
- Therefore, MUNDO explores the requirements of the UN by conducting a Model UN based on Open Data
- The goal is to develop more useful OSS through these simulations

## How?

- mundo-maps retrieves OpenStreetMap data through the Overpass API
  - You can define your concerns in a YAML file to retrieve data from OpenStreetMap
    - To know what is possible, look at the `overpass.yml` files in the `./missions/:missonName/` directory
- OpenStreetMap has a policy of not handling temporary information
  - Temporary information is, for example, incidents, accidents, disasters, conflicts, etc
- mundo-maps can overwrite OpenStreetMap data as needed
  - You can specify an OpenStreetMap ID to overwrite temporary information and display it on the map
