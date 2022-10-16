// SCRIPT.js
// author @rishisant
var all_topics;
var master_dictionary;
var game_dictionary;
var chosen_topics;
let words_left;
let power = 100;
var score = {
    'a': 2,
    'b': 6,
    'c': 6,
    'd': 4,
    'e': 2,
    'f': 8,
    'g': 4,
    'h': 8,
    'i': 2,
    'j': 16,
    'k': 10,
    'l': 2,
    'm': 6,
    'n': 2,
    'o': 2,
    'p': 6,
    'q': 20,
    'r': 2,
    's': 2,
    't': 2,
    'u': 2,
    'v': 8,
    'w': 8,
    'x': 16,
    'y': 8,
    'z': 20,
};


// what did you enter??
function change() {
    let input = document.getElementById("inpbox").value;
    document.getElementById("checker").innerHTML = "you entered: " + input;
}

function chooseeasy() {
    sessionStorage.setItem("easymode", "true")
    sessionStorage.setItem("mediummode", "false")
    sessionStorage.setItem("hardmode", "false")
    sessionStorage.setItem("chainedmode", "false")
    location.replace('./html/instructions.html')
}

function choosemedium() {
    sessionStorage.setItem("mediummode", "true")
    sessionStorage.setItem("easymode", "false")
    sessionStorage.setItem("hardmode", "false")
    sessionStorage.setItem("chainedmode", "false")
    location.replace('./html/instructions.html')
}

function choosehard() {
    sessionStorage.setItem("hardmode", "true")
    sessionStorage.setItem("mediummode", "false")
    sessionStorage.setItem("easymode", "false")
    sessionStorage.setItem("chainedmode", "false")
    location.replace('./html/instructions.html')
}

function choosechained() {
    sessionStorage.setItem("chainedmode", "true")
    sessionStorage.setItem("mediummode", "false")
    sessionStorage.setItem("hardmode", "false")
    sessionStorage.setItem("easymode", "false")
    location.replace('./html/instructions.html')
}

let minv;
let maxv;

function startgame() {
    // set topic to something
    // query from arr
    // done

    if (sessionStorage.getItem("easymode") == "true") {
        sessionStorage.setItem("gameready", "true");
        words_left = 10;
        location.replace('./easymode.html')
    }
    else if (sessionStorage.getItem("mediummode") == "true") {
        sessionStorage.setItem("gameready", "true");
        words_left = 8;
        location.replace('./mediummode.html')
    }
    else if (sessionStorage.getItem("hardmode") == "true") {
        sessionStorage.setItem("gameready", "true");
        words_left = 5;
        location.replace('./hardmode.html')
    }
    else {
        sessionStorage.setItem("gameready", "true");
        words_left = 3;
        location.replace('./chainedmode.html')
    }
}

function return_power(word) {
    power = 0;
    word = word.toLowerCase();
    for(let i = 0; i < word.length; ++i) {
        power += score[word[i]];
    }
    return power;
}

function randTopicInt() {
    return Math.floor(Math.random() * (5 - 0)) + 0;
}

