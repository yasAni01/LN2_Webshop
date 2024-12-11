export async function POST({ request }) {
    const { email, password } = await request.json();
  
    // Replace this with your real MongoDB user authentication logic
    if (email === 'user@example.com' && password === '123') {
      return new Response(
        JSON.stringify({
          user: { id: 1, name: 'John Doe', email },
          token: 'your-jwt-token',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  