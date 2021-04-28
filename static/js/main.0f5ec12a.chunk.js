(this["webpackJsonpkindness-tracker"]=this["webpackJsonpkindness-tracker"]||[]).push([[0],{114:function(e,t,n){},115:function(e,t,n){},116:function(e,t,n){},121:function(e,t,n){},122:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(20),i=n.n(r),s=(n(89),n(3)),o=n(72),l=n.n(o),d=n(13),j=n(9),u=n(1),b=n(24),h=n.n(b),f="https://docs.google.com/spreadsheets/d/1IqEBIcnFZ_BFCrD8jhk11yVoOjfxzZpiZLdL4cL3oK0/pubhtml",p="ID Number on kindness card",O="center_lng",m="center_lat",x=n(40),g=n(41),v="lng",y="lat",N=function(e,t){var n=t[p];return(0===n?e:e.filter((function(e){return e[p]===n||0===e[p]}))).sort((function(e,t){return e.dateTime.toMillis()-t.dateTime.toMillis()}))},k=function(e){var t=e.street_number,n=e.street_name,c=t&&n?"".concat(t?"".concat(t," "):null).concat(n):null,a=e.admin_level_3,r=e.admin_level_1,i=a||r?"".concat(a).concat(a?", ".concat(r):r):null,s=e.zip_code,o="".concat(c||"No street address provided","\n").concat(i||"No city/state provided").concat(s?"\n".concat(s):"");return{kindness:e["(Optional) Tell us about the act of kindness you received!"],dateString:e.dateTime.toLocaleString(g.DateTime.DATETIME_SHORT),location:o,cityState:i}},T=function(e,t){j.select(".map-tooltip").transition().duration(0).style("opacity",.8).style("left","".concat(e.pageX+50,"px")).style("top","".concat(e.pageY-50,"px"))},w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"steelblue";return j.selectAll(".circle").transition().duration(500).style("fill",e)},S=function(e){return"circle-".concat(e.index)},C=function(e){return"circle circle-".concat(e[p])},M=function(e,t){return e.project(new h.a.LngLat(t.center_lng,t.center_lat))},L=function(e){j.selectAll(".circle").attr("cx",(function(t){return M(e,t).x})).attr("cy",(function(t){return M(e,t).y}))},D=function(e){return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],c=0,a=0;n||(c=t/69),a=c;var r=arguments.length>3&&void 0!==arguments[3]&&!arguments[3]?1:5,i=function(t){return e.map((function(e){return e[t]}))},s=Math.max.apply(Math,Object(d.a)(i(v))),o=Math.min.apply(Math,Object(d.a)(i(v))),l=Math.max.apply(Math,Object(d.a)(i(y))),j=Math.min.apply(Math,Object(d.a)(i(y)));return n&&(c=(s-o)*t,a=12*t*(l-j)),{topRight:{lng:s+c,lat:j+a},bottomLeft:{lng:o-c*r,lat:l-a}}}(e.map((function(e){return{lng:e.center_lng,lat:e.center_lat}})),e.length>1?.1:1,e.length>1,e.length>1)},I=n(35),_=function(e){var t=e.node,n=e.isSelected;if(!t)return null;console.log("rendering tooltip");var c,a,r=k(t),i=r.kindness,s=r.cityState;return Object(u.jsxs)("div",{children:[Object(u.jsx)("p",{children:Object(u.jsx)("b",{children:(c=i,a=140,c.length>a?"".concat(c.substring(0,a),"..."):c)})}),Object(u.jsx)("p",{children:Object(u.jsx)("i",{children:s})}),Object(u.jsx)("p",{children:n?null:"Click for more info!"})]})};n(114);h.a.accessToken="pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ",h.a.workerClass=I.a;var E=function(e){var t,n,a=e.trace,r=e.setIsLoading,i=e.selectedNode,o=e.setSelectedNode,l=e.hoveredNode,d=e.setHoveredNode,b=e.isTracing,f=e.setTrace,O=e.resetTrace,m=Object(c.useState)(null),x=Object(s.a)(m,2),g=x[0],v=x[1],y=Object(c.useState)(null),k=Object(s.a)(y,2),M=k[0],I=k[1],E=Object(c.useRef)(null);return Object(c.useEffect)((function(){if(null===g)!function(e){var t=e.setMap,n=e.mapContainer,c=new h.a.Map({container:n.current,style:"mapbox://styles/mapbox/light-v10",center:[-100,40],zoom:3});c.on("load",(function(){t(c)}))}({setMap:v,mapContainer:E});else{var e=g.getCanvasContainer();j.select(e).append("svg").attr("class","map-svg").attr("width","100%").attr("height","100%").style("position","absolute").style("z-index",2).style("top",0).style("left",0),g.on("viewreset",(function(){return L(g)})),g.on("move",(function(){return L(g)})),g.on("moveend",(function(){return L(g)})),g.on("load",(function(){return g.resize()}))}}),[g]),Object(c.useEffect)((function(){if(g&&a){j.select(".map-svg").selectAll("circle").data(a,(function(e){return e.hash})).join((function(e){return e.append("circle").attr("id",S).attr("class",C).attr("r",10).style("fill","steelblue").on("click",(function(e,t){return o(t)})).on("mouseover",(function(e,t){d(t),T(e)})).on("mousemove",(function(e,t){T(e)})).on("mouseout",(function(e,t){var n;n=function(){return d(null)},j.select(".map-tooltip").transition().duration(500).style("opacity",0).on("end",n)}))}),(function(e){return e}),(function(e){return e.remove()})),L(g),r(!1);var e=D(a);I(e)}}),[g,a]),Object(c.useEffect)((function(){M&&function(e,t){var n=t.topRight,c=t.bottomLeft;e.fitBounds([[c.lng,c.lat],[n.lng,n.lat]],{duration:3e3})}(g,M)}),[M]),Object(c.useEffect)((function(){if(b){if(0===i[p]){var e=D(a);I(e)}w("purple").attr("r",10),j.select("#".concat(S(i))).transition().duration(500).style("fill","green").attr("r",30)}else if(i){w(),j.select("#".concat(S(i))).transition().duration(500).style("fill","red").attr("r",10);var t=D([i]);I(t)}else if(a){var n=D(a);I(n),w()}}),[i,b]),Object(c.useEffect)((function(){if(b){var e=N(a,i);f(e)}else O()}),[b]),Object(u.jsx)("div",{ref:function(e){return E.current=e},className:"map-container-div",children:Object(u.jsx)("div",{className:"map-tooltip",style:{opacity:0},children:Object(u.jsx)(_,{node:l,isSelected:(t=l,n=i,!(!t||!n)&&t.index==n.index)})})})},F=n(142),J=(n(115),function(e){var t=e.node;if(console.log("rendering card"),!t)return null;console.log(t);var n=k(t),c=n.kindness,a=n.dateString,r=n.location;return Object(u.jsxs)("div",{className:"kindness-card-inner",children:[Object(u.jsx)("p",{children:"Act of Kindness:"}),Object(u.jsx)("div",{className:"kindess-card-description",children:Object(u.jsx)("p",{children:Object(u.jsx)("b",{children:c||"No kindess description provided!"})})}),Object(u.jsx)("p",{children:"Location:"}),Object(u.jsx)("p",{children:Object(u.jsx)("b",{children:r})}),Object(u.jsx)("p",{children:"Date & Time:"}),Object(u.jsx)("p",{children:Object(u.jsx)("b",{children:a})})]})}),z=(n(116),function(){return console.log("rendering loading"),Object(u.jsxs)("div",{className:"loading-wrapper",children:[Object(u.jsx)("div",{className:"la-ball-clip-rotate la-2x",children:Object(u.jsx)("div",{})}),Object(u.jsx)("p",{children:"Loading..."})]})}),A=n(74),B=n.n(A),Y=n(76),U=n.n(Y),R=n(77),K=n.n(R),P=function(){return console.log("rendering side info card"),Object(u.jsxs)("div",{children:[Object(u.jsx)("hr",{className:"sidebar-divider"}),Object(u.jsxs)("div",{className:"sidebar-info-row",children:[Object(u.jsx)("div",{className:"sidebar-info-left",children:Object(u.jsx)(B.a,{fontSize:"large"})}),Object(u.jsx)("div",{className:"sidebar-info-right",children:Object(u.jsxs)("p",{children:[Object(u.jsx)("b",{children:"Click"})," a circle to explore that act of kindness further!"]})})]}),Object(u.jsxs)("div",{className:"sidebar-info-row",children:[Object(u.jsx)("div",{className:"sidebar-info-left",children:Object(u.jsx)(U.a,{fontSize:"large"})}),Object(u.jsx)("div",{className:"sidebar-info-right",children:Object(u.jsxs)("p",{children:["Then, you can ",Object(u.jsx)("b",{children:"trace"})," that act of kindess to see how may people have paid it forward."]})})]}),Object(u.jsxs)("div",{className:"sidebar-info-row sidebar-info-row-toggle",children:[Object(u.jsx)("div",{className:"sidebar-info-left",children:Object(u.jsx)(K.a,{fontSize:"large"})}),Object(u.jsx)("div",{className:"sidebar-info-right",children:Object(u.jsxs)("p",{children:["Switch between ",Object(u.jsx)("b",{children:"real-time"})," and ",Object(u.jsx)("b",{children:"generated"})," data using the toggle below."]})})]})]})},H=n(78),Z=n.n(H),Q=n(79),V=n.n(Q),X=function(e){var t=e.isTracing,n=e.setIsTracing,c=e.trace,a=e.selectedNode,r=e.setSelectedNode;if(console.log("rendering trace"),!t)return null;var i=c.indexOf(a),s=c.length;return Object(u.jsxs)("div",{className:"trace-stepper-wrapper",children:[Object(u.jsx)("div",{className:"trace-stepper-button-exit",children:Object(u.jsx)(F.a,{variant:"contained",style:{backgroundColor:"red",color:"white"},onClick:function(){n(!1)},children:"Exit Trace Mode"})}),Object(u.jsxs)("div",{className:"trace-stepper-button-horizontal",children:[Object(u.jsx)(F.a,{className:"trace-stepper-button",variant:"contained",color:"primary",disabled:0===i,onClick:function(){return r(c[0])},children:"First"}),Object(u.jsx)(F.a,{className:"trace-stepper-button",variant:"contained",color:"primary",disabled:0===i,onClick:function(){return r(c[i-1])},children:Object(u.jsx)(Z.a,{})}),Object(u.jsx)(F.a,{className:"trace-stepper-button",variant:"contained",color:"primary",disabled:i===s-1,onClick:function(){return r(c[i+1])},children:Object(u.jsx)(V.a,{})}),Object(u.jsx)(F.a,{className:"trace-stepper-button",variant:"contained",color:"primary",disabled:i===s-1,onClick:function(){return r(c[s-1])},children:"Last"})]}),Object(u.jsx)("p",{children:"".concat(i+1," / ").concat(c.length)}),Object(u.jsx)(J,{node:a})]})},G=n(144),W=n(143),q=function(e){var t=e.dataUrl,n=e.setDataUrl,c=t===f,a=t===f?"Viewing Real Data":"Viewing Fake Data";return Object(u.jsx)(G.a,{control:Object(u.jsx)(W.a,{checked:c,onChange:function(e){var t=e.target.checked;n(t?f:"https://docs.google.com/spreadsheets/d/1BvBwyy1xYYhdiokMfbyxssu5nlB0arRMvxyuQLCzsH4/pubhtml")},color:"primary"}),labelPlacement:"top",label:a})},$=function(e){var t=e.isLoading,n=e.selectedNode,c=e.setSelectedNode,a=e.isTracing,r=e.setIsTracing,i=e.trace,s=e.dataUrl,o=e.setDataUrl;console.log("rendering sidebar");var l=0;n&&(l=N(i,n).length);return Object(u.jsxs)("div",{className:"sidebar-flex",children:[Object(u.jsx)("h1",{children:"Kindess Tracker"}),t?Object(u.jsx)(z,{}):null,t||n?null:Object(u.jsx)(P,{}),n&&!a?Object(u.jsxs)("div",{className:"sidebar-clear-div",children:[Object(u.jsx)(F.a,{variant:"contained",style:{backgroundColor:"red",color:"white"},className:"sidebar-button-below",onClick:function(){c(null),r(!1)},children:"Clear Selection"}),Object(u.jsx)(F.a,{variant:"contained",style:{backgroundColor:"green",color:"white"},className:"sidebar-button-below",onClick:function(){return r(!0)},children:"Trace this Act!"}),Object(u.jsx)("h1",{children:l}),Object(u.jsx)("p",{children:"acts of kindess are connected"})]}):null,a?null:Object(u.jsx)("div",{className:"selected-card-wrapper",children:Object(u.jsx)(J,{node:n})}),Object(u.jsx)(X,{isTracing:a,setIsTracing:r,trace:i,selectedNode:n,setSelectedNode:c}),Object(u.jsxs)("div",{className:"sidebar-bottom-content",children:[Object(u.jsx)("div",{className:"data-toggle-outer",children:Object(u.jsx)(q,{dataUrl:s,setDataUrl:o})}),Object(u.jsx)("p",{className:"sidebar-small-text",children:"Christian Moroney, Jackson Bernatchez, Kevin Lyons"}),Object(u.jsx)("p",{className:"sidebar-small-text",children:"6.859 Final Project Spring 2021"}),Object(u.jsx)("div",{children:Object(u.jsx)("a",{href:"https://github.com/6859-sp21/final-project-kindness-tracker",target:"_blank",children:Object(u.jsx)("img",{className:"sidebar-git-image",src:"https://image.flaticon.com/icons/png/512/25/25231.png"})})})]})]})},ee=n(42),te=n.n(ee);n(121);te.a.workerClass=I.a,te.a.accessToken="pk.eyJ1IjoiY21vcm9uZXkiLCJhIjoiY2tudGNscDJjMDFldDJ3b3pjMTh6ejJyayJ9.YAPmFkdy_Eh9K20cFlIvaQ";var ne=function(){var e=Object(c.useState)(null),t=Object(s.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(null),i=Object(s.a)(r,2),o=i[0],d=i[1],j=Object(c.useState)(!0),b=Object(s.a)(j,2),h=b[0],v=b[1],y=Object(c.useState)(null),N=Object(s.a)(y,2),k=N[0],T=N[1],w=Object(c.useState)(null),S=Object(s.a)(w,2),C=S[0],M=S[1],L=Object(c.useState)(!1),D=Object(s.a)(L,2),I=D[0],_=D[1],F=Object(c.useState)(f),J=Object(s.a)(F,2),z=J[0],A=J[1];Object(c.useEffect)((function(){window.innerWidth<800&&alert("We see you're on mobile! Rotate your phone sideways for the best experience. Check out our app on your computer too!")}),[]);var B=function(){console.log("fetching!"),l.a.init({key:z,simpleSheet:!0}).then((function(e){var t=function(e){var t=e?e.map((function(e,t){return Object(x.a)(Object(x.a)({},e),{},{index:t,dateTime:g.DateTime.fromFormat(e.Timestamp,"M/d/yyyy H:mm:ss"),hash:"".concat(t,"-").concat(e.Timestamp)})})):null,n=[p,O,m];return t.map((function(e){return n.forEach((function(t){e[t]=+e[t]})),e}))}(e);console.log(t),a(t),d(t)})).catch(console.warn)};Object(c.useEffect)((function(){null===n&&B()}),[n]),Object(c.useEffect)((function(){null!==n&&(v(!0),T(null),M(null),_(!1),B())}),[z]);return Object(u.jsx)("div",{className:"App",children:Object(u.jsxs)("div",{className:"horizontal-stack",children:[Object(u.jsx)("div",{className:"left-sidebar",children:Object(u.jsx)($,{isLoading:h,selectedNode:k,setSelectedNode:T,isTracing:I,setIsTracing:_,trace:o,dataUrl:z,setDataUrl:A})}),Object(u.jsx)("div",{className:"map-wrapper",children:Object(u.jsx)(E,{trace:o,setIsLoading:v,selectedNode:k,setSelectedNode:T,hoveredNode:C,setHoveredNode:M,isTracing:I,setTrace:d,resetTrace:function(){return d(n)}})})]})})},ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,145)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),r(e),i(e)}))};i.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(ne,{})}),document.getElementById("root")),ce()},89:function(e,t,n){}},[[122,1,2]]]);
//# sourceMappingURL=main.0f5ec12a.chunk.js.map