import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const client = await pool.connect();
    let user;
    try {
      const res = await client.query('SELECT * FROM "user" WHERE email = $1', [email]);
      user = res.rows[0];
    } finally {
      client.release();
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials. Please verify your email.' }, { status: 401 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied. Authorized administrators only.' }, { status: 403 });
    }

    // Verify password using bcryptjs compare
    const match = await bcrypt.compare(password, user.passwordHash || '');
    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials. Please verify your password.' }, { status: 401 });
    }

    // Sign a standard JWT matching the Express backend's expectation (JWT_SECRET)
    const jwtSecret = process.env.JWT_SECRET || '32f3df9f2359267c8334f349d651608d';
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: error.message || 'Server error during login' }, { status: 500 });
  }
}
