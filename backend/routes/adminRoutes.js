import express from 'express'
import { adminAuth, adminHome, adminLogout, dltUser, registerAdmin, userEdit } from '../controllers/adminControllers.js'


const adminRoute = express.Router()


adminRoute.post('/',adminAuth)
adminRoute.post('/logout',adminLogout)
adminRoute.get('/data',adminHome)
adminRoute.put('/edit',userEdit)
adminRoute.post('/sign',registerAdmin)
adminRoute.delete('/delete',dltUser)



export default adminRoute