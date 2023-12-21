// users.js
import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: "full_name",
      type: "text",
      label: "Full Name",
      required: true
    },
  ],
};

export default Users;
