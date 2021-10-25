
const { Schema, model } = require('mongoose');


//user schema

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            //regex for email
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },

        id: false
    }
);

//virtuals setup

UserSchema.virtual('friendCounter').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;