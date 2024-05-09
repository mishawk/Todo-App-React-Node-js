import{r as h,i as D,k as L,l as _,m as I,n as F,o as N,p as R,_ as B,D as A,c as s,a as u,b as l,j as e,G as M,B as y,F as g,u as j,E as G,h as H,C as O,g as $,e as U,f as W}from"./index-75ba242f.js";import{T as K,R as V,u as X}from"./useFilteredPaginatedTodos-2c5c58db.js";import{U as Y,u as q,D as z,t as S,b as J,C as Q,a as Z}from"./generateQueryParams-fb37b441.js";var w=h.forwardRef(function(t,o){var a,d=t.bordered,n=t.className,r=t.compact,b=t.interactive,x=t.striped,p=D(t,["bordered","className","compact","interactive","striped"]),m=L(_,(a={},a[I]=r,a[F]=d,a[N]=x,a[R]=b,a),n);return h.createElement("table",B({},p,{ref:o,className:m}))});w.displayName="".concat(A,".HTMLTable");const ee=s`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
`,te=s`
	margin-left: auto;
`,ae=s`
	height: 500px;
	width: 1040px;
`,se=s`
	width: 1000px;
	margin: 0;
	border-collapse: collapse;
	table-layout: fixed;
`,ne=s`
	width: 200px;
	max-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border: 1px solid ${u.borderColor};
`,oe=s`
	width: 300px;
	max-width: 400px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border: 1px solid ${u.borderColor};
`,re=s`
	width: 400px;
	max-width: 200px;
	text-align: center;
	border: 1px solid ${u.borderColor};
`,ie=s`
	text-align: center;
`,le=s`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 500px;
`,f=s`
	border: 1px solid ${u.borderColor};
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	height: 50px;
`,ce=({todo:t})=>l("tr",{children:[e("td",{css:f,children:t.title}),e("td",{css:f,children:t.description}),l("td",{css:f,children:[e(Y,{todoId:t.id,todoData:t}),e(K,{todo:t})]})]}),de=s`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
	margin-bottom: 20px;
`,v=s`
	margin: 0 20px;
	padding: 10px 20px;
	text-decoration: none;
	color: white;
	background-color: #007bff;
	border-radius: 5px;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}
`,pe=s`
	.pagination {
		margin: 0 5px;
		padding: 10px 20px;
		text-decoration: none;
		color: white;
		background-color: #f0f0f0;
		border-radius: 5px;
		transition: background-color 0.3s;

		&:hover {
			background-color: #f8f8f8;
		}
	}

	.pagination a {
		padding: 10px 20px;
		margin: -10px -20px;
	}
`,he=({handlePageChange:t,pageCount:o,currentPage:a})=>l(g,{children:[e(M,{styles:pe}),e(V,{onPageChange:t,previousLabel:e(y,{css:v,children:"Back"}),nextLabel:e(y,{css:v,children:"Next"}),breakLabel:"...",pageCount:o,breakClassName:"break-me",pageRangeDisplayed:5,pageClassName:"pagination",css:de,forcePage:a})]}),ge=({handlePageChange:t,pageCount:o,currentPage:a,isFetching:d})=>{const{todos:n}=j();return e(g,{children:l(O,{interactive:!0,elevation:G.TWO,css:ae,children:[d?e("div",{css:le,children:e(H,{})}):l(w,{css:se,children:[e("thead",{children:l("tr",{children:[e("th",{css:ne,children:"Title"}),e("th",{css:oe,children:"Description"}),e("th",{css:re,children:"Actions"})]})}),e("tbody",{children:n.length>0?n.map(r=>e(ce,{todo:r},r.id)):e("tr",{children:e("td",{colSpan:3,css:ie,children:"There are no tasks!"})})})]}),n.length>0&&e(he,{handlePageChange:t,pageCount:o,currentPage:a})]})})},fe=()=>{const{input:t,setInput:o,selectedTab:a,setSelectedTab:d,currentPage:n,fetchFilteredTodos:r,pageCount:b,setCurrentPage:x}=X(z),p=q(t,300),[m,T]=h.useState(!1);h.useEffect(()=>{T(!0),r(p,a,n).finally(()=>T(!1))},[p,a,n]);const C=i=>{o(i.target.value)},k=i=>{const c=S.find(P=>P.id===i);c&&d(c)},E=i=>{x(i.selected)};return e(g,{children:e($,{onSubmit:()=>{r(t,a,n)},render:({handleSubmit:i})=>e("form",{onSubmit:i,children:e(g,{children:e("div",{css:ee,children:l(Z,{id:"Tabs",onChange:k,children:[S.map(c=>e(J,{id:c.id,title:c.title,panel:e(ge,{handlePageChange:E,pageCount:b,currentPage:n,isFetching:m})},c.id)),e("div",{children:e(Q,{})}),e("div",{css:te,children:e(U,{name:"filter",children:()=>e(W,{value:t,onChange:C,type:"text",leftIcon:"search",placeholder:"Filter todos..."})})})]})})})})})})};export{fe as default};
