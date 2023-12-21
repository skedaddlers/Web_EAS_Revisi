import { CollectionConfig } from 'payload/types';

const MutualChat: CollectionConfig = {
  slug: 'mutualchat',
  auth: false,
  access: {
    create : ()=> true,
    read : ()=> true,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name : "AkunID",
      type : "text",
      required : true,
    },
    {
      name : "MutualID",
      type : "relationship",
      relationTo : "mutual"
    },
    {
      name : "chat",
      type : "textarea",
    }
  ],
};

export default MutualChat;
