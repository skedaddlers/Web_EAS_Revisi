import { CollectionConfig } from 'payload/types';

const Mutual: CollectionConfig = {
  slug: 'mutual',
  auth: false,
  access: {
    create : ()=> true,
    update : ()=> true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name : "User1ID",
      type : "text",
      required : true,
    },
    {
      name : "User2ID",
      type : "text",
      required : true,
    },
  ],
};

export default Mutual;
