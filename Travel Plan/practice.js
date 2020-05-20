// if we call the display function before the screen is loaded, the issue will be that you'll be trying to draw something on a canvas that doesn't yet exist
onload = function () {
    // create a network
    var curr_data;
    var sz;
    var container = document.getElementById('mynetwork');
    var container2 = document.getElementById('mynetwork2');
    var genNew = document.getElementById('generate-graph');
    var solve = document.getElementById('solve');
    var temptext = document.getElementById('temptext');
    var temptext2 = document.getElementById('temptext2');
    // initialise graph options
    var options = {
        edges: {
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf015',
                size: 40,
                color: "blue",
            }
        }
    };
    // initialize your network!
    // where the problem network comes from
    var network = new vis.Network(container);
    network.setOptions(options);
    // where the answer is displayed
    var network2 = new vis.Network(container2);
    network2.setOptions(options);

    function createData() {
        sz = Math.floor(Math.random() * 8) + 3;
        const cities = ['Delhi', 'Mumbai', 'Gujarat', 'Goa', 'Kanpur', 'Jammu', 'Hyderabad', 'Bangalore', 'Gangtok', 'Meghalaya'];
        let nodes = [];
        for (let i = 1; i <= sz; i++) {
            nodes.push({ id: i, label: cities[i - 1] })
        }
        nodes = new vis.DataSet(nodes);

        let edges = [];
        for (let i = 2; i <= sz; i++) {
            // while adding new nodes to the graph, even though there is randomness, most nodes would end up being added to 1 or 2
            let neigh = i - Math.floor(Math.random() * Math.min(i - 1, 3) + 1);
            edges.push({ type: 0, from: i, to: neigh, color: 'orange', label: String(Math.floor(Math.random() * 70) + 31) });
        }

        src = 1;
        dst = sz;

        for (let i = 1; i <= sz / 2;) {
            let n1 = Math.floor(Math.random() * sz) + 1;
            let n2 = Math.floor(Math.random() * sz) + 1;
            if (n1 != n2) {
                if (n1 < n2) {
                    let tmp = n1;
                    n1 = n2;
                    n2 = tmp;
                }
                let works = 0;
                for (let j = 0; j < edges.length; j++) {
                    if (edges[j]['from'] === n1 && edges[j]['to'] === n2) {
                        if (edges[j]['type'] === 0)
                            works = 1;
                        else
                            works = 2;
                    }
                }

                if (works <= 1) {
                    if (works === 0 && i < sz / 4) {
                        edges.push({
                            type: 0,
                            from: n1,
                            to: n2,
                            color: 'orange',
                            label: String(Math.floor(Math.random() * 70) + 31)
                        });
                    } else {
                        edges.push({
                            type: 1,
                            from: n1,
                            to: n2,
                            color: 'green',
                            label: String(Math.floor(Math.random() * 50) + 1)
                        });
                    }
                    i++;
                }
            }
        }

        let data = {
            nodes: nodes,
            edges: edges
        };
        curr_data = data;
    }

    genNew.onclick = function () {
        createData();
        network.setData(curr_data);
        temptext2.innerText = 'Find least time path from ' + cities[src - 1] + ' to ' + cities[dst - 1];
        temptext.style.display = "inline";
        temptext2.style.display = "inline";
        container2.style.display = "none";

    };

    solve.onclick = function () {
        temptext.style.display = "none";
        temptext2.style.display = "none";
        container2.style.display = "inline";
        let data = solveData(sz);
        network2.setData(data);
    };

    function dijkstra(graph, sz, src) {
        let vis = Array(sz).fill(0);
        let dist = [];
        for (let i = 1; i <= sz; i++) {
            // -1 will be used to refer the parent or the node from where you got the minimum distance to the current node.
            dist.push([10000, -1]);
        }

        // distance of source has to be initially zero
        dist[src][0] = 0;

        // sz is the number of vertices
        // since, we are adding sz - 1 edges
        for (let i = 0; i < sz - 1; i++) {
            let mn = -1;
            // we have to find the index of the minimum value that has not been set!
            for (let j = 0; j < sz; j++) {
                if (vis[j] === 0) {
                    if (mn === -1 || dist[j][0] < dist[mn][0])
                        mn = j;
                }
            }

            // we need to set this value as 1 so that it is not considered again.
            vis[mn] = 1;
            for (let j in graph[mn]) {
                let edge = graph[mn][j];
                if (vis[edge[0]] === 0 && dist[edge[0]][0] > dist[mn][0] + edge[1]) {
                    // updating the distance
                    dist[edge[0]][0] = dist[mn][0] + edge[1];
                    // updating the parent of that node
                    dist[edge[0]][1] = mn;
                }
            }
        }

        return dist;
    }

    function solveData(sz) {
        // creating a graph
        let data = curr_data;
        let graph = [];
        for (let i = 1; i <= sz; i++) {
            graph.push([]);
        }

        for (let i = 0; i < data['edges'].length; i++) {
            let edge = data['edges'][i];
            if (edge['type'] === 1)
                continue;
            graph[edge['to'] - 1].push([edge['from'] - 1, parseInt(edge['label'])]);
            graph[edge['from'] - 1].push([edge['to'] - 1, parseInt(edge['label'])]);
        }

        // we call dijkstra to calculate the minimum distances from src to all nodes in dist1
        // and dist2 for min distance of all nodes from dest
        let dist1 = dijkstra(graph, sz, src - 1);
        let dist2 = dijkstra(graph, sz, dst - 1);

        // 0 value was the distance and 1 was the parent value.
        let mn_dist = dist1[dst - 1][0];

        // handling only one flight/ plane edge!
        // if plane == 0, we won't incorporate any plane edge!
        // if plane is non-zero, it contains the weight of the plane edge that is taken into consideration

        let plane = 0;
        let p1 = -1, p2 = -1;
        for (let pos in data['edges']) {
            let edge = data['edges'][pos];
            if (edge['type'] === 1) {
                let to = edge['to'] - 1;
                let from = edge['from'] - 1;
                let wght = parseInt(edge['label']);

                // the edges usage can be commutative!
                if (dist1[to][0] + wght + dist2[from][0] < mn_dist) {
                    plane = wght;
                    p1 = to;
                    p2 = from;
                    mn_dist = dist1[to][0] + wght + dist2[from][0];
                }
                if (dist2[to][0] + wght + dist1[from][0] < mn_dist) {
                    plane = wght;
                    p2 = to;
                    p1 = from;
                    mn_dist = dist2[to][0] + wght + dist1[from][0];
                }
            }
        }

        // we create the result on a separate graph
        new_edges = [];
        // when we need to take a plane
        if (plane !== 0) {
            new_edges.push({ arrows: { to: { enabled: true } }, from: p1 + 1, to: p2 + 1, color: 'green', label: String(plane) });
            new_edges.concat(pushEdges(dist1, p1, false));
            new_edges.concat(pushEdges(dist2, p2, true));
        } else {
            new_edges.concat(pushEdges(dist1, dst - 1, false));
        }
        data = {
            nodes: data['nodes'],
            edges: new_edges
        };
        return data;
    }

    function pushEdges(dist, curr, reverse) {
        tmp_edges = [];
        while (dist[curr][0] != 0) {
            let fm = dist[curr][1];
            if (reverse)
                new_edges.push({ arrows: { to: { enabled: true } }, from: curr + 1, to: fm + 1, color: 'orange', label: String(dist[curr][0] - dist[fm][0]) });
            else
                new_edges.push({ arrows: { to: { enabled: true } }, from: fm + 1, to: curr + 1, color: 'orange', label: String(dist[curr][0] - dist[fm][0]) });
            curr = fm;
        }
        return tmp_edges;
    }

    genNew.click();
};