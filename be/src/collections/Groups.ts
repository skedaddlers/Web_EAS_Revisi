import { text } from "express";
import { CollectionConfig } from "payload/types";

const Groups: CollectionConfig = {
    slug: "groups",
    auth: false,
    admin: {
        useAsTitle: "email",
    },
    access: {
        create: () => true,
        update: () => true,
    },
    fields: [
        {
            name: "UserID",
            type: "relationship",
            relationTo: "users",
            hasMany: true,
        },
        {
            name: "GroupID",
            type: "text",
            required: true,
        },
    ],
};

export default Groups;
