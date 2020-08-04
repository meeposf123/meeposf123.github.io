/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

// ES5
var town = (function(){
  function Town(name, buildYear, parks, streets){
    this.name = name;
    this.buildYear = buildYear;
    this.parks = parks;
    this.streets = streets;
  }
  var town;
  return {
    totalAreaOfParks: function(){
      var sum = 0;
      for(var i = 0; i < town.parks.length; i++){
        sum += town.parks[i].area;
      }
      return sum;
  },
  averageAgeOfTownParks: function(){
    return this.totalAreaOfParks()/town.parks.length;
  },
  totalLengthOfStreets: function(){
    var sum = 0;
    for(var i = 0; i < town.streets.length; i++){
      sum += town.streets[i].lengthOfStreet;
    }
    return sum;
  },
  averageLengthOfStreets: function(){
    return this.totalLengthOfStreets()/town.streets.length;
  },
    makeTown: function(name, buildYear, parks, streets){
      town = new Town(name, buildYear, parks, streets);
    },
    displayAverageAgeOfTownParks: function(parks){
      console.log('Our ' + town.parks.length + ' parks have an average of ' + this.averageAgeOfTownParks() + ' years.');
    }
}
})();

var park = (function(){
  function Park(name, buildYear, numberOfTrees, area){
    this.name = name;
    this.buildYear = buildYear;
    this.numberOfTrees = numberOfTrees;
    this.area = area;
  }
  var data = {
    parks: []
  }
  function treeDensity(numberOfTrees, area){
    return numberOfTrees/area;
}
  return {
    makePark: function(name, buildYear, numberOfTrees, area){
      data.parks.push(new Park(name, buildYear, numberOfTrees, area));
    },
    displayDensities: function(){
      data.parks.forEach(function(curr) {
        console.log(curr.name + ' has a density of ' + treeDensity(curr.numberOfTrees, curr.area) + ' trees per square km');
      });
    },
    getParks: function(){
      return data.parks;
    }
}
})();

var street = (function(){
  function Street(name, buildYear, lengthOfStreet, sizeClassification){
    this.name = name;
    this.buildYear = buildYear;
    this.lengthOfStreet = lengthOfStreet;
    sizeClassification === undefined ? this.sizeClassification = "normal" : this.sizeClassification = sizeClassification
  }
  var data = {
    streets: []
  }
  return {
      makeStreet: function(name, buildYear, lengthOfStreet, sizeClassification){
        data.streets.push(new Street(name, buildYear, lengthOfStreet, sizeClassification));
      },
      getStreets: function(){
        return data.streets;
      }
  }
})();



var init = (function(town, park, street){

  park.makePark('Park 1', 2000, 1000, 1221);
  park.makePark('Park 2', 2001, 2000, 2221);
  park.makePark('Park 3', 2002, 3000, 3221);

  street.makeStreet('Street 1', 2000, 1000, 'big');
  street.makeStreet('Street 2', 2001, 2000, 'huge');
  street.makeStreet('Street 3', 2002, 3000, 'tiny');
  street.makeStreet('Street 4', 2003, 4000);

  var parks = park.getParks();
  var streets = street.getStreets();

  town.makeTown('Town', 1999, parks, streets);

  function parkReport(){
  console.log('-----PARKS REPORT-----');
  park.displayDensities();
  town.displayAverageAgeOfTownParks(parks);

  parks.forEach(function(curr) {
    if(curr.numberOfTrees > 1000){
      console.log(curr.name + ' has more than ' + curr.numberOfTrees + ' trees.');
    }
  });
  }


  function streetReport(){
    console.log('-----STREETS REPORT-----');
    console.log('Our ' + streets.length + ' streets have a total length of ' + town.totalLengthOfStreets() + ' km, with an average of ' + town.averageLengthOfStreets() + ' km.');
    streets.forEach(function(curr) {
      console.log(curr.name + ', build in ' + curr.buildYear + ', is a ' + curr.sizeClassification + ' street.');
    });
  }


parkReport();
streetReport();


})(town, park, street);



// ES6
{
class Town{
  constructor(name, buildYear, parks, streets){
    this.name = name;
    this.buildYear = buildYear;
    this.parks = parks;
    this.streets = streets;
  }
  totalAreaOfParks(){
    let sum = 0;
    for(let i = 0; i < this.parks.length; i++){
      sum += this.parks[i].area;
    }
    return sum;
  }
  averageAgeOfTownParks(){
    return this.totalAreaOfParks()/this.parks.length;
  }
  totalLengthOfStreets(){
    let sum = 0;
    for(let i = 0; i < this.streets.length; i++){
      sum += this.streets[i].lengthOfStreet;
    }
    return sum;
  }
  averageLengthOfStreets(){
    return this.totalLengthOfStreets()/this.streets.length;
  }
}

class Park{
  constructor(name, buildYear, numberOfTrees, area){
    this.name = name;
    this.buildYear = buildYear;
    this.numberOfTrees = numberOfTrees;
    this.area = area;
  }
  treeDensity(){
    return this.numberOfTrees/this.area;
  }
}

class Street{
  constructor(name, buildYear, lengthOfStreet, sizeClassification = "normal"){
    this.name = name;
    this.buildYear = buildYear;
    this.lengthOfStreet = lengthOfStreet;
    this.sizeClassification = sizeClassification;
  }
}

let parks = [];
parks.push(new Park('Park 1', 2000, 1000, 1221));
parks.push(new Park('Park 2', 2001, 2000, 2221));
parks.push(new Park('Park 3', 2002, 3000, 3221));

let streets = [];
streets.push(new Street('Street 1', 2000, 1000, 'big'));
streets.push(new Street('Street 2', 2001, 2000, 'huge'));
streets.push(new Street('Street 3', 2002, 3000, 'tiny'));
streets.push(new Street('Street 4', 2003, 4000));

const town = new Town('Town', 1999, parks, streets);

function parkReport(){
console.log('-----PARKS REPORT-----');
parks.forEach(curr => {
  console.log(`${curr.name} has a density of ${curr.treeDensity()} trees per square km`);
});
console.log(`Our ${town.parks.length} parks have an average of ${town.averageAgeOfTownParks()} years.`);

parks.forEach(curr => {
  if(curr.numberOfTrees > 1000){
    console.log(`${curr.name} has more than ${curr.numberOfTrees} trees.`);
  }
});
}
function streetReport(){
  console.log('-----STREETS REPORT-----');
  console.log(`Our ${streets.length} streets have a total length of ${town.totalLengthOfStreets()} km, with an average of ${town.averageLengthOfStreets()} km.`);
  streets.forEach(curr => {
    console.log(`${curr.name}, build in ${curr.buildYear}, is a ${curr.sizeClassification} street.`);
  });
}



parkReport();
streetReport();
}
