var util = require("util")

var createIntervalTree = require("../interval-tree.js")

//var intervals = [[0, 1], [0.5, 2], [3, 4], [2, 4], [1, 4], [3, 10], [-100, 1000]]

var intervals = [[0, 1], [2,3], [3.1,4], [4, 5], [6, 7], [7,8], [8,9], [9,10], [10, 11], [11,12], [12, 13], [13,14], [14,15]]

var t = createIntervalTree([intervals[0]])

for(var i=1; i<intervals.length; ++i) {
  t.insert(intervals[i])
}

for(var i=intervals.length-1; i>=5; --i) {
  t.remove(intervals[i])
}

//console.log(util.inspect(t, {depth:10}))

for(var i=-1; i<10; i+=1) {
  console.log("search:", i)
  t.queryPoint(i, function(interval) {
    console.log(i, " in ", interval)
  })
}

t.queryInterval(-2, 5, function(i) {
  console.log(i)
});

// Test query of whole interval
(function() {
    var t = createIntervalTree(intervals);

    var count = 0;
    t.queryInterval(-1, 100, function(i) { count++; });
    if(count != intervals.length) {
        console.log("W1. Failure!  Found only " + count + " of " + intervals.length);
    }
})();

// Test query of enclosed intervals
(function() {
    var t = createIntervalTree([[0, 100]]);

    var count = 0;
    t.queryInterval(10, 20, function(i) { count++; });
    if(count != 1) {
        console.log("I1. Failure!  Found only " + count + " of 1");
    }

    var count = 0;
    t.queryInterval(100, 100, function(i) { count++; });
    if(count != 1) {
        console.log("I2. Failure!  Found only " + count + " of 1");
    }

    var count = 0;
    t.queryInterval(110, 111, function(i) { count++; });
    if(count != 0) {
        console.log("I3. Failure!  Found " + count + " of 0");
    }

    var t = createIntervalTree([[0, 20], [30, 50]]);

    var count = 0;
    t.queryInterval(10, 15, function(i) { count++; });
    if(count != 1) {
        console.log("I4. Failure!  Found only " + count + " of 1");
    }

    var count = 0;
    t.queryInterval(25, 26, function(i) { count++; });
    if(count != 0) {
        console.log("I5. Failure!  Found " + count + " of 0");
    }

    var count = 0;
    t.queryInterval(35, 40, function(i) { count++; });
    if(count != 1) {
        console.log("I6. Failure!  Found only " + count + " of 1");
    }
})();