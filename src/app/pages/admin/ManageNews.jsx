import { supabase } from '../../../lib/supabase';
import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Search, Filter, Calendar, Image as ImageIcon, Eye, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

export function ManageNews({ articles, setArticles }) {

const textareaRef = useRef(null);

const [showForm, setShowForm] = useState(false);
const [editingArticle, setEditingArticle] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [filterStatus, setFilterStatus] = useState('All');
const [imageFile, setImageFile] = useState(null);
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
.select("*, admin_profiles!news_created_by_fkey ( name )")
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
// SLUG AUTO
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
// MARKDOWN TOOLBAR
// ============================

const insertMarkdown = (before, after="") => {

const textarea = textareaRef.current;

if(!textarea) return;

const start = textarea.selectionStart;
const end = textarea.selectionEnd;

const selected = formData.content.substring(start,end);

const newText =
formData.content.substring(0,start) +
before +
selected +
after +
formData.content.substring(end);

setFormData(prev => ({
...prev,
content:newText
}));

};

const addBold=()=>insertMarkdown("","");
const addItalic=()=>insertMarkdown("","");
const addHeading=()=>insertMarkdown("\n## ");
const addBullet=()=>insertMarkdown("\n- ");
const addNumber=()=>insertMarkdown("\n1. ");
const addLink=()=>insertMarkdown(""text" (https://)");

// ============================
// INPUT CHANGE
// ============================

const handleInputChange = (e) => {

const {name,value,type,checked}=e.target;

setFormData(prev=>({
...prev,
[name]:type==="checkbox"?checked:value
}));

};

// ============================
// IMAGE UPLOAD
// ============================

const handleImageChange = async (e) => {

const file = e.target.files[0];

if(!file) return;

if(!file.type.startsWith('image/')){
alert('File must be an image');
return;
}

if(file.size > 210241024){
alert('Max image size is 2MB');
return;
}

const fileName="${Date.now()}-${file.name}";

const {error}=await supabase.storage
.from('news-images')
.upload(fileName,file);

if(error){
alert('Upload failed');
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

const handleSubmit = async (e) => {

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

await supabase
.from('news')
.update(finalData)
.eq('id',editingArticle.id);

}else{

await supabase
.from('news')
.insert([finalData]);

}

fetchArticles();
resetForm();
setShowForm(false);

};

// ============================
// DELETE
// ============================

const handleDelete = async (id) => {

if(!window.confirm('Delete article?')) return;

await supabase
.from('news')
.delete()
.eq('id',id);

fetchArticles();

};

// ============================
// EDIT
// ============================

const handleEdit = (article) => {

setFormData(article);
setEditingArticle(article);
setImagePreview(article.image || '');
setShowForm(true);

};

// ============================
// RESET
// ============================

const resetForm = () => {

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

const filteredArticles = articles.filter(article => {

const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
const matchesStatus = filterStatus==="All" || article.status===filterStatus;

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
// FORM VIEW
// ============================

if(showForm){

return(

<Card className="border-none shadow-md"><CardContent className="p-6"><div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-[#191919]">
{editingArticle?'Edit Article':'Add New Article'}
</h3><button onClick={()=>{setShowForm(false);resetForm();}}>
<X className="w-6 h-6"/>
</button>

</div><form onSubmit={handleSubmit} className="space-y-6"><div className="grid md:grid-cols-2 gap-6">{/* LEFT */}

<div className="space-y-4"><div><label className="block text-sm font-medium text-[#191919] mb-1">
Title
</label><input
type="text"
name="title"
value={formData.title}
onChange={handleInputChange}
className="w-full px-4 py-2 border border-slate-300 rounded-lg"
/>

</div><div><label className="block text-sm font-medium text-[#191919] mb-1">
Slug
</label><input
type="text"
name="slug"
value={formData.slug}
onChange={handleInputChange}
className="w-full px-4 py-2 border border-slate-300 rounded-lg"
/>

</div><div><label className="block text-sm font-medium text-[#191919] mb-1">
Category
</label><select
name="category"
value={formData.category}
onChange={handleInputChange}
className="w-full px-4 py-2 border border-slate-300 rounded-lg"

«»

{categories.map(cat=>(

<option key={cat} value={cat}>{cat}</option>
))}</select></div></div>{/* RIGHT */}

<div className="space-y-4"><div><label className="block text-sm font-medium text-[#191919] mb-2">
Featured Image
</label><input type="file" onChange={handleImageChange}/></div></div></div>{/* SUMMARY */}

<div><label className="block text-sm font-medium text-[#191919] mb-1">
Summary
</label><textarea
name="summary"
value={formData.summary}
onChange={handleInputChange}
rows="3"
className="w-full px-4 py-2 border border-slate-300 rounded-lg"
/>

</div>


{/* TOOLBAR */}

<div className="flex flex-wrap gap-2">

<button type="button" onClick={addHeading} className="px-3 py-1 border rounded">H</button>
<button type="button" onClick={addBold} className="px-3 py-1 border rounded font-bold">B</button>
<button type="button" onClick={addItalic} className="px-3 py-1 border rounded italic">I</button>
<button type="button" onClick={addBullet} className="px-3 py-1 border rounded">• List</button>
<button type="button" onClick={addNumber} className="px-3 py-1 border rounded">1. List</button>
<button type="button" onClick={addLink} className="px-3 py-1 border rounded">Link</button>

</div>


{/* CONTENT */}

<textarea
ref={textareaRef}
name="content"
value={formData.content}
onChange={handleInputChange}
rows="10"
className="w-full px-4 py-2 border border-slate-300 rounded-lg font-mono"
/>


<div className="flex gap-3 pt-4 border-t">

<Button type="submit" className="bg-[#AE8737] text-[#191919] px-6">
Save Article
</Button>

<Button type="button" onClick={()=>{setShowForm(false);resetForm();}}>
Cancel
</Button>

</div>

</form>

</CardContent>

</Card>

);

}


// ============================
// TABLE VIEW
// ============================

return(

<div className="space-y-6">

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

<div>

<h2 className="text-2xl font-bold text-[#191919]">
Manage News
</h2>

<p className="text-slate-500 text-sm">
Create and manage news articles and publications.
</p>

</div>

<Button
onClick={()=>setShowForm(true)}
className="bg-[#AE8737] hover:bg-[#8f6e2d] text-[#191919] flex items-center gap-2"
>

<Plus className="w-4 h-4"/> Add New Article

</Button>

</div>


<Card className="border-none shadow-sm">

<CardContent className="p-6">

<div className="relative flex-1 max-w-md mb-6">

<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400"/>

<input
type="text"
placeholder="Search articles..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg"
/>

</div>


<div className="overflow-x-auto">

<table className="w-full">

<thead>

<tr className="border-b border-slate-100 text-left">

<th className="py-4 px-4 text-sm">Title</th>
<th className="py-4 px-4 text-sm">Author</th>
<th className="py-4 px-4 text-sm">Status</th>
<th className="py-4 px-4 text-sm text-right">Actions</th>

</tr>

</thead>

<tbody>

{filteredArticles.map(article=>(

<tr key={article.id} className="border-b border-slate-50">

<td className="py-3 px-4">{article.title}</td>

<td className="py-3 px-4 text-sm text-slate-500">
{article.author_name}
</td>

<td className="py-3 px-4">

<span className={`px-2 py-1 rounded text-xs ${
article.status==="Published"
? "bg-green-100 text-green-700"
: "bg-yellow-100 text-yellow-700"
}`}>

{article.status}

</span>

</td>

<td className="py-3 px-4 text-right">

<button onClick={()=>window.open(`/news/${article.slug}`)}>
<Eye/>
</button>

<button onClick={()=>handleEdit(article)}>
<Edit2/>
</button>

<button onClick={()=>handleDelete(article.id)}>
<Trash2/>
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</CardContent>

</Card>

</div>

);

}