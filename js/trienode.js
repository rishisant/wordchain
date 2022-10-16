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