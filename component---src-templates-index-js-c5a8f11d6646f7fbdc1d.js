(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[332],{3770:function(e){"use strict";e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#d8c8a8","images":{"fallback":{"src":"/static/b29c34624d616a26a54995a3c6876cbd/d24ee/chinley.jpg","srcSet":"/static/b29c34624d616a26a54995a3c6876cbd/d24ee/chinley.jpg 50w,\\n/static/b29c34624d616a26a54995a3c6876cbd/64618/chinley.jpg 100w","sizes":"50px"},"sources":[{"srcSet":"/static/b29c34624d616a26a54995a3c6876cbd/d4bf4/chinley.avif 50w,\\n/static/b29c34624d616a26a54995a3c6876cbd/ee81f/chinley.avif 100w","type":"image/avif","sizes":"50px"},{"srcSet":"/static/b29c34624d616a26a54995a3c6876cbd/3faea/chinley.webp 50w,\\n/static/b29c34624d616a26a54995a3c6876cbd/6a679/chinley.webp 100w","type":"image/webp","sizes":"50px"}]},"width":50,"height":50}')},9535:function(e,t,a){"use strict";var l=a(7294),n=a(5444),r=a(2778);t.Z=function(){var e,t,i=(0,n.useStaticQuery)("788015585"),c=null===(e=i.site.siteMetadata)||void 0===e?void 0:e.author,o=null===(t=i.site.siteMetadata)||void 0===t?void 0:t.description;return l.createElement("div",{className:"bio"},l.createElement(r.S,{className:"bio-avatar",layout:"fixed",formats:["AUTO","WEBP","AVIF"],src:"../images/chinley.jpeg",width:50,height:50,quality:95,alt:"Profile picture",__imageData:a(3770)}),l.createElement("div",null,l.createElement("p",null,o||null," "),l.createElement("p",null,(null==c?void 0:c.summary)||null," ")))}},9937:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return u}});var l=a(7294),n=a(5444),r=a(9535),i=a(7198),c=a(3751),o=a(5715),s=a(9974),m=new Array(9).fill(1);function d(){return l.createElement(l.Fragment,null,m.map((function(e,t){return l.createElement("div",{class:"snowflake",key:t},"❄️")})))}var u=function(e){var t,a=e.data,m=e.location,u=e.pageContext,p=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",f=a.allMarkdownRemark.nodes,g=u.totalPage,y=u.currentPage,E=u.categories;return 0===f.length?l.createElement(i.Z,{location:m,title:p},l.createElement(c.Z,{title:"All posts"}),l.createElement(r.Z,null),l.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):l.createElement(i.Z,{location:m,title:p},l.createElement(c.Z,{title:"All posts"}),l.createElement(r.Z,null),l.createElement(o.Z,null),l.createElement(d,null),l.createElement("ol",{style:{listStyle:"none"}},f.map((function(e){var t=e.frontmatter.title||e.fields.slug;return l.createElement("li",{key:e.fields.slug},l.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},l.createElement("header",null,l.createElement("h2",null,l.createElement(n.Link,{to:e.fields.slug,itemProp:"url"},l.createElement("span",{itemProp:"headline"},t))),l.createElement("small",null,e.frontmatter.date)),l.createElement("section",null,l.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))),l.createElement("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},y-1>0&&l.createElement(n.Link,{to:"/"+(y-1==1?"":y-1),rel:"prev"},"← 上一页"),y+1<=g&&l.createElement(n.Link,{to:"/"+(y+1),rel:"next"},"下一页 →")),l.createElement("div",{className:"cate-box",style:{position:"absolute",right:"10rem",top:"17rem",borderLeft:"1px solid RGB(146,25,41)",padding:"5px 0 5px 20px"}},l.createElement("div",{style:{marginBottom:"20px",textDecoration:"none"}},l.createElement(n.Link,{to:"/",itemProp:"url",style:{textDecoration:"none",color:"#4f5969"}},l.createElement("span",{itemProp:"headline"},"首页"))),E&&E.map((function(e){return l.createElement("div",{style:{marginBottom:"20px",textDecoration:"none"}},l.createElement(n.Link,{to:"/categories/"+e,itemProp:"url",style:{textDecoration:"none",color:"#4f5969"}},l.createElement("span",{itemProp:"headline"},e)))}))),l.createElement(s.Z,null))}}}]);
//# sourceMappingURL=component---src-templates-index-js-c5a8f11d6646f7fbdc1d.js.map