var correct_words = [];
function chain() {
    x = sessionStorage.getItem("gameready");
    if (x == "true") { 
        loadTopics();
        loadMasterDictionary();
        if (sessionStorage.getItem("easymode") == "true") { words_left = 10; }
        else if (sessionStorage.getItem("mediummode") == "true") { words_left = 8; }
        else if (sessionStorage.getItem("hardmode") == "true") { words_left = 5; }
        else { words_left = 3; }
        if (randTopicInt() == 0) {
            selectTopic("fixed", "countries"); 
            document.getElementById("topic").innerHTML = "Topic: Countries";
        }
        else if (randTopicInt() == 1) {
            selectTopic("fixed", "animals");
            document.getElementById("topic").innerHTML = "Topic: Animals";
        }
        else if (randTopicInt() == 2) {
            selectTopic("fixed", "body_parts");
            document.getElementById("topic").innerHTML = "Topic: Human Body Parts";
        }
        else if (randTopicInt() == 3) {
            selectTopic("fixed", "adjectives");
            document.getElementById("topic").innerHTML = "Topic: Adjectives";
        }
        else {
            selectTopic("fixed", "league_characters");
            document.getElementById("topic").innerHTML = "Topic: League of Legends Characters";
        }
        sessionStorage.setItem("gameready", "done");
    }
    else {
        if (correct_words.length == 0) {
            power = 100;
        }
        correct = false;
        
        text = document.getElementById("inpbox").value.toLowerCase();
        if (game_dictionary.has(text) && correct_words.length == 0) {
            game_dictionary.remove(text);
            console.log("correct");
            correct = true;
            words_left--;
            correct_words.push(text);
            document.getElementsByClassName("floating")[0].style.animation = "pulsate_g 1.5s 1";
            setTimeout(function() {
                document.getElementsByClassName("floating")[0].style.animation = '';
            }, 1700);
            // document.getElementById("power").style.animation="pulsate_g 1.5s 1";
            // setTimeout(function() {
            //     document.getElementById("power").style.animation = '';
            // }, 1700);
            power = power - return_power(text);
            document.getElementsByClassName("floating")[0].innerHTML = "<bigtext id=\"power\">" + power + "<sub>" + words_left + "</sub></bigtext></div>";
            
        }
        else if (game_dictionary.has(text) && correct_words.length != 0) {
            last_word = correct_words[correct_words.length - 1];
            console.log(last_word);
            if (text[0] == last_word[last_word.length - 1]) {
                correct = true;
                words_left--;
                correct_words.push(text);
                document.getElementsByClassName("floating")[0].style.animation = "pulsate_g 1.5s 1";
                setTimeout(function() {
                document.getElementsByClassName("floating")[0].style.animation = '';
                }, 1700);
                // document.getElementById("power").style.animation="pulsate_g 1.5s 1";
                // setTimeout(function() {
                //     document.getElementById("power").style.animation = '';
                // }, 1700);
                power = power - return_power(text);
                document.getElementsByClassName("floating")[0].innerHTML = "<bigtext id=\"power\">" + power + "<sub>" + words_left + "</sub></bigtext></div>";
            }
            else {
                correct = false;
                console.log("wrong word " + text);
                document.getElementsByClassName("floating")[0].style.animation = "pulsate_r 1.5s 1";
                setTimeout(function() {
                document.getElementsByClassName("floating")[0].style.animation = '';
                }, 1700);
                // document.getElementById("power").style.animation="pulsate_r 1.5s 1";
                // setTimeout(function() {
                // document.getElementById("power").style.animation = '';
                // }, 1700);
                words_left--;
                if (words_left == 0 && power != 0) {
                    location.replace('./credits.html')
                }
                document.getElementsByClassName("floating")[0].innerHTML = "<bigtext id=\"power\">" + power + "<sub>" + words_left + "</sub></bigtext></div>";
            }
        }
        else {
            correct = false;
            console.log("wrong word " + text);
            document.getElementsByClassName("floating")[0].style.animation = "pulsate_r 1.5s 1";
                setTimeout(function() {
                document.getElementsByClassName("floating")[0].style.animation = '';
                }, 1700);
            // document.getElementById("power").style.animation="pulsate_r 1.5s 1";
            // setTimeout(function() {
            // document.getElementById("power").style.animation = '';
            //}, 1700);
            words_left--;
            if (words_left == 0 && power != 0) {
                location.replace('./credits.html')
            }
            document.getElementsByClassName("floating")[0].innerHTML = "<bigtext id=\"power\">" + power + "<sub>" + words_left + "</sub></bigtext></div>";
        }
        if (words_left == 0 && power != 0) {
            location.replace('./credits.html')
        }
        else if (words_left > 0 && power <= 0) {
            correct_words = [];
            location.replace('./win.html');
        }
    }
}

function loadTopics(filename) {
    all_topics = [];
    let request = new XMLHttpRequest();
    request.open("GET", "../topics.txt", false);
    request.send(null);
    let list = request.responseText;
    for(let topic of list.split('\n'))
        all_topics.push(topic.trim());
    console.log(all_topics);
}

function loadMasterDictionary(filename) {
    master_dictionary = new Trie();
    for(let topic of all_topics)
    {
        let request = new XMLHttpRequest();
        master_dictionary.addCategory(topic);
        request.open("GET", "../topics/" + topic + ".txt", false);
        request.send(null);
        let text = request.responseText;
        for(let line of text.split('\n'))
            master_dictionary.add(line.trim().toLowerCase(), topic);
    }
    //master_dictionary.debug_print();
}

function selectTopic(policy, topic)
{
    chosen_topics = new Set();
    switch(policy)
    {
        case "random":
            chosen_topics.add(all_topics[Math.floor(Math.random()*all_topics.length)]);
            break;
        case "fixed":
            chosen_topics.add(topic);
            break;
        default:
            break;
    }
    game_dictionary = new SubTrie(master_dictionary, chosen_topics);
    game_dictionary.initialize();
    game_dictionary.debug_print();
}

class Trie 
{
    constructor()
    {
        this.root = new TrieNode('@');
        this.categories = new Set();
    }

    addCategory(category)
    {
        this.categories.add(category);
    }

    has(word)
    {
        let last_node = this.getLastNode(word);
        return last_node != null && last_node.isLeaf();
    }

    getLastNode(word)
    {
        if(word === null || word === undefined || word == "") 
        {
            console.log("ERROR: trie searching undefined or null word");
            return;
        }

        let curr = this.root;
        for(let i = 0; i < word.length; i++)
        {
            let letter = word[i];
            if(curr.hasChild(letter))
                curr = curr.getChild(letter);
            else
                return null;;
        }
        return curr;
    }

