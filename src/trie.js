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
        if(word === null || word === undefined) 
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

        if(word === null || word === undefined) 
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
        if(word === null || word === undefined) 
        {
            console.log("ERROR: trie removing undefined or null word");
            return false;
        }

        let lastNode = this.getLastNode(word);
        if(lastNode == null || !lastNode.hasLeafType(category))
        {
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
                this.add(currWord, category);
                break;
            }
        }
        for(let child of [...currNode.children.values()])
            this.recursiveBuild(child, currWord + child.char);
    }

    remove(word)
    {
        if(word === null || word === undefined) 
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