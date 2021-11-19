const jwt = require('../utils/jwtGenerate')
const hashGenerate = require('../utils/hashGenerate')
const { User } = require('../models')

const authenticate = async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) return res.status(400).json({ message: 'Credenciais não informadas!' })
    const hashPassword = hashGenerate(password)
    const user = await User.findOne({ email, password: hashPassword })
    
    if (!user) return res.status(400).json({ message: 'Credenciais inválidas!' })
    const token = jwt({ id: user._id, email })
    
    return res.status(200).json({ token, id: user._id })
}



module.exports = {
    authenticate
}