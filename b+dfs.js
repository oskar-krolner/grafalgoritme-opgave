// Build adjacency list from edge list
function constructAdj(V, edges) {
    const adj = Array.from({ length: V }, () => []);

    for (let i = 0; i < edges.length; i++) {
        const [u, v] = edges[i];
        adj[u].push(v);
        adj[v].push(u);
    }

    return adj;
}

// Helper function to perform DFS and find articulation points
// using Tarjan's algorithm.
function findPoints(adj, u, visited, disc, low, timeRef, parent, isAP) {
    
    // Mark vertex u as visited and assign discovery
    // time and low value
    visited[u] = 1;
    disc[u] = low[u] = ++timeRef.value;
    let children = 0;

    // Process all adjacent vertices of u
    for (let v of adj[u]) {
        
        // If v is not visited, then recursively visit it
        if (!visited[v]) {
            children++;
            findPoints(adj, v, visited, disc, low, timeRef, u, isAP);

            // Check if the subtree rooted at v has a 
            // connection to one of the ancestors of u
            low[u] = Math.min(low[u], low[v]);

            // If u is not a root and low[v] is greater 
            // than or equal to disc[u],
            // then u is an articulation point
            if (parent !== -1 && low[v] >= disc[u]) {
                isAP[u] = 1;
            }
        }
        
        // Update low value of u for back edge
        else if (v !== parent) {
            low[u] = Math.min(low[u], disc[v]);
        }
    }

    // If u is root of DFS tree and has more than 
    // one child, it is an articulation point
    if (parent === -1 && children > 1) {
        isAP[u] = 1;
    }
}

// Main function to find articulation points in the graph
function articulationPoints(V, edges) {
    const adj = constructAdj(V, edges);
    const disc = Array(V).fill(0);
    const low = Array(V).fill(0);
    const visited = Array(V).fill(0);
    const isAP = Array(V).fill(0);
    const timeRef = { value: 0 };

    // Run DFS from each vertex if not
    // already visited (to handle disconnected graphs)
    for (let u = 0; u < V; u++) {
        if (!visited[u]) {
            findPoints(adj, u, visited, disc, low, timeRef, -1, isAP);
        }
    }

    // Collect all vertices that are articulation points
    const result = [];
    for (let u = 0; u < V; u++) {
        if (isAP[u]) {
            result.push(u);
        }
    }

    // If no articulation points are found, return array containing -1
    return result.length === 0 ? [-1] : result;
}

// Driver Code
const V = 16;
const edges = [
    [0, 1],
    [1, 4],
    [2, 11],
    [2, 4],
    [3, 4],
    [4, 5],
    [5, 9],
    [6, 9],
    [7, 8],
    [8, 9],
    [9, 10],
    [10, 11],
    [11, 4],
    [12, 3],
    [13, 10],
    [14, 15],
    [15, 1]
];
function bfs(start, adj, visited) {
    let queue = [[start, -1]]; 
    visited[start] = true;

    while (queue.length > 0) {
        let [node, parent] = queue.shift();

        for (let neighbor of adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push([neighbor, node]);
            } else if (neighbor !== parent) {
                return true;
            }
        }
    }
    return false;
}

function constructadj(V, edges){
    let adj = Array.from({length : V}, () => []);

    // Build the adjacency list
    for (let edge of edges) {
        let [u, v] = edge;
        adj[u].push(v);
        adj[v].push(u);
    }
    return adj;
}

function isCycle(V, edges) {
    let adj = constructadj(V,edges);

    let visited = Array(V).fill(false);

    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            if (bfs(i, adj, visited)) {
                return true;
            }
        }
    }

    return false;
}

// Test the function
console.log(isCycle(V, edges) ? "true" : "false");
