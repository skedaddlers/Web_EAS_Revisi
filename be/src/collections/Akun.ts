import { CollectionConfig } from 'payload/types'

const Akun: CollectionConfig = {
  slug: 'akun',
  auth: true,
  access: {
    create : ()=> true
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name : "full_name",
      type : "text",
      label : "Full Name",
      required : true
    },
  ],
}

export default Akun
