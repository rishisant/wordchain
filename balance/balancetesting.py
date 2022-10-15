# balancetesting.py
# @author rishisant

# All values of each character
power_dict = {
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
}

# Determining power of a word
def return_power(word):
    power = 0
    word = word.lower()
    for letter in word:
        power += power_dict[letter]
    return power

def decrease_power(power, word):
    return (power - return_power(word))

# Main Program Starts Here
word = ""
# while (word != 'q' or word != 'quit'):
#     word = input('enter word here: ')
#     print(return_power(word))

# Implementing Actual Game Here
wordarr = []
power = 100
wordsleft = 3
print('power is: ' + str(power) + ' and words left = ' + str(wordsleft))
word = input('input word here: ')
power = decrease_power(power, word)
wordarr.append(word)
prevword = word
wordsleft -= 1
while (word != 'q' or word != 'quit'):
    if (wordsleft == 0 and power != 0):
        print('you lost.')
        break
    if (power <= 0):
        print('you won with ' + str(wordsleft) + ' words left!')
        print('the words you used were: ')
        for word in wordarr:
            print(word)
        break
    print('power is: ' + str(power) + ' and words left = ' + str(wordsleft))
    word = input('input word here: ')
    if (word[0] != prevword[len(prevword) - 1]):
        print('invalid word.')
    else:
        prevword = word
        wordarr.append(word)
        power = decrease_power(power, word)
        wordsleft -= 1