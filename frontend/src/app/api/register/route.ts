import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await axios.post('http://localhost:8000/api/auth/register/', body);
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ message: 'Registration failed', error: error.response?.data }, { status: 400 });
    } else {
      return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
