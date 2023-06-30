export default {
    name: 'featuredPosts',
    title: 'Featured Posts',
    type: 'document',
    fields: [
        {
            name: "banner_image",
            title: "Banner Image",
            type: "image",
        },
        {
            name: 'sub_heading',
            title: 'Sub Heading',
            type: 'string',
        },
        {
            name: 'heading1',
            title: 'Heading 1',
            type: 'string',
        },
        {
            name: 'heading2',
            title: 'Heading 2',
            type: 'string',
        },
        {
            name: 'redirect_url',
            title: 'Redirect URL',
            type: 'string',
        },

    ],
}