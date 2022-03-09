//this is what the bot knows
var vocabulary = [
    ['hi', ['hello', 'greetings', 'hey there']],
    ['good morning', 'Good morning, I can see the sun from up in space!'],
    ['good night', 'Good night, looks like its a full moon today!'],
    ['who are you', 'I am Cosmo, who are you?'],
    ['how are you', ['I am good', 'I am fine', 'I am doing well']],
    ['what is your name', 'I am Cosmo, an Astronaut'],
    ['what is your favorite color', 'I prefer white, like my spacesuit'],
    ['what is space like', ['Extremely cold', 'big', 'lonely']],
    ['have you seen an alien', 'Not yet, but I hope I can meet one soon'],
    ['do you like space', ['Space is a beautiful, but lonely place', 'space is empty but it is quite beautiful']],
    ['when did you become an astronaut', 'I have been an Astronaut since the first Apollo mission'],
    ['how fast is a space ship', 'Leaving the Earth\'s atmostphere takes a tremendous amount of energy'],
    ['what time is it', ['Time in space is relative to the current time on Earth and distance from Earth', 'I wish I knew, I left my watch in the airlock']],
    ['where are you', 'In space, but specifically the Andromeda galaxy'],
    ['is it hard to become an astronaut', 'Becoming an Astronaut requires lots of physical training, as well as a lot of education'],
    ['can regular people travel to space', 'In time, everyone will be able to travel through space'],
    ['what do you do in space', ['On a daily basis, I check the equipment on the spaceship, and perform tests on items from space', 'I perform maintenance and testing on this spacecraft']],
    ['what do you eat', 'Food in space is usually freeze dried and nutrient heavy blocks. Astronauts can also request things like Pizza and Ice Cream'],
    ['when are you coming back', 'Usually, I spend between 1-3 years in space before coming back to Earth. Resource limitations are the main reason why I need to return.'],
    ['how long have you been there', 'Currently I have spent a total of 40 years in space'],
    ['where do you live', 'Each Astronaut on this ship has a room that they can stay in'],
    ['what is your favorite food', 'On Earth, Carbonara, but in space, Beef Stew'],
    ['what is your hobby', 'I like to pass my time by drawing my surroundings in a notebook'],
    ['how old are you', 'I am 65 years old'],
    ['how far are you', 'From Earth, I am 2.537 Million light years away'],
    ['what is your favorite star', 'The Pleiades is my favorite'],
    ['tell me more about the pleiades', 'It is a cluster of 7 stars known as The Seven Sisters'],
    ['where is pleiades', 'The Pleiades cluster is about 444 light years away from Earth'],
    ['have you seen a black hole', 'Not in person, and I am not sure of what the outcome would be if that was the case'],
    ['is space scary', 'Space can be terrifying at times, due to the isolation and unkown aspects'],
    ['goodbye', ['Thank you for spending time with me', 'I appreciated the chat', 'enjoy your day']],
    ['have a nice day', ['Enjoy the rest of yours', 'you too', 'I will, thank you']],
    ['see you later', ['Another time then', 'thank you for the chat', 'hope to see you again']]
];

function bestMatch(str1) {
    var bestMatch = 0;
    var bestMatchnum = 0;
    for (var i = 0; i < vocabulary.length; i++) {
        var splitString = vocabulary[i][0].split(' ');
        var wordsMatched = 0;
        for (var j = 0; j < splitString.length; j++) {
            if (str1.includes(splitString[j]))
                wordsMatched++;
        }
        if (wordsMatched > bestMatchnum) {
            bestMatchnum = wordsMatched;
            bestMatch = i;
        }
    }
    return bestMatch;
}

const getResponseFromVocabulary = (index) => {
    //if there is just one response, return that
    //if there are multiple, randomly choose one

    const response = vocabulary[index][1];
    if (Array.isArray(response)) {
        return response[Math.floor(Math.random() * response.length)];
    } else {
        return response;
    }

};

