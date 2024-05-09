import{r as f,i as L,k as P,l as D,m as _,n as I,o as N,p as R,_ as B,D as A,c as s,a as b,b as l,j as e,G as F,B as T,F as h,u as M,h as j,E as G,C as H,g as O,e as $,f as U}from"./index-39178980.js";import{T as W,R as K,u as V}from"./useFilteredPaginatedTodos-5132bfb2.js";import{U as X,u as Y,D as q,t as v,b as z,C as J,a as Q}from"./generateQueryParams-5a1582ab.js";var w=f.forwardRef(function(t,o){var a,d=t.bordered,n=t.className,r=t.compact,g=t.interactive,u=t.striped,x=L(t,["bordered","className","compact","interactive","striped"]),p=P(D,(a={},a[_]=r,a[I]=d,a[N]=u,a[R]=g,a),n);return f.createElement("table",B({},x,{ref:o,className:p}))});w.displayName="".concat(A,".HTMLTable");const Z=s`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
`,ee=s`
	margin-left: auto;
`,te=s`
	height: 500px;
`,ae=s`
	width: 1000px;
	margin: 0;
	border-collapse: collapse;
	table-layout: fixed;
`,se=s`
	width: 200px;
	max-width: 200px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border: 1px solid ${b.borderColor};
`,ne=s`
	width: 300px;
	max-width: 400px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	border: 1px solid ${b.borderColor};
`,oe=s`
	width: 400px;
	max-width: 200px;
	text-align: center;
	border: 1px solid ${b.borderColor};
`,re=s`
	text-align: center;
`,m=s`
	border: 1px solid ${b.borderColor};
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	height: 50px;
`,ie=({todo:t})=>l("tr",{children:[e("td",{css:m,children:t.title}),e("td",{css:m,children:t.description}),l("td",{css:m,children:[e(X,{todoId:t.id,todoData:t}),e(W,{todo:t})]})]}),le=s`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0;
	margin-bottom: 20px;
`,S=s`
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
`,ce=s`
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
`,de=({handlePageChange:t,pageCount:o,currentPage:a})=>l(h,{children:[e(F,{styles:ce}),e(K,{onPageChange:t,previousLabel:e(T,{css:S,children:"Back"}),nextLabel:e(T,{css:S,children:"Next"}),breakLabel:"...",pageCount:o,breakClassName:"break-me",pageRangeDisplayed:5,pageClassName:"pagination",css:le,forcePage:a})]}),pe=({handlePageChange:t,pageCount:o,currentPage:a,isLoading:d})=>{const{todos:n}=M();return e(h,{children:d?e(j,{}):l(H,{interactive:!0,elevation:G.TWO,css:te,children:[l(w,{css:ae,children:[e("thead",{children:l("tr",{children:[e("th",{css:se,children:"Title"}),e("th",{css:ne,children:"Description"}),e("th",{css:oe,children:"Actions"})]})}),e("tbody",{children:n.length>0?n.map(r=>e(ie,{todo:r},r.id)):e("tr",{children:e("td",{colSpan:3,css:re,children:"There are no tasks!"})})})]}),n.length>0&&e(de,{handlePageChange:t,pageCount:o,currentPage:a})]})})},xe=()=>{const{input:t,setInput:o,selectedTab:a,setSelectedTab:d,currentPage:n,fetchFilteredTodos:r,pageCount:g,setCurrentPage:u,isLoading:x}=V(q),p=Y(t,300);f.useEffect(()=>{r(p,a,n)},[p,a,n]);const C=i=>{o(i.target.value)},y=i=>{const c=v.find(E=>E.id===i);c&&d(c)},k=i=>{u(i.selected)};return e(h,{children:e(O,{onSubmit:()=>{r(t,a,n)},render:({handleSubmit:i})=>e("form",{onSubmit:i,children:e(h,{children:e("div",{css:Z,children:l(Q,{id:"Tabs",onChange:y,children:[v.map(c=>e(z,{id:c.id,title:c.title,panel:e(pe,{handlePageChange:k,pageCount:g,currentPage:n,isLoading:x})},c.id)),e("div",{children:e(J,{})}),e("div",{css:ee,children:e($,{name:"filter",children:()=>e(U,{value:t,onChange:C,type:"text",leftIcon:"search",placeholder:"Filter todos..."})})})]})})})})})})};export{xe as default};
