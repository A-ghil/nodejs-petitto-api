const { Pet } = require('../models');
const { isValidObjectId } = require('mongoose');

const create = async (req, res) => {
    const { name, age, gender, breed, species, photo } = req.body

    let userAuthenticated;
    if (req.user && req.user.id) {
        userAuthenticated = req.user.id
    }
    if (!userAuthenticated) return res.status(401).json({ message: 'Usuário não autorizado!' })

    if (!name) return res.status(400).json({ message: 'Campo nome não informado!' })
    if (!species) return res.status(400).json({ message: 'Campo espécie não informado!' })

    const pet = await Pet.create({
        name,
        age,
        gender,
        breed,
        species,
        photo,
        petDonor: userAuthenticated,
    })

    return res.status(201).json(pet)

}

const update = async (req, res) => {
    const { id } = req.params
    const { name, age, photo } = req.body

    let userAuthenticated;
    if (req.user && req.user.id) {
        userAuthenticated = req.user.id
    }
    if (!userAuthenticated) return res.status(401).json({ message: 'Usuário não autorizado!' })

    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Código do pet informado é inválido!' })
    const pet = await Pet.findById(id)

    if ( pet.petDonor !== userAuthenticated ) return res.status(403).json({ message: 'Não é possivel realizar está operação!' })
    
    await Pet.findByIdAndUpdate(id, {
        name,
        age,
        photo
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

    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Código do pet informado é inválido!' })
    
    const pet = await Pet.findById(id)

    if ( pet.petDonor !== userAuthenticated ) return res.status(403).json({ message: 'Não é possivel realizar está operação!' })
    
    await Pet.findByIdAndRemove(id)

    return res.status(204).json()

}

const select = async (req, res) => {
    const pets = await Pet.find({})
    return res.status(200).json(pets)
}

const selectById = async (req, res) => {
    const { id } = req.params

    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Código do pet informado é inválido!' })

    const pet = await Pet.findById(id)
    return res.status(200).json(pet)
}

const adopted = async (req, res) => {
    const { id } = req.params

    let userAuthenticated;
    if (req.user && req.user.id) {
        userAuthenticated = req.user.id
    }
    if (!userAuthenticated) return res.status(401).json({ message: 'Usuário não autorizado!' })

    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Código do pet informado é inválido!' })

    await Pet.findByIdAndUpdate(id, {
        adopted: {
            user: userAuthenticated,
            date: new Date()
        }
    })
    
    return res.status(200).json({message:'Pet adotado com sucesso!'})
}

module.exports = {
    create,
    update,
    remove,
    select,
    selectById,
    adopted
}