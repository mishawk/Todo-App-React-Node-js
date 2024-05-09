import{c as n,b as d,j as e,C as P,a as F,G as I,B as h,F as c,u as M,r as b,g as L,e as j,f as B,h as E}from"./index-dfdc3fc6.js";import{T as G,R,u as D}from"./useFilteredPaginatedTodos-3b64b9af.js";import{U as N,u as _,M as U,C as z,a as A,t as m,b as O}from"./generateQueryParams-21044e36.js";const W=n`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 10px;
	overflow-y: auto;
`,$=n`
	width: 150px;
	margin-bottom: 10px;
	margin-left: auto;
	margin-right: auto;
`,q=n`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`,H=n`
	margin-bottom: 10px;
	padding: 10px;
	width: 320px;
	height: 100%;
`,J=n`
	margin-bottom: 5px;
`,K=n`
	margin-bottom: 10px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	height: 20px;
	width: 200px;
`,Q=({todo:t})=>d(P,{interactive:!0,elevation:2,css:H,children:[e("h5",{css:J,children:t.title}),e("p",{css:K,children:t.description}),e(G,{todo:t,children:e(N,{todoId:t.id,todoData:t})})]}),V=n`
	text-align: center;
	margin-top: 20px;
	font-size: 18px;
	color: ${F.noTodosMessageColor};
`,X=n`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 500px;
`,Y=n`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 0;
	margin-bottom: 10px;
`,x=n`
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
`,Z=n`
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
`,ee=({handlePageChange:t,pageCount:r,currentPage:a})=>d(c,{children:[e(I,{styles:Z}),e(R,{onPageChange:t,previousLabel:e(h,{css:x,children:"Back"}),nextLabel:e(h,{css:x,children:"Next"}),breakLabel:"...",pageCount:r,breakClassName:"break-me",pageRangeDisplayed:3,marginPagesDisplayed:0,pageClassName:"pagination",css:Y,forcePage:a})]}),te=({handlePageChange:t,pageCount:r,currentPage:a})=>{const{todos:l}=M();return e(c,{children:d("div",{children:[l.length>0?l.map(o=>e(Q,{todo:o},o.id)):e("p",{css:V,children:"No todos to display"}),l.length>0&&e(ee,{handlePageChange:t,pageCount:r,currentPage:a})]})})},ie=()=>{const{input:t,setInput:r,selectedTab:a,setSelectedTab:l,currentPage:o,fetchFilteredTodos:p,pageCount:f,setCurrentPage:y,isLoading:C}=D(U),g=_(t,300),[S,u]=b.useState(!1);b.useEffect(()=>{u(!0),p(g,a,o).finally(()=>u(!1))},[g,a,o]);const T=s=>{r(s.target.value)},v=s=>{const i=m.find(k=>k.id===s);i&&l(i)},w=s=>{y(s.selected)};return e(c,{children:e(L,{onSubmit:()=>{p(t,a,o)},render:({handleSubmit:s})=>e("form",{onSubmit:s,children:e(c,{children:d("div",{css:W,children:[e("div",{css:$,children:e(j,{name:"filter",children:()=>e(B,{value:t,onChange:T,type:"text",leftIcon:"search",placeholder:"Filter todos..."})})}),e(z,{}),e(A,{id:"Tabs",css:q,onChange:v,children:m.map(i=>e(O,{id:i.id,title:i.title,panel:S?e("div",{css:X,children:e(E,{})}):e(te,{handlePageChange:w,pageCount:f,currentPage:o,isLoading:C})},i.id))})]})})})})})};export{ie as default};
