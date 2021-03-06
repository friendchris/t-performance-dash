import { stations } from './constants';

const all_lines = () => {
  return [...new Set(stations.map(station => station.line))];
};

const options_direction = (line) => {
  return [...new Set(stations.filter(station => station.line === line).map(station => station.direction))];
};

const options_station = (line, direction, station_orig = null) => {
  console.log(`${line} ${direction}`, station_orig);
  // Find options from a certain station
  if (station_orig !== null) {
    const station_array = stations.filter(x => x.stop_id === station_orig.stop_id && x.direction === direction);
    if (station_array.length !== 1) {
      return [];
    }
    const selectable = stations.filter(x => x.line === line && x.direction === direction && x.stop_order > station_orig.stop_order);
    return selectable;

  }
  else {
    // Find all options
    return stations.filter(x => x.line === line && x.direction === direction);
  }
};

export {
  all_lines,
  options_direction,
  options_station,
};