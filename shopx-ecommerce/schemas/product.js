export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            },
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
        },
        {
            name: 'subCategory',
            title: 'Sub Category',
            type: 'string',
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'stock',
            title: 'Stock',
            type: 'number',
        },
        {
            name: 'isNew',
            title: 'New',
            type: 'boolean',
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'number',
        },
    ]
}