var dictionary;
var sub_dict;

function setup() {
  dictionary = new Trie();
  dictionary.addCategory("food");
  dictionary.addCategory("fruit");
  dictionary.addCategory("cs");

  dictionary.add("apple", "food");
  dictionary.add("apple pie", "food");
  dictionary.add("apple", "fruit");
  dictionary.add("application", "cs");
  dictionary.add("applesauce", "food");
  dictionary.add("pear", "food");
  dictionary.debug_print();

  // dictionary.remove("apple", "food");
  // dictionary.debug_print();
  // debugger;
  sub_dict = new SubTrie(dictionary, new Set(["fruit", "food"]));
  sub_dict.initialize();
  sub_dict.debug_print();
  // sub_dict.remove("apple");
  // sub_dict.debug_print();
  // sub_dict.remove("applesauce");
  // sub_dict.debug_print();
}

function draw() {
  background(255);
  textSize(64);
  fill(0);
  text('Lol', 20, 80);
}
