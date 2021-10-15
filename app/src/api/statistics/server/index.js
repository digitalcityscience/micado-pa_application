import { axiosInstance } from 'boot/axios'
import { error_handler, isJSON } from '../../../helper/utility'
import * as xml2js from 'xml2js'

//set timeout in ms for api requests
const timeout = 350

const unhcrAPI = {
  Spain: {
    sea: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=190477&geo_id=729&sv_id=11&population_group=4797&frequency=month&fromDate=2018-01-01',
      name: 'Arrival by sea'
    },
    land: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=190478&geo_id=729&sv_id=11&population_group=4798&frequency=month&fromDate=2018-01-01',
      name: 'Arrival by land'
    },
    nationalities: {
      link: 'https://data2.unhcr.org/population/get/origin?widget_id=190463&geo_id=729&sv_id=11&population_collection=28&limit=10&fromDate=2020-01-01',
      name: 'Most common nationalities'
    }
  },
  Greece: {
    sea: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=197455&geo_id=640&sv_id=11&population_group=4797&frequency=month&fromDate=1900-01-01',
      name: 'Arrival by sea'
    },
    land: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=197456&geo_id=640&sv_id=11&population_group=4798&frequency=month&fromDate=2018-01-01',
      name: 'Arrival by land'
    },
    nationalities: {
      link: 'https://data2.unhcr.org/population/get/origin?widget_id=197446&geo_id=640&sv_id=11&population_group=4996&population_collection=28&limit=20&fromDate=2020-01-01',
      name: 'Most common nationalities'
    }
  },
  Italy: {
    sea: {
      link: 'https://data2.unhcr.org/population/get/timeseries?widget_id=197479&geo_id=656&sv_id=11&population_group=4797&frequency=month&fromDate=1900-01-01',
      name: 'Arrival by sea'
    },
    nationalities: {
      link: 'https://data2.unhcr.org/population/get/origin?widget_id=197472&geo_id=656&sv_id=11&population_collection=28&limit=200&fromDate=2020-01-01',
      name: 'Most common nationalities'
    }
  }
}
const hamburgAPI = [
  'https://geodienste.hamburg.de/HH_WFS_Zuzuege_ausserhalb_HH?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typename=mic:Zuzuege',
  'https://geodienste.hamburg.de/HH_WFS_Zuwanderung?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typename=mic:Zuwanderung',
  'https://geodienste.hamburg.de/HH_WFS_Zuzuege_Auszuege_oerU?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typename=mic:Zuzuege_Auszuege_oerU',
  // 'https://qs-geodienste.hamburg.de/HH_WFS_empfaengerzahlen?Service=WFS&Version=1.1.0&Request=GetCapabilities',
  'https://qs-geodienste.hamburg.de/HH_WFS_empfaengerzahlen?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&typename=de.hh.up:anzahl_personen_mit_leistungen_asylblg_gesamt,de.hh.up:anzahl_personen_mit_leistungen_paragr2_asylblg,de.hh.up:anzahl_personen_mit_leistungen_paragr3_asylblg'
]

export default {
  fetchStatistics() {
    return Promise.all([
      fetchLocalCharts(),
      fetchXML(hamburgAPI[0]),
      fetchXML(hamburgAPI[1]),
      fetchXML(hamburgAPI[2]),
      fetchXML(hamburgAPI[3]),
      // fetchXML(hamburgAPI[4]),
      fetchJSON(unhcrAPI.Spain.sea.link),
      fetchJSON(unhcrAPI.Spain.land.link),
      fetchJSON(unhcrAPI.Greece.sea.link),
      fetchJSON(unhcrAPI.Greece.land.link),
      fetchJSON(unhcrAPI.Italy.sea.link),
      fetchJSON(unhcrAPI.Spain.nationalities.link),
      fetchJSON(unhcrAPI.Greece.nationalities.link),
      fetchJSON(unhcrAPI.Italy.nationalities.link)
    ]).then(([localCharts, hamburg0, hamburg1, hamburg2, hamburg3,/* hamburg4,*/ Spain_sea, Spain_land, Greece_sea, Greece_land, Italy_sea, Spain_nat, Greece_nat, Italy_nat]) => {
      if (hamburg0 !== null) {
        localCharts.push(...parseHamburg(hamburg0))
      }
      if (hamburg1 !== null) {
        localCharts.push(...parseHamburg(hamburg1))
      }
      if (hamburg2 !== null) {
        localCharts.push(...parseHamburg(hamburg2))
      }
      if (hamburg3 !== null) {
        localCharts.push(...parseHamburg(hamburg3))
      }
      // if (Spain_sea !== null) {
      //   localCharts.push(parseUnhcrBar(Spain_sea,"Arrival by sea"))
      // }
      localCharts.push(parseUnhcrBar(Spain_sea,"Arrival by sea"))
      localCharts.push(parseUnhcrBar(Spain_land,"Arrival by land"))
      localCharts.push(parseUnhcrBar(Greece_sea,"Arrival by sea"))
      localCharts.push(parseUnhcrBar(Greece_land,"Arrival by land"))
      localCharts.push(parseUnhcrBar(Italy_sea,"Arrival by sea"))
      localCharts.push(parseUnhcrPie(Spain_nat,"Most common nationalities"))
      localCharts.push(parseUnhcrPie(Greece_nat,"Most common nationalities"))
      localCharts.push(parseUnhcrPie(Italy_nat,"Most common nationalities"))
      return {
        charts: localCharts
      }
    })
      .catch(error_handler)
  },
  addChart(chart) {
    switch (chart.format) {
      default:
        break
      case 'csv':
        chart.content = csvToJSON(chart.content)
        // chart.content = csvToJSON(chart.content).replace(/\n|\r/g, "")
        break
      case 'JSON':
        chart.content = chart.content.replace(/(\r\n|\n|\r)/gm, '').replace(/\s/g, '')
        break
      case 'API':
        break
    }
    if (isJSON(chart.content)) {
      return axiosInstance
        .post('/backend/1.0.0/charts', chart)
        .then((response) => response.data)
        .catch(error_handler)
    }
    return Promise.reject('Error: the file format/data formats is wrong')
  },
  deleteChart(id) {
    return axiosInstance
      .delete('/backend/1.0.0/charts/' + id)
      .then(response => response.data)
      .catch(error_handler)
  }
}

