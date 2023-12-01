import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccesToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => { 
    const { email, password, username } = req.body;
    
    try {

        const userFound = await User.findOne({ email });

        if (userFound) return res.status(400).json(['The email is already taken' ]);

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: passwordHash
        });

        const userSaved = await newUser.save();

        const token = await createAccesToken({ id: userSaved._id });

        res.cookie('token', token);

        res.json({
            id: userSaved._id,
            email: userSaved.email,
            username: userSaved.username,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
    
}
export const login = async (req, res) => { 
    const { email, password } = req.body;
    
    try {

        const userFound = await User.findOne({ email });
        
        if (!userFound) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        const token = await createAccesToken({ id: userFound._id });

        res.cookie('token', token);

        res.json({
            id: userFound._id,
            email: userFound.email,
            username: userFound.username,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
    
}

export const logout = async (req, res) => { 
    res.clearCookie('token');
    res.json({ message: 'Logout' });
}

export const profile = async (req, res) => { 
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(404).json({ message: 'User not found' });

    return res.json({
        id: userFound._id,
        email: userFound.email,
        username: userFound.username,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })

    res.send('profile');

}

export const verifyToken = async (req, res) => {

        const token = req.cookies.token;

        if (!token) return json.status(401).json({ message: 'Unauthorized' });

        jwt.verify(token, TOKEN_SECRET, async (error, user) => {
            if (error) return res.status(401).json({ message: 'Unauthorized' });

            const userFound = await User.findById(user.id);
            if (!userFound) return res.status(401).json({ message: 'User not found' });

            return res.json({
                id: userFound._id,
                email: userFound.email,
                username: userFound.username
            })
        })

 
}