import { supabase } from '../../../lib/supabase';
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Search, Image as ImageIcon, Eye, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function ManageNews({ articles, setArticles }) {

const textareaRef = useRef(null);

const [showForm, setShowForm] = useState(false);
const [editingArticle, setEditingArticle] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [filterStatus, setFilterStatus] = useState('All');
const [imagePreview, setImagePreview] = useState('');

const [formData, setFormData] = useState({
title:'',
slug:'',
category:'Corporate Law',
summary:'',
content:'',
image:'',
status:'Draft',
featured:false,
date:new Date().toISOString().split('T')[0]
});


// ============================
// FETCH ARTICLES
// ============================

const fetchArticles = async () => {

const { data, error } = await supabase
.from('news')
.select(`
*,
admin_profiles!news_created_by_fkey (
name
)
`)
.order('created_at',{ascending:false});

if(error){
console.error(error);
return;
}

const formatted=data.map(article=>({
...article,
author_name:article.admin_profiles?.name || "-"
}));

setArticles(formatted);

};

useEffect(()=>{
fetchArticles();
},[]);


// ============================
// SLUG AUTO GENERATE
// ============================

useEffect(()=>{

if(!editingArticle && formData.title){

const slug=formData.title
.toLowerCase()
.replace(/[^a-z0-9]+/g,'-')
.replace(/(^-|-$)+/g,'');

setFormData(prev=>({...prev,slug}));

}

},[formData.title,editingArticle]);


// ============================
// SIMPLE MARKDOWN TOOLBAR
// ============================

const insertMarkdown=(before,after="")=>{

const textarea=textareaRef.current;

if(!textarea) return;

const start=textarea.selectionStart;
const end=textarea.selectionEnd;

const selected=formData.content.substring(start,end);

const newText=
formData.content.substring(0,start)+
before+
selected+
after+
formData.content.substring(end);

setFormData(prev=>({
...prev,
content:newText
}));

};

const addBold=()=>insertMarkdown("**","**");
const addItalic=()=>insertMarkdown("*","*");
const addHeading=()=>insertMarkdown("\n## ");
const addBullet=()=>insertMarkdown("\n- ");
const addNumber=()=>insertMarkdown("\n1. ");
const addLink=()=>insertMarkdown("[text](https://)");


// ============================
// INPUT CHANGE
// ============================

const handleInputChange=(e)=>{

const {name,value,type,checked}=e.target;

setFormData(prev=>({

...prev,
[name]:type==="checkbox"?checked:value

}));

};


// ============================
// IMAGE UPLOAD
// ============================

const handleImageChange=async(e)=>{

const file=e.target.files[0];

if(!file) return;

if(!file.type.startsWith("image/")){
alert("File must be an image");
return;
}

if(file.size>2*1024*1024){
alert("Max image size is 2MB");
return;
}

const fileName=`${Date.now()}-${file.name}`;

const {error}=await supabase.storage
.from('news-images')
.upload(fileName,file);

if(error){
console.error(error);
alert("Upload failed");
return;
}

const {data}=supabase.storage
.from('news-images')
.getPublicUrl(fileName);

setImagePreview(data.publicUrl);

setFormData(prev=>({
...prev,
image:data.publicUrl
}));

};


// ============================
// SUBMIT
// ============================

const handleSubmit=async(e)=>{

e.preventDefault();

const {data:{user}}=await supabase.auth.getUser();

const finalData={
title:formData.title,
slug:formData.slug,
category:formData.category,
summary:formData.summary,
content:formData.content,
image_url:formData.image,
status:formData.status,
featured:formData.featured,
date:formData.date,
created_by:user?.id
};

if(editingArticle){

const {error}=await supabase
.from('news')
.update(finalData)
.eq('id',editingArticle.id);

if(error){
alert("Update failed");
return;
}

}else{

const {error}=await supabase
.from('news')
.insert([finalData]);

if(error){
alert("Insert failed");
return;
}

}

fetchArticles();
resetForm();
setShowForm(false);

};


// ============================
// DELETE
// ============================

const handleDelete=async(id)=>{

if(!window.confirm("Delete article?")) return;

await supabase
.from('news')
.delete()
.eq('id',id);

fetchArticles();

};


// ============================
// EDIT
// ============================

const handleEdit=(article)=>{

setFormData(article);
setEditingArticle(article);
setImagePreview(article.image || '');
setShowForm(true);

};


// ============================
// RESET
// ============================

const resetForm=()=>{

setFormData({
title:'',
slug:'',
category:'Corporate Law',
summary:'',
content:'',
image:'',
status:'Draft',
featured:false,
date:new Date().toISOString().split('T')[0]
});

setEditingArticle(null);
setImagePreview('');

};


// ============================
// FILTER
// ============================

const filteredArticles=articles.filter(article=>{

const matchesSearch=article.title.toLowerCase().includes(searchTerm.toLowerCase());
const matchesStatus=filterStatus==="All" || article.status===filterStatus;

return matchesSearch && matchesStatus;

});


const categories=[
'Corporate Law',
'Litigation',
'Intellectual Property',
'Real Estate',
'Family Law',
'Labor Law'
];


// ============================
// FORM
// ============================

if(showForm){

return(

<Card className="border-none shadow-md">

<CardContent className="p-6">

<div className="flex justify-between items-center mb-6">

<h3 className="text-xl font-bold text-[#191919]">
{editingArticle?'Edit Article':'Add New Article'}
</h3>

<button
onClick={()=>{setShowForm(false);resetForm();}}
>
<X/>
</button>

</div>


<form onSubmit={handleSubmit} className="space-y-6">


{/* TITLE */}

<input
type="text"
name="title"
value={formData.title}
onChange={handleInputChange}
placeholder="Title"
className="w-full border rounded px-3 py-2"
/>


{/* SUMMARY */}

<textarea
name="summary"
value={formData.summary}
onChange={handleInputChange}
placeholder="Summary"
rows="3"
className="w-full border rounded px-3 py-2"
/>


{/* TOOLBAR */}

<div className="flex flex-wrap gap-2">

<button type="button" onClick={addHeading} className="border px-3 py-1 rounded">H</button>

<button type="button" onClick={addBold} className="border px-3 py-1 rounded font-bold">B</button>

<button type="button" onClick={addItalic} className="border px-3 py-1 rounded italic">I</button>

<button type="button" onClick={addBullet} className="border px-3 py-1 rounded">• List</button>

<button type="button" onClick={addNumber} className="border px-3 py-1 rounded">1. List</button>

<button type="button" onClick={addLink} className="border px-3 py-1 rounded">Link</button>

</div>


{/* CONTENT */}

<textarea
ref={textareaRef}
name="content"
value={formData.content}
onChange={handleInputChange}
rows="12"
className="w-full border rounded px-3 py-2 font-mono"
/>


<Button type="submit" className="bg-[#AE8737] text-black">
Save Article
</Button>


</form>

</CardContent>

</Card>

);

}


// ============================
// TABLE
// ============================

return(

<div className="space-y-6">

<Button onClick={()=>setShowForm(true)}>
<Plus/> Add Article
</Button>

<table className="w-full">

<thead>

<tr>
<th>Title</th>
<th>Author</th>
<th>Status</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{filteredArticles.map(article=>(

<tr key={article.id}>

<td>{article.title}</td>

<td>{article.author_name}</td>

<td>{article.status}</td>

<td>

<button onClick={()=>handleEdit(article)}>
<Edit2/>
</button>

<button onClick={()=>handleDelete(article.id)}>
<Trash2/>
</button>

<button onClick={()=>window.open(`/news/${article.slug}`)}>
<Eye/>
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}