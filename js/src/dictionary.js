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

function return_power(word) {
    power = 0;
    word = word.toLowerCase();
    for(let i = 0; i < word.length; ++i) {
        power += score[i];
    }

    return power;
}

console.log(return_power("richesdang"));