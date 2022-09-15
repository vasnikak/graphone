(()=>{"use strict";var t={193:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(514));class n extends i.default{constructor(t){super(t)}addEdge(t,e,s=1){const r=this.getVertex(t);if(!r)return this;const i=this.getVertex(e);return i?(r.addOutEdgeWith(i,s),i.addInEdgeWith(r,s),this):this}removeEdge(t,e){const s=this.getVertex(t);if(!s)return this;const r=this.getVertex(e);return r?(s.removeOutEdgeWith(r),r.removeInEdgeWith(s),this):this}getEdgesNum(){let t=0;return this.getVertices().forEach((e=>t+=e.getOutEdgesNum())),t}hasCycles(t=!0){const e=new Map,s=new Map,r=this.getVertices();r.forEach((t=>{e.set(t.getLabel(),!1),s.set(t.getLabel(),!1)}));const i=r=>{if(s.get(r.getLabel()))return!0;if(e.get(r.getLabel()))return!1;if(e.set(r.getLabel(),!0),s.set(r.getLabel(),!0),!t&&r.hasSelfLoop())return!0;const n=r.getOutNeighbors();for(let t of n)if(!t.equals(r)&&i(t))return!0;return s.set(r.getLabel(),!1),!1};for(let t of r)if(!e.get(t.getLabel())&&i(t))return!0;return!1}getDensity(){const t=this.getEdgesNum(),e=this.getVerticesNum();return t/(e*(e-1))}}e.default=n},165:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e,s=1){this.origin=t,this.destination=e,this.weight=s}getOrigin(){return this.origin}getDestination(){return this.destination}getWeight(){return this.weight}setWeight(t){return this.weight=t,this}toString(){return"Edge["+this.destination.toString()+", weight: "+this.weight+"]"}}},514:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(914)),n=r(s(569));class a{constructor(t){t||(t=a.DEFAULT_GRAPH_NAME),this.name=t,this.vertices={}}getName(){return this.name}setName(t){this.name=t}getVertices(){const t=[];for(let e in this.vertices)this.vertices.hasOwnProperty(e)&&t.push(this.vertices[e]);return t}getVerticesNum(){let t=0;for(let e in this.vertices)this.vertices.hasOwnProperty(e)&&t++;return t}getOrder(){return this.getVerticesNum()}addVertex(t,e){return this.vertices[t]=new n.default(t,e),this}addVertices(t){return t.forEach((t=>{let e,s;Array.isArray(t)?(e=t[0],s=t[1]):e=t[0],this.addVertex(e,s)})),this}hasVertex(t){return!!this.vertices[t]}updateVertex(t,e){return this.addVertex(t,e)}getVertex(t){return this.vertices[t]}getVertexData(t){return this.vertices[t]?this.vertices[t].getData():void 0}getVerticesByLabels(t){const e=[];return t.forEach((t=>{const s=this.getVertex(t);s&&e.push(s)})),e}areNeighbors(t,e){const s=this.getVertex(t);if(!s)return!1;const r=this.getVertex(e);return!!r&&s.hasOutEdgeWith(r)}addEdges(t){return t.forEach((t=>this.addEdge(t[0],t[1],t[2]))),this}getEdge(t,e){let s,r;if(t instanceof n.default)s=t;else{if(!this.hasVertex(t))return;s=this.getVertex(t)}if(e instanceof n.default)r=e;else{if(!this.hasVertex(e))return;r=this.getVertex(e)}return s.getOutEdgeWith(r)}hasEdge(t,e){return!!this.getEdge(t,e)}removeEdges(t){return t.forEach((t=>this.removeEdge(t[0],t[1]))),this}clear(){return this.vertices={},this}clearEdges(){return this.getVertices().forEach((t=>{t.getInEdges().forEach((t=>{this.removeEdge(t.getOrigin().getLabel(),t.getDestination().getLabel())})),t.getOutEdges().forEach((t=>{this.removeEdge(t.getOrigin().getLabel(),t.getDestination().getLabel())}))})),this}getPath(t){const e=new i.default;for(let s of t){const t=this.getVertex(s);if(!t)return new i.default;e.add(t)}return e}hasSelfLoops(){for(let t of this.getVertices())if(t.hasSelfLoop())return!0;return!1}getSelfLoopCount(){let t=0;for(let e of this.getVertices())e.hasSelfLoop()&&t++;return t}forEachVertex(t){this.getVertices().forEach((e=>t(e)))}toString(){const t=this.getVerticesNum();let e="Graph "+this.name+" ("+t+" vertices)\n\n",s=0;return this.getVertices().forEach((r=>{e+=r.toString()+"\n",r.getOutEdges().forEach((t=>{e+="   "+t.toString()+"\n"})),++s<t&&(e+="\n")})),e}equals(t){if(this===t)return!0;if(!(t instanceof a))return!1;const e=t;if(this.getVerticesNum()!==e.getVerticesNum())return!1;const s=this.getVertices();for(let t of s){const s=e.getVertex(t.getLabel());if(!s)return!1;if(!t.equals(s))return!1}return!0}}e.default=a,a.DEFAULT_GRAPH_NAME="Graph"},914:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});class s{constructor(t=[]){this.path=t}getPath(){return this.path}length(){return this.path.length}isEmpty(){return 0===this.path.length}add(t){return this.path.push(t),this}addAll(t){return t.forEach((t=>this.path.push(t))),this}push(t){return this.path.push(t),this}prepend(t){return this.path.unshift(t),this}reverse(){return this.path.reverse(),this}startsWith(t){return this.path.length>0&&this.path[0].equals(t)}endsWith(t){return this.path.length>0&&this.path[this.path.length-1].equals(t)}validate(){for(let t=0;t<this.path.length-1;t++)if(!this.path[t].hasOutEdgeWith(this.path[t+1]))return!1;return!0}getTotalCost(){let t=0;for(let e=0;e<this.path.length-1;e++){const s=this.path[e].getOutEdgeWith(this.path[e+1]);if(!s)return 0;t+=s.getWeight()}return t}getLabels(){return this.path.map((t=>t.getLabel()))}getData(){return this.path.map((t=>t.getData()))}getEdges(){const t=[];for(let e=0;e<this.path.length-1;e++){const s=this.path[e].getOutEdgeWith(this.path[e+1]);if(!s)return[];t.push(s)}return t}toString(){let t="";return this.path.forEach(((e,s)=>{s>0&&(t+=" -> "),t+=e.toString()})),t}equals(t){if(this===t)return!0;if(!(t instanceof s))return!1;const e=t;if(this.path.length!==e.path.length)return!1;for(let t=0;t<this.path.length;t++)if(!this.path[t].equals(e.path[t]))return!1;return!0}}e.default=s},611:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(514));class n extends i.default{constructor(t){super(t)}addEdge(t,e,s=1){const r=this.getVertex(t);if(!r)return this;const i=this.getVertex(e);return i?(r.addOutEdgeWith(i,s),i.addInEdgeWith(r,s),i.addOutEdgeWith(r,s),r.addInEdgeWith(i,s),this):this}removeEdge(t,e){const s=this.getVertex(t);if(!s)return this;const r=this.getVertex(e);return r?(s.removeOutEdgeWith(r),r.removeInEdgeWith(s),r.removeOutEdgeWith(s),s.removeInEdgeWith(r),this):this}getEdgesNum(){let t=0;return this.getVertices().forEach((e=>t+=e.getOutEdgesNum())),t/2}hasCycles(t=!0){const e=new Map,s=new Map,r=this.getVertices();r.forEach((t=>{e.set(t.getLabel(),!1),s.set(t.getLabel(),!1)}));const i=(r,n)=>{if(s.get(r.getLabel()))return!0;if(e.get(r.getLabel()))return!1;if(e.set(r.getLabel(),!0),s.set(r.getLabel(),!0),!t&&r.hasSelfLoop())return!0;const a=r.getOutNeighbors();for(let t of a)if(!t.equals(r)&&!t.equals(n)&&i(t,r))return!0;return s.set(r.getLabel(),!1),!1};for(let t of r)if(!e.get(t.getLabel())&&i(t,null))return!0;return!1}getDensity(){const t=this.getEdgesNum(),e=this.getVerticesNum();return 2*t/(e*(e-1))}}e.default=n},569:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(165));class n{constructor(t,e){this.label=t,this.data=e,this.inEdges={},this.outEdges={}}getLabel(){return this.label}getData(){return this.data}getInEdges(){const t=[];for(let e in this.inEdges)this.inEdges.hasOwnProperty(e)&&t.push(this.inEdges[e]);return t}getInEdgesNum(){let t=0;for(let e in this.inEdges)this.inEdges.hasOwnProperty(e)&&t++;return t}addInEdge(t){return this.inEdges[t.getOrigin().getLabel()]=t,this}addInEdgeWith(t,e){return this.inEdges[t.getLabel()]=new i.default(t,this,e),this}removeInEdge(t){return delete this.inEdges[t.getOrigin().getLabel()],this}removeInEdgeWith(t){return delete this.inEdges[t.getLabel()],this}hasInEdge(t){return!!this.inEdges[t.getOrigin().getLabel()]}hasInEdgeWith(t){return!!this.inEdges[t.getLabel()]}getInNeighbors(){const t=[];for(let e in this.inEdges)this.inEdges.hasOwnProperty(e)&&t.push(this.inEdges[e].getOrigin());return t}getInNeighborsNum(){let t=0;for(let e in this.inEdges)this.inEdges.hasOwnProperty(e)&&t++;return t}getOutEdges(){const t=[];for(let e in this.outEdges)this.outEdges.hasOwnProperty(e)&&t.push(this.outEdges[e]);return t}getOutEdgesNum(){let t=0;for(let e in this.outEdges)this.outEdges.hasOwnProperty(e)&&t++;return t}addOutEdge(t){return this.outEdges[t.getDestination().getLabel()]=t,this}addOutEdgeWith(t,e){return this.outEdges[t.getLabel()]=new i.default(this,t,e),this}removeOutEdge(t){return delete this.outEdges[t.getDestination().getLabel()],this}removeOutEdgeWith(t){return delete this.outEdges[t.getLabel()],this}hasOutEdge(t){return!!this.outEdges[t.getDestination().getLabel()]}hasOutEdgeWith(t){return!!this.outEdges[t.getLabel()]}getOutEdgeWith(t){return this.outEdges[t.getLabel()]}getOutNeighbors(){const t=[];for(let e in this.outEdges)this.outEdges.hasOwnProperty(e)&&t.push(this.outEdges[e].getDestination());return t}getOutNeighborsNum(){let t=0;for(let e in this.outEdges)this.outEdges.hasOwnProperty(e)&&t++;return t}hasSelfLoop(){const t=this.getOutEdges();for(let e of t)if(e.getDestination().equals(this))return!0;return!1}toString(){return"Vertex["+this.label+"]"}equals(t){if(this===t)return!0;if(!(t instanceof n))return!1;const e=t;if(this.label!==e.label)return!1;if(this.getOutEdgesNum()!==e.getOutEdgesNum())return!1;const s=this.getOutEdges();for(let t of s){const s=e.outEdges[t.getDestination().getLabel()];if(!s||t.getWeight()!==s.getWeight())return!1}return!0}}e.default=n},76:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){this.algorithmName=t,this.execStart=Date.now(),this.execTime=0,this.verticesVisitedNum=0}reset(){return this.execStart=Date.now(),this.execTime=0,this.verticesVisitedNum=0,this}getAlgorithmName(){return this.algorithmName}setAlgorithmName(t){return this.algorithmName=t,this}stopExecution(){return this.execTime=Date.now()-this.execStart,this}getExecTime(){return this.execTime}getExectimeReadableFormat(){const t=Math.round(this.execTime/1e3%60),e=Math.round(this.execTime/6e4%60),s=Math.round(this.execTime/36e5%24);return 0===s&&0===e&&0===s?this.execTime+" ms":s+" h, "+e+" min, "+t+" sec"}getVerticesVisitedNum(){return this.verticesVisitedNum}setVerticesVisitedNum(t){return this.verticesVisitedNum=t,this}incVerticesVisitedNum(){return this.verticesVisitedNum++,this}toString(){let t="Execution statistics";return this.algorithmName&&(t+=" for "+this.algorithmName),t+=":\n",t+="Execution time: "+this.getExectimeReadableFormat()+"\n",t+="Vertices visited: "+this.verticesVisitedNum+"\n",t}}},892:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t,e){this.graph=t,this.options=e||{}}getExecStats(){return this.execStats}getOptions(){return this.options}}},919:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(914)),n=r(s(461)),a=s(398),o=r(s(877)),u=r(s(268));class h{constructor(t,e,s,r){this.vertex=t,this.parent=e,this.totalCost=s,this.heuristicFunc=r,this.eval=this.totalCost+this.heuristicFunc(this.vertex.getData())}}class l extends o.default{constructor(t,e){super(t,e),this.options.heuristicFunc||(this.options.heuristicFunc=a.zeroHeuristicFunction)}findPath(t,e){this.execStats=new n.default(l.ALGORITHM_NAME),this.execStats.reset();const s=this.options.heuristicFunc,r=this.graph.getVertex(t);if(!r)return this.execStats.stopExecution(),new i.default;const a=this.graph.getVertex(e);if(!a)return this.execStats.stopExecution(),new i.default;const o=new u.default(((t,e)=>t.eval===e.eval&&this.options.collisionRes?this.options.collisionRes(t.vertex.getData(),e.vertex.getData()):t.eval-e.eval)),c=new Map,g=new h(r,null,0,s);o.push(g),c.set(t,g);let d=null;for(;!o.isEmpty();){const t=o.pop();if(this.execStats.incVerticesVisitedNum(),null==t?void 0:t.vertex.equals(a)){d=t;break}null==t||t.vertex.getOutEdges().forEach((e=>{const r=t.totalCost+e.getWeight(),i=c.get(e.getDestination().getLabel());if(i)r<i.totalCost&&(i.parent=t.vertex);else{const i=new h(e.getDestination(),t.vertex,r,s);o.push(i),c.set(e.getDestination().getLabel(),i)}}))}const f=new i.default;let p=d;for(;p;)f.prepend(p.vertex),p=p.parent?c.get(p.parent.getLabel()):null;return this.execStats.stopExecution(),this.execStats.setSolutionFound(null!==d),this.execStats.setPathLength(f.length()),f}}e.default=l},896:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(914)),n=r(s(461)),a=r(s(307));class o extends a.default{constructor(t,e){super(t,e)}findPath(t,e){this.execStats=new n.default(o.ALGORITHM_NAME),this.execStats.reset();const s=this.graph.getVertex(t);if(!s)return this.execStats.stopExecution(),new i.default;const r=this.graph.getVertex(e);if(!r)return this.execStats.stopExecution(),new i.default;const a=[],u=new Map,h={vertex:s,parent:null};a.push(h),u.set(t,h);let l=null;for(;a.length>0;){const t=a.pop();if(this.execStats.incVerticesVisitedNum(),null==t?void 0:t.vertex.equals(r)){l=t;break}if(this.options.collisionRes){const e=[];null==t||t.vertex.getOutEdges().forEach((s=>{if(!u.has(s.getDestination().getLabel())){const r={vertex:s.getDestination(),parent:t.vertex};e.push(r),u.set(s.getDestination().getLabel(),r)}})),e.sort(((t,e)=>this.options.collisionRes(t.vertex.getData(),e.vertex.getData()))),e.forEach((t=>a.unshift(t)))}else null==t||t.vertex.getOutEdges().forEach((e=>{if(!u.has(e.getDestination().getLabel())){const s={vertex:e.getDestination(),parent:t.vertex};a.unshift(s),u.set(e.getDestination().getLabel(),s)}}))}const c=new i.default;let g=l;for(;g;)c.prepend(g.vertex),g=g.parent?u.get(g.parent.getLabel()):null;return this.execStats.stopExecution(),this.execStats.setSolutionFound(null!==l),this.execStats.setPathLength(c.length()),c}}e.default=o,o.ALGORITHM_NAME="BFS shortest path"},972:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(914)),n=r(s(461)),a=r(s(307));class o extends a.default{constructor(t,e){super(t,e)}findPath(t,e){this.execStats=new n.default(o.ALGORITHM_NAME),this.execStats.reset();const s=this.graph.getVertex(t);if(!s)return this.execStats.stopExecution(),new i.default;const r=this.graph.getVertex(e);if(!r)return this.execStats.stopExecution(),new i.default;const a=[],u=new Map,h={vertex:s,parent:null};a.push(h),u.set(t,h);let l=null;for(;a.length>0;){const t=a.shift();if(this.execStats.incVerticesVisitedNum(),null==t?void 0:t.vertex.equals(r)){l=t;break}if(this.options.collisionRes){const e=[];null==t||t.vertex.getOutEdges().forEach((s=>{if(!u.has(s.getDestination().getLabel())){const r={vertex:s.getDestination(),parent:t.vertex};e.push(r),u.set(s.getDestination().getLabel(),r)}})),e.sort(((t,e)=>this.options.collisionRes(t.vertex.getData(),e.vertex.getData())));for(let t=e.length-1;t>=0;t--)a.unshift(e[t])}else null==t||t.vertex.getOutEdges().forEach((e=>{if(!u.has(e.getDestination().getLabel())){const s={vertex:e.getDestination(),parent:t.vertex};a.unshift(s),u.set(e.getDestination().getLabel(),s)}}))}const c=new i.default;let g=l;for(;g;)c.prepend(g.vertex),g=g.parent?u.get(g.parent.getLabel()):null;return this.execStats.stopExecution(),this.execStats.setSolutionFound(null!==l),this.execStats.setPathLength(c.length()),c}}e.default=o,o.ALGORITHM_NAME="DFS shortest path"},933:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(268)),n=r(s(914)),a=r(s(926)),o=r(s(461));class u{constructor(t,e,s){this.vertex=t,this.parent=e,this.totalCost=s}}class h extends a.default{constructor(t,e){super(t,e)}findShortestPaths(t){this.execStats=new o.default(h.ALGORITHM_NAME),this.execStats.reset();const e=new Map,s=this.graph.getVertex(t);if(!s)return this.execStats.stopExecution(),e;const r=new i.default(((t,e)=>t.totalCost===e.totalCost&&this.options.collisionRes?this.options.collisionRes(t.vertex.getData(),e.vertex.getData()):t.totalCost-e.totalCost)),a=new Map,l=new u(s,null,0);for(r.push(l),this.graph.getVertices().forEach((t=>{if(!s.equals(t)){const e=new u(t,null,Number.MAX_VALUE);r.push(e)}}));!r.isEmpty();){const t=r.peek();a.set(t.vertex.getLabel(),t),this.execStats.incVerticesVisitedNum(),t.vertex.getOutEdges().forEach((e=>{if(!a.get(e.getDestination().getLabel())){const s=t.totalCost+e.getWeight(),i=r.getItems();for(let r=0;r<i.length;r++)if(i[r].vertex.equals(e.getDestination())){s<i[r].totalCost&&(i[r].parent=t.vertex,i[r].totalCost=s);break}}})),r.pop(),r.rearrange()}for(const t of a.values()){const r=new n.default;let i=t;for(;i;)r.prepend(i.vertex),i=i.parent?a.get(i.parent.getLabel()):null;r.startsWith(s)?e.set(t.vertex.getLabel(),r):e.set(t.vertex.getLabel(),new n.default)}return this.execStats.stopExecution(),e}}e.default=h,h.ALGORITHM_NAME="Djikstra shortest paths"},926:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(892));class n extends i.default{constructor(t,e){super(t,e)}}e.default=n},461:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(76));class n extends i.default{constructor(t){super(t),this.pathLength=0,this.solutionFound=!1}reset(){return super.reset(),this.pathLength=0,this.solutionFound=!1,this}getPathLength(){return this.pathLength}setPathLength(t){return this.pathLength=t,this}wasSolutionFound(){return this.solutionFound}setSolutionFound(t){return this.solutionFound=t,this}toString(){let t=super.toString();return t+="Solution was found: "+(this.solutionFound?"Yes":"No")+"\n",this.pathLength>0&&(t+="Path length: "+this.pathLength+"\n"),t}}e.default=n},307:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(892));class n extends i.default{constructor(t,e){super(t,e)}}e.default=n},877:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(307));class n extends i.default{constructor(t,e){super(t,e)}}e.default=n},158:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(919)),n=r(s(307));class a extends n.default{constructor(t,e){super(t,e)}findPath(t,e){var s;const r=new i.default(this.graph,this.options),n=r.findPath(t,e);return this.execStats=r.getExecStats(),null===(s=this.execStats)||void 0===s||s.setAlgorithmName(a.ALGORITHM_NAME),n}}e.default=a,a.ALGORITHM_NAME="UCS shortest path"},743:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.UCSShortestPath=e.HeuristicFindPathGraphAlgorithm=e.FindPathAlgorithmExecutionStats=e.FindSinglePathGraphAlgorithm=e.DjikstraShortestPaths=e.DFSFindPath=e.BFSShortestPath=e.AStarShortestPath=void 0;var i=s(919);Object.defineProperty(e,"AStarShortestPath",{enumerable:!0,get:function(){return r(i).default}});var n=s(896);Object.defineProperty(e,"BFSShortestPath",{enumerable:!0,get:function(){return r(n).default}});var a=s(972);Object.defineProperty(e,"DFSFindPath",{enumerable:!0,get:function(){return r(a).default}});var o=s(933);Object.defineProperty(e,"DjikstraShortestPaths",{enumerable:!0,get:function(){return r(o).default}});var u=s(307);Object.defineProperty(e,"FindSinglePathGraphAlgorithm",{enumerable:!0,get:function(){return r(u).default}});var h=s(461);Object.defineProperty(e,"FindPathAlgorithmExecutionStats",{enumerable:!0,get:function(){return r(h).default}});var l=s(877);Object.defineProperty(e,"HeuristicFindPathGraphAlgorithm",{enumerable:!0,get:function(){return r(l).default}});var c=s(158);Object.defineProperty(e,"UCSShortestPath",{enumerable:!0,get:function(){return r(c).default}})},879:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(76)),n=r(s(729));class a extends n.default{constructor(t,e){super(t,e)}traverse(t,e){this.execStats=new i.default(a.ALGORITHM_NAME),this.execStats.reset();const s=this.graph.getVertex(t);if(!s)return void this.execStats.stopExecution();const r=[],n=new Map;for(r.push(s),n.set(t,s);r.length>0;){const t=r.pop();if(this.execStats.incVerticesVisitedNum(),!1===e(t))break;if(this.options.collisionRes){const e=[];t.getOutEdges().forEach((t=>{if(!n.has(t.getDestination().getLabel())){const s=t.getDestination();e.push(s),n.set(t.getDestination().getLabel(),s)}})),e.sort(((t,e)=>this.options.collisionRes(t.getData(),e.getData()))),e.forEach((t=>r.unshift(t)))}else t.getOutEdges().forEach((t=>{if(!n.has(t.getDestination().getLabel())){const e=t.getDestination();r.unshift(e),n.set(t.getDestination().getLabel(),e)}}))}this.execStats.stopExecution()}}e.default=a,a.ALGORITHM_NAME="BFS traversal"},289:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(76)),n=r(s(729));class a extends n.default{constructor(t,e){super(t,e)}traverse(t,e){this.execStats=new i.default(a.ALGORITHM_NAME),this.execStats.reset();const s=this.graph.getVertex(t);if(!s)return void this.execStats.stopExecution();const r=[],n=new Map;for(r.push(s),n.set(t,s);r.length>0;){const t=r.shift();if(this.execStats.incVerticesVisitedNum(),!1===e(t))break;if(this.options.collisionRes){const e=[];t.getOutEdges().forEach((t=>{if(!n.has(t.getDestination().getLabel())){const s=t.getDestination();e.push(s),n.set(t.getDestination().getLabel(),s)}})),e.sort(((t,e)=>this.options.collisionRes(t.getData(),e.getData())));for(let t=e.length-1;t>=0;t--)r.unshift(e[t])}else t.getOutEdges().forEach((t=>{if(!n.has(t.getDestination().getLabel())){const e=t.getDestination();r.unshift(e),n.set(t.getDestination().getLabel(),e)}}))}this.execStats.stopExecution()}}e.default=a,a.ALGORITHM_NAME="DFS traversal"},826:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=s(571),n=r(s(76)),a=r(s(729));class o extends a.default{constructor(t,e,s){super(t,e),(!s||s<0)&&(s=o.DEFAULT_MAX_HOPS),this.maxHops=s}traverse(t,e){this.execStats=new n.default(o.ALGORITHM_NAME),this.execStats.reset();const s=this.graph.getVertex(t);if(!s)return void this.execStats.stopExecution();let r=s,a=0;for(;a<this.maxHops&&(this.execStats.incVerticesVisitedNum(),a++,0!=!e(r));){const t=r.getOutNeighbors();t.length>0&&(r=t[(0,i.randomInt)(0,t.length-1)])}this.execStats.stopExecution()}}e.default=o,o.ALGORITHM_NAME="Random walk traversal",o.DEFAULT_MAX_HOPS=100},729:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const i=r(s(892));class n extends i.default{constructor(t,e){super(t,e)}}e.default=n},119:function(t,e,s){var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.TraversalGraphAlgorithm=e.RandomWalkTraversal=e.DFSTraversal=e.BFSTraversal=void 0;var i=s(879);Object.defineProperty(e,"BFSTraversal",{enumerable:!0,get:function(){return r(i).default}});var n=s(289);Object.defineProperty(e,"DFSTraversal",{enumerable:!0,get:function(){return r(n).default}});var a=s(826);Object.defineProperty(e,"RandomWalkTraversal",{enumerable:!0,get:function(){return r(a).default}});var o=s(729);Object.defineProperty(e,"TraversalGraphAlgorithm",{enumerable:!0,get:function(){return r(o).default}})},268:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=class{constructor(t){this.queue=[],this.comparator=t}isEmpty(){return 0===this.queue.length}push(t){this.queue.push(t),this.queue.sort(this.comparator)}peek(){return this.queue.length>0?this.queue[0]:void 0}pop(){return this.queue.shift()}getItems(){return this.queue}rearrange(){this.queue.sort(this.comparator)}}},571:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.randomInt=void 0,e.randomInt=(t,e)=>Math.floor(Math.random()*(e-t+1))+t},398:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.zeroHeuristicFunction=void 0,e.zeroHeuristicFunction=()=>0},607:function(t,e,s){var r=this&&this.__createBinding||(Object.create?function(t,e,s,r){void 0===r&&(r=s);var i=Object.getOwnPropertyDescriptor(e,s);i&&!("get"in i?!e.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return e[s]}}),Object.defineProperty(t,r,i)}:function(t,e,s,r){void 0===r&&(r=s),t[r]=e[s]}),i=this&&this.__exportStar||function(t,e){for(var s in t)"default"===s||Object.prototype.hasOwnProperty.call(e,s)||r(e,t,s)},n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Path=e.DirectedGraph=e.UndirectedGraph=e.Graph=e.Vertex=e.Edge=void 0;var a=s(165);Object.defineProperty(e,"Edge",{enumerable:!0,get:function(){return n(a).default}});var o=s(569);Object.defineProperty(e,"Vertex",{enumerable:!0,get:function(){return n(o).default}});var u=s(514);Object.defineProperty(e,"Graph",{enumerable:!0,get:function(){return n(u).default}});var h=s(611);Object.defineProperty(e,"UndirectedGraph",{enumerable:!0,get:function(){return n(h).default}});var l=s(193);Object.defineProperty(e,"DirectedGraph",{enumerable:!0,get:function(){return n(l).default}});var c=s(914);Object.defineProperty(e,"Path",{enumerable:!0,get:function(){return n(c).default}}),i(s(398),e),i(s(892),e),i(s(743),e),i(s(119),e)}},e={};!function s(r){var i=e[r];if(void 0!==i)return i.exports;var n=e[r]={exports:{}};return t[r].call(n.exports,n,n.exports,s),n.exports}(607)})();