(this["webpackJsonpkindness-tracker"]=this["webpackJsonpkindness-tracker"]||[]).push([[0],{52:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){},81:function(e,t,n){},82:function(e,t,n){},83:function(e,t,n){"use strict";n.r(t);var c=n(2),i=n.n(c),s=n(46),r=n.n(s),o=(n(52),n(1)),l=n(47),a=n.n(l),d=(n(13),n(4)),u=n(0),j=n(18),b=n(10),f=n.n(b),p=(n(78),function(e,t){d.select(".map-tooltip").transition().duration(0).style("opacity",.8).style("left","".concat(e.pageX+50,"px")).style("top","".concat(e.pageY-50,"px"))}),h=function(){d.selectAll(".circle").transition().duration(500).style("fill","steelblue")},O="ID NUMBER on kindness card",x="CITY where act of kindness took place",v="[Optional] Tell us about the act of kindness you received!",y=n(12),m=function(e){var t=e.node;if(!t)return null;var n,c,i=t[x],s=t.STATE,r=t[v];return Object(u.jsxs)("div",{children:[Object(u.jsx)("p",{children:Object(u.jsxs)("b",{children:[i?"".concat(i,", "):null,s]})}),Object(u.jsx)("p",{children:Object(u.jsx)("b",{children:(n=r,c=140,n.length>c?"".concat(n.substring(0,c)):n)})}),Object(u.jsx)("p",{children:"Click for more info!"})]})},N=(n(79),{width:"100vw",height:"100vh",position:"absolute"}),k=39.8283,T=-98.5795,C=3.75;f.a.accessToken="pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ",f.a.workerClass=y.a;var L=function(e){var t=e.data,n=e.selectedNode,i=e.setSelectedNode,s=e.hoveredNode,r=e.setHoveredNode,l=e.traceNode,a=e.traceList,b=e.setTraceList,x=e.traceIndex,v=Object(c.useState)(null),y=Object(o.a)(v,2),L=y[0],g=y[1],S=Object(c.useRef)(null),I=(t||[]).map((function(e,t){return Object(j.a)(Object(j.a)({},e),{},{index:t})})),w=function(e){return"circle-".concat(e.index)};return Object(c.useEffect)((function(){L||function(e){var t=e.setMap,n=e.mapContainer,c=new f.a.Map({container:n.current,style:"mapbox://styles/mapbox/light-v10",center:[T,k],zoom:C});c.on("load",(function(){t(c)}))}({setMap:g,mapContainer:S})}),[L]),Object(c.useEffect)((function(){if(L&&null!==t){var e=L.getCanvasContainer(),n=d.select(e).append("svg").attr("width","100%").attr("height","100%").style("position","absolute").style("z-index",2).style("top",0).style("left",0),c=function(e){return L.project(new f.a.LngLat(e.CenterLon,e.CenterLat))},s=n.selectAll("circle").data(I).enter().append("circle").attr("class","circle").attr("id",w).attr("r",10).style("fill","steelblue").on("mouseover",(function(e,t){r(t),p(e)})).on("mousemove",(function(e,t){p(e)})).on("mouseout",(function(e,t){var n;n=function(){return r(null)},d.select(".map-tooltip").transition().duration(500).style("opacity",0).on("end",n)})).on("click",(function(e,t){h(),d.select("#".concat(w(t))).transition().duration(500).style("fill","red"),e.target,L.flyTo({center:[t.CenterLon,t.CenterLat],zoom:12,essential:!0}),i(t)})),o=function(){s.attr("cx",(function(e){return c(e).x})).attr("cy",(function(e){return c(e).y}))};return L.on("viewreset",o),L.on("move",o),L.on("moveend",o),L.on("load",(function(){L.resize()})),o(),function(){return L.remove()}}}),[L,t]),Object(c.useEffect)((function(){L&&t&&!n&&(L.flyTo({center:[T,k],zoom:C,essential:!0}),h())}),[L,t,n]),Object(c.useEffect)((function(){if(l){var e=I.filter((function(e){return e[O]==l[O]}));h(),d.selectAll(".circle").filter((function(e){return e[O]==l[O]})).transition().duration(500).style("fill","purple"),L.flyTo({center:[T,k],zoom:C,essential:!0}),b(e)}}),[l]),Object(c.useEffect)((function(){if(L&&a&&x>-1){var e=a[x];L.flyTo({center:[e.CenterLon,e.CenterLat],zoom:12,essential:!0}),h(),d.selectAll(".circle").filter((function(e){return e[O]==l[O]})).transition().duration(500).style("fill","purple"),d.select("#".concat(w(a[x]))).transition().duration(500).style("fill","green")}}),[x]),Object(u.jsx)("div",{ref:function(e){return S.current=e},style:N,children:Object(u.jsx)("div",{className:"map-tooltip",style:{opacity:0},children:Object(u.jsx)(m,{node:s})})})},g=(n(80),function(e){var t=e.node;if(!t)return null;var n=t["[Optional] STREET NAME"],c=t[x],i=t.STATE,s=t["[OPTIONAL] ZIP CODE"],r=t[v];return Object(u.jsxs)("div",{className:"kindness-card-inner",children:[Object(u.jsxs)("p",{children:["Address: ",Object(u.jsx)("b",{children:n||"No street provided."})]}),Object(u.jsxs)("p",{children:["City: ",Object(u.jsx)("b",{children:c||"No city provided."})]}),Object(u.jsxs)("p",{children:["State: ",Object(u.jsx)("b",{children:i||"No state provided."})]}),Object(u.jsxs)("p",{children:["Zip Code: ",Object(u.jsx)("b",{children:s||"No zip code provided."})]}),Object(u.jsx)("p",{children:"Act of Kindness Description:"}),Object(u.jsx)("p",{children:Object(u.jsx)("b",{children:r||"No kindess description provided."})})]})}),S=(n(81),function(){return Object(u.jsxs)("div",{className:"loading-wrapper",children:[Object(u.jsx)("div",{className:"la-ball-clip-rotate la-2x",children:Object(u.jsx)("div",{})}),Object(u.jsx)("p",{children:"Loading..."})]})}),I=function(e){var t=e.isLoading,n=e.selectedNode,c=e.setSelectedNode,i=e.setTraceNode,s=e.traceList,r=e.setTraceList,o=e.traceIndex,l=e.setTraceIndex;return Object(u.jsxs)("div",{className:"sidebar-flex",children:[Object(u.jsx)("h1",{children:"Kindess Tracker"}),t?Object(u.jsx)(S,{}):null,Object(u.jsx)("div",{className:"selected-card-wrapper",children:Object(u.jsx)(g,{node:n})}),n?Object(u.jsx)("button",{onClick:function(){c(null),r([]),l(-1)},children:"Clear Selected Node"}):null,n?Object(u.jsx)("button",{onClick:function(){return i(n)},children:"Trace this Act!"}):null,s?s.map((function(e,t){return Object(u.jsx)("p",{onClick:function(){return l(t)},style:{color:t==o?"blue":"white",cursor:"pointer"},children:e[O]},t)})):null]})},w=n(19),E=n.n(w);n(82);E.a.workerClass=y.a,E.a.accessToken="pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ";var A=function(){var e=Object(c.useState)(null),t=Object(o.a)(e,2),n=t[0],i=t[1],s=Object(c.useState)(null),r=Object(o.a)(s,2),l=r[0],d=r[1],j=Object(c.useState)(null),b=Object(o.a)(j,2),f=b[0],p=b[1],h=Object(c.useState)(null),O=Object(o.a)(h,2),x=O[0],v=O[1],y=Object(c.useState)([]),m=Object(o.a)(y,2),N=m[0],k=m[1],T=Object(c.useState)(-1),C=Object(o.a)(T,2),g=C[0],S=C[1];return Object(c.useEffect)((function(){null===n&&a.a.init({key:"https://docs.google.com/spreadsheets/d/1BvBwyy1xYYhdiokMfbyxssu5nlB0arRMvxyuQLCzsH4/pubhtml",simpleSheet:!0}).then((function(e){i(e)})).catch(console.warn)}),[n]),Object(u.jsx)("div",{className:"App",children:Object(u.jsxs)("div",{className:"horizontal-stack",children:[Object(u.jsx)("div",{className:"left-sidebar",children:Object(u.jsx)(I,{isLoading:null===n,selectedNode:l,setSelectedNode:d,setTraceNode:v,traceList:N,setTraceList:k,traceIndex:g,setTraceIndex:S})}),Object(u.jsx)("div",{className:"map-wrapper",children:Object(u.jsx)(L,{data:n,selectedNode:l,setSelectedNode:d,hoveredNode:f,setHoveredNode:p,traceNode:x,traceList:N,setTraceList:k,traceIndex:g})})]})})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,84)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),i(e),s(e),r(e)}))};r.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(A,{})}),document.getElementById("root")),J()}},[[83,1,2]]]);
//# sourceMappingURL=main.ab258452.chunk.js.map