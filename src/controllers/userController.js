const { User, Pet } = require('../models')
const hashGenerate = require('../utils/hashGenerate')
const { isValidObjectId } = require('mongoose')

const create = async (req, res) => {
    const { name, photo, username, email, password, phone } = req.body

    if (!username) return res.status(400).json({ message: 'Campo username não informado!' })
    if (!email) return res.status(400).json({ message: 'Campo de e-mail não informado!' })
    if (!password) return res.status(400).json({ message: 'Campo de senha não informado!' })
    const hashedPassword = hashGenerate(password)

    const user = await User.create({
        name,
        photo,
        username,
        email,
        password: hashedPassword,
        phone
    })

    return res.status(201).json(user)
}

const update = async (req, res) => {
    const { id } = req.params
    const { name, photo, phone } = req.body
    let userAuthenticated;
    if (req.user && req.user.id) {
        userAuthenticated = req.user.id
    }

    if (!userAuthenticated) return res.status(401).json({ message: 'Usuário não autorizado!' })

    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Código do usuário informado é inválido!' })

    if (userAuthenticated !== id) return res.status(403).json({ message: 'Não é possivel realizar está operação!' })

    await User.findByIdAndUpdate(id, {
        name,
        photo,
        phone
    })

    return res.status(204).json()
}

const remove = async (req, res) => {
    const { id } = req.params
    let userAuthenticated;
    if (req.user && req.user.id) {
        userAuthenticated = req.user.id
    }
    if (!userAuthenticated) return res.status(401).json({ message: 'Usuário não autorizado!' })
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Código do usuário informado é inválido!' })
    
    if (userAuthenticated !== id) return res.status(403).json({ message: 'Não é possivel realizar está operação!' })
    
    await User.findByIdAndRemove(id)
    await Pet.deleteOne({ petDonor: id })

    return res.status(204).json()
}

const select = async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
}

const selectById = async (req, res) => {
    const { id } = req.params
    let userAuthenticated;

    if (req.user && req.user.id) {
        userAuthenticated = req.user.id
    }

    if (!userAuthenticated) return res.status(401).json({ message: 'Usuário não autorizado!' })

    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Código do usuário informado é inválido!' })

    const user = await User.findById(id)
    return res.status(200).json(user)
}


module.exports = {
    create,
    update,
    remove,
    select,
    selectById
}