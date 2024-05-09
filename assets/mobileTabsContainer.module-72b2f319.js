import{c as n,b as d,j as e,C as v,a as w,G as k,B as u,F as c,u as P,h as I,r as M,g as F,e as L,f as B}from"./index-38de91d3.js";import{T as j,R as E,u as G}from"./useFilteredPaginatedTodos-f2c775c8.js";import{U as R,u as D,M as N,C as _,a as U,t as h,b as z}from"./generateQueryParams-e42faa4b.js";const A=n`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px;
	overflow-y: auto;
`,O=n`
	width: 150px;
	margin-bottom: 10px;
	margin-left: auto;
	margin-right: auto;
`,W=n`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`,$=n`
	margin-bottom: 10px;
	padding: 10px;
	width: 320px;
	height: 100%;
`,q=n`
	margin-bottom: 5px;
`,H=n`
	margin-bottom: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	height: 20px;
	width: 200px;
`,J=({todo:t})=>d(v,{interactive:!0,elevation:2,css:$,children:[e("h5",{css:q,children:t.title}),e("p",{css:H,children:t.description}),e(j,{todo:t,children:e(R,{todoId:t.id,todoData:t})})]}),K=n`
	text-align: center;
	margin-top: 20px;
	font-size: 18px;
	color: ${w.noTodosMessageColor};
`,Q=n`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 0;
	margin-bottom: 10px;
`,b=n`
	margin: 0 10px;
	padding: 5px 10px;
	text-decoration: none;
	color: white;
	background-color: #007bff;
	border-radius: 5px;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}
`,V=n`
	.pagination {
		margin: 0 2px;
		padding: 5px 10px;
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
		padding: 5px 10px;
		margin: -5px -10px;
	}
`,X=({handlePageChange:t,pageCount:r,currentPage:o})=>d(c,{children:[e(k,{styles:V}),e(E,{onPageChange:t,previousLabel:e(u,{css:b,children:"Back"}),nextLabel:e(u,{css:b,children:"Next"}),breakLabel:"...",pageCount:r,breakClassName:"break-me",pageRangeDisplayed:3,marginPagesDisplayed:0,pageClassName:"pagination",css:Q,forcePage:o})]}),Y=({handlePageChange:t,pageCount:r,currentPage:o,isLoading:p})=>{const{todos:a}=P();return e(c,{children:p?e(I,{}):d("div",{children:[a.length>0?a.map(l=>e(J,{todo:l},l.id)):e("p",{css:K,children:"No todos to display"}),a.length>0&&e(X,{handlePageChange:t,pageCount:r,currentPage:o})]})})},ae=()=>{const{input:t,setInput:r,selectedTab:o,setSelectedTab:p,currentPage:a,fetchFilteredTodos:l,pageCount:m,setCurrentPage:x,isLoading:f}=G(N),g=D(t,300);M.useEffect(()=>{l(g,o,a)},[g,o,a]);const y=s=>{r(s.target.value)},C=s=>{const i=h.find(S=>S.id===s);i&&p(i)},T=s=>{x(s.selected)};return e(c,{children:e(F,{onSubmit:()=>{l(t,o,a)},render:({handleSubmit:s})=>e("form",{onSubmit:s,children:e(c,{children:d("div",{css:A,children:[e("div",{css:O,children:e(L,{name:"filter",children:()=>e(B,{value:t,onChange:y,type:"text",leftIcon:"search",placeholder:"Filter todos..."})})}),e(_,{}),e(U,{id:"Tabs",css:W,onChange:C,children:h.map(i=>e(z,{id:i.id,title:i.title,panel:e(Y,{handlePageChange:T,pageCount:m,currentPage:a,isLoading:f})},i.id))})]})})})})})};export{ae as default};
