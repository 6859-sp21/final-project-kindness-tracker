(this["webpackJsonpkindness-tracker"]=this["webpackJsonpkindness-tracker"]||[]).push([[0],{25:function(e,a,t){},45:function(e,a,t){},46:function(e,a,t){"use strict";t.r(a);var c=t(4),n=t.n(c),s=t(19),i=t.n(s),r=(t(25),t(0)),l=t(20),f=t.n(l),y=t(8),o=t(5),u=function(e,a){var t=Object(c.useRef)();return Object(c.useEffect)((function(){return e(o.select(t.current)),function(){}}),a),t},d=t(2),h=function(e){var a=e.data,t=u((function(e){var t=20,c=20,n=20,s=40,i=o.scaleBand().domain(a.map((function(e){return e.year}))).rangeRound([s,500-c]).padding(.1),r=o.scaleLinear().domain([0,o.max(a,(function(e){return e.sales}))]).rangeRound([500-n,t]);e.select(".x-axis").call((function(e){return e.attr("transform","translate(0,".concat(500-n,")")).call(o.axisBottom(i).tickValues(o.ticks.apply(o,Object(y.a)(o.extent(i.domain())).concat([12.5])).filter((function(e){return void 0!==i(e)}))).tickSizeOuter(0))})),e.select(".y-axis").call((function(e){return e.attr("transform","translate(".concat(s,",0)")).style("color","white").call(o.axisLeft(r).ticks(null,"s")).call((function(e){return e.select(".domain").remove()})).call((function(e){return e.append("text").attr("x",-s).attr("y",10).attr("fill","currentColor").attr("text-anchor","start").text(a.y1)}))})),e.select(".plot-area").attr("fill","steelblue").selectAll(".bar").data(a).join("rect").attr("class","bar").attr("x",(function(e){return i(e.year)})).attr("width",i.bandwidth()).attr("y",(function(e){return r(e.sales)})).attr("height",(function(e){return r(0)-r(e.sales)}))}),[a.length]);return Object(d.jsxs)("svg",{ref:t,style:{height:500,width:"100%",marginRight:"0px",marginLeft:"0px"},children:[Object(d.jsx)("g",{className:"plot-area"}),Object(d.jsx)("g",{className:"x-axis"}),Object(d.jsx)("g",{className:"y-axis"})]})},j=[{year:1980,efficiency:24.3,sales:8949e3},{year:1985,efficiency:27.6,sales:10979e3},{year:1990,efficiency:28,sales:9303e3},{year:1991,efficiency:28.4,sales:8185e3},{year:1992,efficiency:27.9,sales:8213e3},{year:1993,efficiency:28.4,sales:8518e3},{year:1994,efficiency:28.3,sales:8991e3},{year:1995,efficiency:28.6,sales:862e4},{year:1996,efficiency:28.5,sales:8479e3},{year:1997,efficiency:28.7,sales:8217e3},{year:1998,efficiency:28.8,sales:8085e3},{year:1999,efficiency:28.3,sales:8638e3},{year:2e3,efficiency:28.5,sales:8778e3},{year:2001,efficiency:28.8,sales:8352e3},{year:2002,efficiency:29,sales:8042e3},{year:2003,efficiency:29.5,sales:7556e3},{year:2004,efficiency:29.5,sales:7483e3},{year:2005,efficiency:30.3,sales:766e4},{year:2006,efficiency:30.1,sales:7762e3},{year:2007,efficiency:31.2,sales:7562e3},{year:2008,efficiency:31.5,sales:6769e3},{year:2009,efficiency:32.9,sales:5402e3},{year:2010,efficiency:33.9,sales:5636e3},{year:2011,efficiency:33.1,sales:6093e3},{year:2012,efficiency:35.3,sales:7245e3},{year:2013,efficiency:36.4,sales:7586e3},{year:2014,efficiency:36.5,sales:7708e3},{year:2015,efficiency:37.2,sales:7517e3},{year:2016,efficiency:37.7,sales:6873e3},{year:2017,efficiency:39.4,sales:6081e3}],x=(t(45),function(){var e=Object(c.useState)(null),a=Object(r.a)(e,2),t=a[0],n=a[1],s=null===t;return Object(c.useEffect)((function(){null===t&&f.a.init({key:"https://docs.google.com/spreadsheets/d/1IqEBIcnFZ_BFCrD8jhk11yVoOjfxzZpiZLdL4cL3oK0/pubhtml",simpleSheet:!0}).then((function(e){n(e)})).catch(console.warn)}),[t]),Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("header",{className:"App-header",children:[Object(d.jsx)("p",{children:"Welcome to Kindness Tracker!"}),Object(d.jsx)("p",{children:s?"Loading...":"Loaded ".concat(t.length," rows from Google Sheets!")}),Object(d.jsx)("p",{children:":-)"}),Object(d.jsx)("div",{className:"bar-wrapper",children:Object(d.jsx)(h,{data:j})})]})})}),p=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,47)).then((function(a){var t=a.getCLS,c=a.getFID,n=a.getFCP,s=a.getLCP,i=a.getTTFB;t(e),c(e),n(e),s(e),i(e)}))};i.a.render(Object(d.jsx)(n.a.StrictMode,{children:Object(d.jsx)(x,{})}),document.getElementById("root")),p()}},[[46,1,2]]]);
//# sourceMappingURL=main.d1537917.chunk.js.map