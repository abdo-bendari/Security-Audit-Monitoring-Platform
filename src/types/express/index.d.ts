// src/types/express/index.d.ts
import { UserDocument } from '../../modules/user/user.schema'; 

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument & { id: string }; 
    }
  }
}
