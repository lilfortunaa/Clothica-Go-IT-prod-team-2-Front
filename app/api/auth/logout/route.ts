import { NextResponse } from 'next/server';
import { api, ApiError } from '@/app/api/api';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  
  try {
    // Викликаємо backend logout
    await api.post('/auth/logout', {}, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    
    // Створюємо відповідь
    const response = NextResponse.json({ success: true });
    
    // КРИТИЧНО: Очищаємо cookies з правильними параметрами
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 0, // Видаляємо cookie
    };
    
    response.cookies.set('accessToken', '', cookieOptions);
    response.cookies.set('refreshToken', '', cookieOptions);
    response.cookies.set('sessionId', '', cookieOptions);
    
    console.log("✅ Cookies cleared in logout route");
    
    return response;
  } catch (error) {
    console.error("❌ Logout route error:", error);
    
    // Навіть якщо помилка - все одно очищаємо cookies
    const response = NextResponse.json(
      { error: (error as ApiError).response?.data?.error ?? "Logout failed" },
      { status: 500 }
    );
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 0,
    };
    
    response.cookies.set('accessToken', '', cookieOptions);
    response.cookies.set('refreshToken', '', cookieOptions);
    response.cookies.set('sessionId', '', cookieOptions);
    
    return response;
  }
}