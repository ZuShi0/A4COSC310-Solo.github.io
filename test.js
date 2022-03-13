let Natural = require('natural');
var str = "what are your opinions on alien?";
var temp = posTagger(str.toLowerCase());
console.log(temp);
var temp2 = temp.taggedWords[0].token;
console.log(temp2);
// Tokenizes a string and creates 
function posTagger(input){
	var language = 'EN';
	var lexicon = new Natural.Lexicon(language, 'n', 'N');
	var rules = new Natural.RuleSet(language);

	var tagger = new Natural.BrillPOSTagger(lexicon, rules);

	var tokenizer = new Natural.WordTokenizer();

	var tokens = tokenizer.tokenize(input);
	return tagger.tag(tokens);
}