function fetchLocalCharts() {
  return axiosInstance
    .get('/backend/1.0.0/charts')
    .then((response) => response.data)
    .catch(error_handler)
}

function parseUnhcrBar(data,title) {
  // add date
  for (let i = 0; i < data.data.timeseries.length; i++) {
    const d = data.data.timeseries[i]
    d.date = `${d.year}.${d.month}`
  }
  return {
    board: 'UNHCR',
    id: data.title_language_en,
    category: data.data.geoMasterId.name,
    content: JSON.stringify(data.data.timeseries),
    description: data.situation_view_description,
    format: 'API',
    title: title,
    type: 'BAR',
    x: 'date',
    y: 'individuals',
    xistime: true,
    provider: 'UNHCR'
  }
}

function parseUnhcrPie(data,title) {
  return {
    board: 'UNHCR',
    category: data.data[0].geomaster_name,
    content: JSON.stringify(data.data),
    description: data.situation_view_description,
    format: 'API',
    title: title,
    type: 'PIE',
    provider: 'UNHCR',
    x: 'pop_origin_name',
    y: 'individuals',
    xistime: false
  }
}

function parseHamburg(json) {
  if (json !== null) {

    const board = 'Hamburg WFS'
    const category = Object.keys(json['wfs:FeatureCollection']['wfs:member'][0])[0]
    let data = json['wfs:FeatureCollection']['wfs:member'][0][category][0]
  
    const result = []
    Object.keys(data).forEach(key => {
      if (key != '$') {
        const content = data[key][0]['mic:zeitreihe'][0]['mic:zeitreihen-element']
        for (let [i, c] of content.entries()) {
          if (c["mic:datum"] != undefined && c["mic:wert"] != undefined) {
            c["mic:datum"] = c["mic:datum"][0]
            c["mic:wert"] = c["mic:wert"][0]
          } else {
            content.splice(i, 1)
          }
        }
        result.push({
          id: key,
          board,
          title: key.split(":")[1].replaceAll("_"," "),
          description: "",
          category: category.split(":")[1].replaceAll("_"," "),
          format: "API",
          provider: "Free and Hanseatic City of Hamburg",
          url: "",
          type: "BAR",
          xistime: true,
          x: "mic:datum",
          y: "mic:wert",
          content: JSON.stringify(content)
        })
      }
    })
    return result

  } else {
    return null
  }
}

// function parseHamburg2(json) {
//   const result = []
//   const board = 'Hamburg WFS'
//   let data = json['wfs:FeatureCollection']['gml:featureMember']
//   data.forEach((element, index) => {
//     let chartdata = element[Object.keys(element)][0]
//     let key = Object.keys(chartdata)[8]
//     let content = chartdata[key][0]['de.hh.up:values']
//     for (let [i, c] of content.entries()) {
//       if (c["de.hh.up:key"] != undefined && c["de.hh.up:value"] != undefined) {
//         c["de.hh.up:key"] = c["de.hh.up:key"][0]
//         c["de.hh.up:value"] = c["de.hh.up:value"][0]
//       } else {
//         content.splice(i, 1)
//       }
//     }
//     result.push({
//       id: index,
//       board,
//       title: chartdata['de.hh.up:information'][0],
//       description: '',
//       category: 'Anzahl Personen mit Leistungen nach Asylwerberleistungsgesetz',
//       format: 'API',
//       provider: "Free and Hanseatic City of Hamburg",
//       url: "",
//       type: "LINE",
//       xistime: true,
//       x: 'de.hh.up:key',
//       y: 'de.hh.up:value',
//       content: JSON.stringify(content)
//     })


//   })
//   return result

// }

function fetchJSON(url) {
  // const controller = new AbortController()
  // setTimeout(() => 
  // controller.abort(), timeout)
  // return fetch(url, { signal: controller.signal })
  //   .then((response) => response.json())
  //   .then(response => {return response})
  //   .catch(function () {return null})
  // return fetch(url, { signal: controller.signal })
  return fetch(url)
  .then((response) => response.json())
}

function fetchXML(url) {
  let valid = false
  const controller = new AbortController()
  setTimeout(() => 
  controller.abort(), timeout)
  return fetch(url, { signal: controller.signal })
    .then(res2 => {
      if (res2.status === 200 ) {
        valid = true
        return res2
      } else {
        valid = false
        return null
      }
    })
    .then(
      res2 => {
        if (valid === true) {
          return res2.text()
        }
        else return null
      }
      )
    .then(res2 => {
      if (valid === true) {
        const parser = new xml2js.Parser()
        return parser.parseStringPromise(res2)
      }
      else {
        return null
      }
    })
    .catch(function (e) {return null})
}

function csvToJSON(csv) {
  const lines = csv.replace(/\r/g, '').split('\n').filter((line) => line)
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    const obj = {}
    const currentline = lines[i].split(',')
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return JSON.stringify(result) // JSON
}


