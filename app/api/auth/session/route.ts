// import { NextResponse } from 'next/server';
// import { api, ApiError } from '@/app/api/api';
// import { cookies } from 'next/headers';

// export async function GET() {
//   const cookieStore = await cookies();
  
//   try {
//     const { data } = await api.get('/auth/session', {
//       headers: {
//         Cookie: cookieStore.toString(),
//       },
//     });
    
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as ApiError).response?.data?.error ?? (error as ApiError).message },
//       { status: (error as ApiError).response?.status || 401 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.json(
        { error: 'No active session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: 'Session is active',
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Session check failed' },
      { status: 500 }
    );
  }
}