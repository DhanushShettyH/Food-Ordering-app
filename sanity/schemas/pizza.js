export default{
    // schema name
    name:'pizza',
    title:"pizza",
    type:"document",
    // fields array of object(field of model)
    fields:[
        {
            // pizza image
            name:'image',
            title:'image',
            type:'image',
            options:{
                // if we wan't to edit of crop image directly in to database
                hotspot:true
            }
        },
        {
            name:'name',
            title:'name',
            type:'string'
        },
        {
            // slug is like specific id (uniq url page name with slug)
            name:'slug',
            title:'slug',
            type:'slug',
            options:{
                source:'name',
                maxLength:90
            }
        },
        {
            // we have 3 type of pizza small medium large 
            name:'price',
            title:'price',
            type:'array',
            of:[{type:'number'}]
        },
        {
            name:'details',
            title:'details',
            type:'string'
        }
    ]
}