var stemmer = (function(){
	var step2list = {
			"ational" : "ate",
			"tional" : "tion",
			"enci" : "ence",
			"anci" : "ance",
			"izer" : "ize",
			"bli" : "ble",
			"alli" : "al",
			"entli" : "ent",
			"eli" : "e",
			"ousli" : "ous",
			"ization" : "ize",
			"ation" : "ate",
			"ator" : "ate",
			"alism" : "al",
			"iveness" : "ive",
			"fulness" : "ful",
			"ousness" : "ous",
			"aliti" : "al",
			"iviti" : "ive",
			"biliti" : "ble",
			"logi" : "log"
		},

		step3list = {
			"icate" : "ic",
			"ative" : "",
			"alize" : "al",
			"iciti" : "ic",
			"ical" : "ic",
			"ful" : "",
			"ness" : ""
		},

		c = "[^aeiou]",          // consonant
		v = "[aeiouy]",          // vowel
		C = c + "[^aeiouy]*",    // consonant sequence
		V = v + "[aeiou]*",      // vowel sequence

		mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
		meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
		mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
		s_v = "^(" + C + ")?" + v;                   // vowel in stem

	return function (w) {
		var 	stem,
			suffix,
			firstch,
			re,
			re2,
			re3,
			re4,
			origword = w;

		if (w.length < 3) { return w; }

		firstch = w.substr(0,1);
		if (firstch == "y") {
			w = firstch.toUpperCase() + w.substr(1);
		}

		// Step 1a
		re = /^(.+?)(ss|i)es$/;
		re2 = /^(.+?)([^s])s$/;

		if (re.test(w)) { w = w.replace(re,"$1$2"); }
		else if (re2.test(w)) {	w = w.replace(re2,"$1$2"); }

		// Step 1b
		re = /^(.+?)eed$/;
		re2 = /^(.+?)(ed|ing)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			re = new RegExp(mgr0);
			if (re.test(fp[1])) {
				re = /.$/;
				w = w.replace(re,"");
			}
		} else if (re2.test(w)) {
			var fp = re2.exec(w);
			stem = fp[1];
			re2 = new RegExp(s_v);
			if (re2.test(stem)) {
				w = stem;
				re2 = /(at|bl|iz)$/;
				re3 = new RegExp("([^aeiouylsz])\\1$");
				re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
				if (re2.test(w)) {	w = w + "e"; }
				else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
				else if (re4.test(w)) { w = w + "e"; }
			}
		}

		// Step 1c
		re = /^(.+?)y$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(s_v);
			if (re.test(stem)) { w = stem + "i"; }
		}

		// Step 2
		re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			suffix = fp[2];
			re = new RegExp(mgr0);
			if (re.test(stem)) {
				w = stem + step2list[suffix];
			}
		}

		// Step 3
		re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			suffix = fp[2];
			re = new RegExp(mgr0);
			if (re.test(stem)) {
				w = stem + step3list[suffix];
			}
		}

		// Step 4
		re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
		re2 = /^(.+?)(s|t)(ion)$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(mgr1);
			if (re.test(stem)) {
				w = stem;
			}
		} else if (re2.test(w)) {
			var fp = re2.exec(w);
			stem = fp[1] + fp[2];
			re2 = new RegExp(mgr1);
			if (re2.test(stem)) {
				w = stem;
			}
		}

		// Step 5
		re = /^(.+?)e$/;
		if (re.test(w)) {
			var fp = re.exec(w);
			stem = fp[1];
			re = new RegExp(mgr1);
			re2 = new RegExp(meq1);
			re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
			if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
				w = stem;
			}
		}

		re = /ll$/;
		re2 = new RegExp(mgr1);
		if (re.test(w) && re2.test(w)) {
			re = /.$/;
			w = w.replace(re,"");
		}

		// and turn initial Y back to y

		if (firstch == "y") {
			w = firstch.toLowerCase() + w.substr(1);
		}

		return w;
	}
})();

// Levenshtein Distance (Takes differences between 2 strings and returns the number of differences) 
// Known algrothim
const levenshteinDistance = (str1 = '', str2 = '') => {
    const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1, // deletion
                track[j - 1][i] + 1, // insertion
                track[j - 1][i - 1] + indicator, // substitution
            );
        }
    }
    return track[str2.length][str1.length];
};

//return a random possible input. Used in conjunction w/ client's fillIdea()
function getIdea() {
    return vocabulary[Math.floor(Math.random() * vocabulary.length)][0];
}

//all the input-parsing code goes into this function
function getResponse(input){

    // //this strips the punctuation and the spaces from user input
    // var punctRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;

    // //convert to lower case | remove punctuation | remove spaces
    // var userInput = input.replace(punctRE, '').replace(/\s+/g, ' ').toLowerCase();

    var userInput = stemmer(input);

    var bestmatching = bestMatch(userInput);

    var respo = getResponseFromVocabulary(bestmatching)+" new";

    return respo;
}

module.exports = getResponse;
module.exports.getIdea = getIdea;