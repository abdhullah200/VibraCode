export async function GET() {
  const keys = [
    'NEXTAUTH_URL',
    'AUTH_SECRET',
    'DATABASE_URL',
    'AUTH_GOOGLE_ID',
    'AUTH_GOOGLE_SECRET',
    'AUTH_GITHUB_ID',
    'AUTH_GITHUB_SECRET',
  ];

  const result: Record<string, boolean> = {};
  for (const k of keys) {
    result[k] = !!process.env[k];
  }

  // Also include NODE_ENV for context, but do not expose secrets.
  const payload = {
    envPresence: result,
    nodeEnv: process.env.NODE_ENV ?? 'unknown',
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}
