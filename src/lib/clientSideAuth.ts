export async function login(homeserverUrl: string, username: string, password: string): Promise<string> {
    console.log(`Authenticating with ${homeserverUrl}`);

    const url = new URL("/_matrix/client/v3/login", homeserverUrl);
    const loginResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type: 'm.login.password',
            identifier: {
                type: 'm.id.user',
                user: username,
            },
            refresh_token: false,
            initial_device_display_name: "Draupnir4All Web",
            password,
        }),
    });

    const loginData = await loginResponse.json();
    if (!loginData.access_token) {
        throw new Error(loginData.error || 'Login failed');
    }

    return loginData.access_token;
}

interface OpenIDTokenResponse {
    access_token: string;
    expires_in: number;
    matrix_server_name: string;
    token_type: string;
    error?: string;
}

export async function generateOpenIDToken(homeserverUrl: string, username: string, accessToken: string): Promise<OpenIDTokenResponse> {
    if (!accessToken) {
        throw new Error('Access token is required');
    }
    const url = new URL("/_matrix/client/v3/user/" + encodeURIComponent(username) + "/openid/request_token", homeserverUrl);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'm.login.openid',
        }),
    });

    const data = await response.json();
    if (!data.access_token) {
        throw new Error(data.error || 'Failed to generate OpenID token');
    }

    const dataAsResponse = data as OpenIDTokenResponse;

    return dataAsResponse;
}

export async function logout(homeserverUrl: string, accessToken: string): Promise<void> {
    console.log(`Logging out with ${homeserverUrl}`);

    const url = new URL("/_matrix/client/v3/logout", homeserverUrl);
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
    } catch (error: unknown) {
        console.warn("Failed to logout:", error);
    }
}