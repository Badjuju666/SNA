const { Schema, model } = require('mongoose');

const Userschema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String, 
            required: true,
            unique: true,
            validate: {                    
                validator: function(value) {
                return value === 'correct@example.com';
            },
            message: 'Invalid email.',
            },   
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, 
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }]
        },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    } 
);
UserSchema.virtual('friednCount').get(function () {
    return this.friedns.length
});   

const User = model('User', Userschema);

module.exports = User;