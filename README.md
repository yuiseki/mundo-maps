# mundo-maps

## Getting Started

- `mundo-maps` is a software that operates based on very simple mechanisms and rules.
- By using `mundo-maps`, you can quickly create digital maps that highlight any geospatial concerns in a specific area.

### Requirements

- Node.js v18 or v20
- npm

That is all you need!

### Let's launch the `mundo-maps` now!

Running `mundo-maps` is really, really easy!
Seeing is believing!

```bash
npm run ci
npm run dev
```

Run above commands, then open http://localhost:3000/

You should see `mundo-maps` is working on your machine!

You can stop dev server by `Ctrl + C`.

### Quick example - Let's do it now!

- YAML file `missions/Taito-ku/overpass.yml` is a demonstration and trial purpose
- This YAML file define contents of the http://localhost:3000/missions/Taito-ku
- For example,
  - Remove `toilets` definition
  - Append `post_office` definition
  - After modifying or adding the `overpass.yml` file, run the `npm run fetch-overpass` command
  - When append newer concern definition, you need to edit `src/const/ConcernLayerList.ts` file

## What is this?

- `mundo-maps` is part of the MUNDO project.
  - MUNDO is developed by the Smart Maps team of the UN Open GIS Initiative's Domain Working Group 7.
- MUNDO stands for "Model United Nations Development and Operations".
  - MUNDO is a model United Nations focusing on UN peacekeeping and development programs.
- MUNDO aims to enhance situational awareness in geospatial contexts for UN peacekeeping and development programs through OSS development.
- `mundo-maps` specifically focuses on simulating the development and operation of geospatial information systems in the UN.
- `mundo-maps` is based on open data sources such as OpenStreetMap and ReliefWeb.

## Why is MUNDO necessary?

- The United Nations actively encourages the development of open-source software (OSS).
- However, much of the actual data within the UN is managed and not generally available to the public.
- Additionally, it is not always clear what software or data the UN is seeking.
- Therefore, MUNDO aims to explore the requirements for software and data within the UN by conducting a model UN based on open data.
- Through these simulations, the goal is to develop more useful OSS.

## What can MUNDO do?

- `mundo-maps` is a software that operates based on very simple mechanisms and rules.
- By using `mundo-maps`, you can quickly create digital maps that highlight any geospatial concerns in a specific area.
  - This enhances geospatial situational awareness, such as "where is someone now," "what is in a certain location," and "what is happening there now."
  - `mundo-maps` can be used not only by the United Nations but also by local governments and NGOs to enhance geospatial situational awareness.
- Check out the specific examples of `mundo-maps`'s use in UNMISS (United Nations Mission in South Sudan) through the following URL and screenshots.

### https://mundo.yuiseki.net/missions/UNMISS

### Display military and UN-related facilities in the Republic of South Sudan.