    add(word, category)
    {
        if(!this.categories.has(category))
        {
            console.log("WARNING: Unrecognized category, add category " + category + " first.");
            return;
        }

        if(word === null || word === undefined || word == "") 
        {
            console.log("ERROR: trie adding undefined or null word");
            return;
        }

        let curr = this.root;
        for(let i = 0; i < word.length; i++)
        {
            let letter = word[i];
            if(curr.hasChild(letter))
                curr = curr.getChild(letter);
            else
            {
                let toAdd = new TrieNode(letter);
                curr.addChild(letter, toAdd);
                curr = toAdd;
            }
        }
        curr.markLeaf(category);
    }

    remove(word, category)
    {
        if(word === null || word === undefined || word == "") 
        {
            console.log("ERROR: trie removing undefined or null word");
            return false;
        }

        let lastNode = this.getLastNode(word);
        if(lastNode == null || !lastNode.hasLeafType(category))
        {
            console.log("this word doesn't exist");
            return false;
        }
        
        if(lastNode.children.size > 0 || lastNode.leafTypes.size > 1)
            lastNode.unmarkLeaf(category);
        else
        {
            let predecessors = [];
            let curr = this.root;
            predecessors.push(curr);
            for(let i = 0; i < word.length; i++)
            {
                let next = curr.getChild(word[i])
                predecessors.push(curr.getChild(word[i]));
                curr = next;
            }
            let idx = word.length - 1;
            while(idx >= 0)
            {
                let prev = predecessors[idx];
                prev.children.delete(curr.char);
                if(prev.children.size > 0)
                    break;
                curr = prev;
                if(curr.isLeaf())
                    break;
                idx--;
            }
        }

        return true;
    }

    debug_print()
    {
        this.recursivePrintHelper(this.root, 0);
    }

    recursivePrintHelper(node, level)
    {
        let curLine = "";
        for(let i = 0; i < level; i++)
            curLine = curLine + "\t";
        console.log(curLine + node.toString());
        for(let child of [...node.children.values()])
            this.recursivePrintHelper(child, level + 1);
    }
}

class SubTrie extends Trie
{
    constructor(base, filters)
    {   
        super();
        this.parent = base;
        this.categories = filters;
        this.initialized = false;
    }

    addCategory(category)
    {
        console.log("PANIC: Cannot add categories to filtered dictionaries");
    }

    initialize()
    {
        for(let first_node of [...this.parent.root.children.values()])
            this.recursiveBuild(first_node, first_node.char);
        this.initialized = true;
    }

    recursiveBuild(currNode, currWord)
    {
        for(let category of [...this.categories.values()])
        {
            if(currNode.hasLeafType(category))
            {
                console.log("adding " + currWord + " to " + category);  
                this.add(currWord, category); 
                break;
            }
        }
        for(let child of [...currNode.children.values()])
            this.recursiveBuild(child, currWord + child.char);
    }

    remove(word)
    {
        if(word === null || word === undefined || word == "") 
        {
            console.log("ERROR: trie removing undefined or null word");
            return false;
        }

        let lastNode = this.getLastNode(word);
        if(lastNode == null || !lastNode.isLeaf())
        {
            return false;
        }

        if(lastNode.hasChildren())
            lastNode.unmarkLeaves();
        else
        {
            let predecessors = [];
            let curr = this.root;
            predecessors.push(curr);
            for(let i = 0; i < word.length; i++)
            {
                let next = curr.getChild(word[i])
                predecessors.push(curr.getChild(word[i]));
                curr = next;
            }
            let idx = word.length - 1;
            while(idx >= 0)
            {
                let prev = predecessors[idx];
                prev.children.delete(curr.char);
                if(prev.children.size > 0)
                    break;
                curr = prev;
                if(curr.isLeaf())
                    break;
                idx--;
            }
        }
    }

    debug_print()
    {
        super.debug_print();
        console.assert(this.initialized);
    }
}

class TrieNode
{
    constructor(c)
    {
        this.children = new Map(); // <char, TrieNode>
        this.leafTypes = new Set();
        this.char = c;
    }

    hasChild(c)
    {
        return this.children.has(c);
    }

    getChild(c)
    {
        return this.children.get(c);
    }

    addChild(c, node)
    {
        this.children.set(c, node);
    }

    hasChildren()
    {
        return this.children.size > 0;
    }

    isLeaf()
    {
        return this.leafTypes.size > 0;
    }

    hasLeafType(type)
    {
        return this.leafTypes.has(type);
    }

    markLeaf(type)
    {
        this.leafTypes.add(type);
    }

    unmarkLeaf(type)
    {
        this.leafTypes.delete(type);
    }

    unmarkLeaves()
    {
        this.leafTypes.clear();
    }

    toString()
    {
        let leafTypeString = "\"" + this.char + "\" ";
        if(this.isLeaf())
        {
            leafTypeString = leafTypeString + "(";
            for(let type of [...this.leafTypes.values()])
                leafTypeString = leafTypeString + type + ",";
            leafTypeString = leafTypeString + ")";
        }
        return leafTypeString;
    }
}

