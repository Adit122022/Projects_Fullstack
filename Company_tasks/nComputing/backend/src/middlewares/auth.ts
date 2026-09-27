import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../config/prisma';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export async function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    if (token.includes('.')) {
      // Traditional JWT verification
      jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
        }
        
        req.user = decoded as AuthRequest['user'];
        next();
      });
    } else {
      // Better Auth session token verification
      try {
        const session = await prisma.session.findUnique({
          where: { token },
          include: { user: true }
        });

        if (!session || new Date(session.expiresAt) < new Date()) {
          return res.status(403).json({ error: 'Forbidden: Session expired or invalid' });
        }

        req.user = {
          id: session.userId,
          email: session.user.email,
          role: session.user.role || 'USER'
        };
        next();
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error in authorization' });
      }
    }
  } else {
    res.status(401).json({ error: 'Unauthorized: Authentication token is required' });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
}