[![Image from Gyazo](https://i.gyazo.com/374a1d7c3b05621aa9ddc873e7c11048.png)](https://gyazo.com/374a1d7c3b05621aa9ddc873e7c11048)

[![Image from Gyazo](https://i.gyazo.com/048d9a4332d0f764a733787c165deb8b.png)](https://gyazo.com/048d9a4332d0f764a733787c165deb8b)

### Display medical facilities in the Republic of South Sudan.

[![Image from Gyazo](https://i.gyazo.com/e1c0df4e6532a7900d8e7816fa9ad922.png)](https://gyazo.com/e1c0df4e6532a7900d8e7816fa9ad922)

### Display closed roads in Republic of South Sudan

[![Image from Gyazo](https://i.gyazo.com/a16fec8372618629e3af70696faced6a.png)](https://gyazo.com/a16fec8372618629e3af70696faced6a)

[![Image from Gyazo](https://i.gyazo.com/52c52135eb943fe834cbef3b0952aa42.png)](https://gyazo.com/52c52135eb943fe834cbef3b0952aa42)

### Display areas of armed conflict in the Republic of South Sudan.

[![Image from Gyazo](https://i.gyazo.com/74ea7b2fff67489ea0d892b6290bdc8d.png)](https://gyazo.com/74ea7b2fff67489ea0d892b6290bdc8d)

[![Image from Gyazo](https://i.gyazo.com/24433d619775435216631d4e39a6adca.png)](https://gyazo.com/24433d619775435216631d4e39a6adca)

[![Image from Gyazo](https://i.gyazo.com/e8c5c298406d9e06bcf6ca1d064f48a1.png)](https://gyazo.com/e8c5c298406d9e06bcf6ca1d064f48a1)

[![Image from Gyazo](https://i.gyazo.com/e20a4faeab56e0149a730ded0811b33c.png)](https://gyazo.com/e20a4faeab56e0149a730ded0811b33c)

## How does it work?

### Defining Regions and Concerns

- First, in a YAML file, define the target regions to be displayed on the map and the concerns to be addressed
  - This YAML file is used to retrieve data from OpenStreetMap
    - `mundo-maps` retrieves data from OpenStreetMap through the Overpass API
  - To see what is possible, refer to the `overpass.yml` file in the existing `./missions/${missionName}/` directory
  - To add new missions or regions, simply create a new directory in `./missions/${missionName}/` and add an `overpass.yml` file
- After modifying or adding the `overpass.yml` file, run the `npm run fetch-overpass` command
  - This command searches for all `overpass.yml` files in the `./missions/${missionName}/` directory, calls the Overpass API based on their contents, and saves the results in the `public/data` directory.

[![Image from Gyazo](https://i.gyazo.com/936c1e4d50a4d493844354f16de78657.png)](https://gyazo.com/936c1e4d50a4d493844354f16de78657)

[![Image from Gyazo](https://i.gyazo.com/b043c456f887fc7e096b51e148e98206.png)](https://gyazo.com/b043c456f887fc7e096b51e148e98206)

[![Image from Gyazo](https://i.gyazo.com/f5aaf5e3cfb59a098c6a9f81ea46d1bc.png)](https://gyazo.com/f5aaf5e3cfb59a098c6a9f81ea46d1bc)

### Handling "Temporary Concerns"

- `mundo-maps` uses OpenStreetMap as its primary source of geographic information, as mentioned earlier.
  - If the information you want to add is publicly available and complies with OpenStreetMap's policies, you should contribute to OpenStreetMap.
  - However, OpenStreetMap is a public system used by many users, and consistent policies must be followed.
  - Therefore, adding information to OpenStreetMap may not always be appropriate.
- In particular, OpenStreetMap has a policy of not handling "temporary information."
  - Temporary information includes events, accidents, disasters, conflicts, and so on.
  - `mundo-maps` refers to this type of information as "temporary concerns."
- `mundo-maps` has a mechanism for overwriting OpenStreetMap data as needed, allowing it to handle these "temporary concerns."
  - By specifying an OpenStreetMap ID in a YAML file, you can overwrite temporary information while basing the map on OpenStreetMap data.
  - To see what is possible, look at the `incidents` and `road_closed` directories in the existing `./missions/${missionName}/` directory.
  - To add new incident information, simply create a `./missions/${missionName}/incidents/${year}/${month}/${day}` directory and add a `${OpenStreetMapId}.yml` file.
  - To add new road closure information, simply create a `./missions/${missionName}/road_closed/${year}/${month}/${day}` directory and add a `${OpenStreetMapId}.yml` file.
- After modifying or adding a YAML file, run the `npm run fetch-overpass` command.
  - This command searches for all `${openStreetMapId}.yml` files in the `./missions/${missionName}/incidents` directory, calls the Overpass API based on their contents, overwrites the contents based on the YAML file, and saves the results to the `public/data` directory.

[![Image from Gyazo](https://i.gyazo.com/023e2da70daa156d0fadb6e1cac24ae9.png)](https://gyazo.com/023e2da70daa156d0fadb6e1cac24ae9)

[![Image from Gyazo](https://i.gyazo.com/f742a1729cf517cd6d1b5d815cecd1a8.png)](https://gyazo.com/f742a1729cf517cd6d1b5d815cecd1a8)

[![Image from Gyazo](https://i.gyazo.com/9dd1613b4753695c98c286e945d5f676.png)](https://gyazo.com/9dd1613b4753695c98c286e945d5f676)

### Handling of Classified Data

- `mundo-map` is capable of handling classified data, in addition to other types of data.
  - For example, `mundo-maps` can display several types of vector tile maps that are built for internal use within the United Nations as base maps.
  - These maps are restricted and can only be accessed by users who are connected to the UN intranet and have the appropriate viewing permissions.
- Similarly, `mundo-maps` has the technical capability to restrict access to sensitive information and display it only to a limited number of users.

[![Image from Gyazo](https://i.gyazo.com/46a523018154f49ef5fef215102fb67e.png)](https://gyazo.com/46a523018154f49ef5fef215102fb67e)

## Known Issues and Development Limitations

- "Temporary concerns" added as YAML files will not automatically disappear from the map even if the situation changes over time.
  - Therefore, there is a possibility that incorrect or outdated information may be displayed.
  - In the future, metadata such as the final confirmation date will be added to the YAML file to express that temporary concerns have continued or been resolved.
