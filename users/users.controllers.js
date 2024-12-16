import { get } from 'mongoose';
import { userModel } from './users.model.js';


export async function handleGetUsers(req, res) {
    const users = await userModel.find({});
    res.json(users);
}

export async function handleGetUser(req, res) {
    const id = req.params.id;
    const foundUser = await userModel.findById(id)
    res.json(foundUser);
}

export async function createUser(req,res){
    const existingUser = await userModel.findOne({username: req.body.username});
    if(existingUser){
        res.status(409).send('User already exists');
        return;
    }
    const newUser = new userModel(req.body);
    await newUser.save()
    res.json(newUser);
    console.log(newUser);
}

export async function getUserBalance(req,res){
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.balance);
}

export async function updateUserBalance(req,res){
    const id = req.params.id;
    const { balance } = req.body; 
    const newBalance = balance
    await userModel.findByIdAndUpdate(id, {balance: newBalance});
    res.json(newBalance);
}

export async function updateUserBitcoinAmount(req, res) {
    const id = req.params.id;
    const { bitcoinAmount } = req.body;  
    const newBitcoinAmount = bitcoinAmount;
    await userModel.findByIdAndUpdate(id, { bitcoinAmount: newBitcoinAmount });
    res.json(newBitcoinAmount);
}

export async function getUserBitcoinAmount(req, res) {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.bitcoinAmount);
}

export async function updateUserEthereumAmount(req, res) {
    const id = req.params.id;
    const { ethereumAmount } = req.body;  
    const newEthereumAmount = ethereumAmount;
    await userModel.findByIdAndUpdate(id, { ethereumAmount: newEthereumAmount });
    res.json(newEthereumAmount);
}

export async function getUserEthereumAmount(req, res) {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.ethereumAmount);
}

export async function updateUserLitecoinAmount(req, res) {
    const id = req.params.id;
    const { litecoinAmount } = req.body;  
    const newLitecoinAmount = litecoinAmount;
    await userModel.findByIdAndUpdate(id, { litecoinAmount: newLitecoinAmount });
    res.json(newLitecoinAmount);
}

export async function getUserLitecoinAmount(req, res) {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.litecoinAmount);
}

export async function getUserName(req, res) {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.username);
}
