const isProd = import.meta.env.PROD;
const API_URL = import.meta.env.VITE_API_URL || (isProd ? '/api' : 'http://localhost:5000/api');

interface ApiError {
    message: string;
    success: boolean;
}

interface AuthResponse {
    success: boolean;
    token?: string;
    user?: any;
    provider?: any;
    message?: string;
    pendingApproval?: boolean;
    status?: string;
}

export const api = {
    async login(email: string, password: string, role: string = 'user'): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role }),
        });
        const data = await response.json();
        if (!response.ok) throw { ...data, httpStatus: response.status };
        return data;
    },

    async register(userData: any): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Registration failed');
        return data;
    },

    async registerProvider(formData: FormData): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Registration failed');
        return data;
    },

    async getProfile(token: string): Promise<any> {
        const response = await fetch(`${API_URL}/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
        return data;
    },

    async getUsers(token: string): Promise<any> {
        const response = await fetch(`${API_URL}/admin/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
        return data;
    },

    async getProviders(token: string, status?: string): Promise<any> {
        const url = status
            ? `${API_URL}/admin/providers?status=${status}`
            : `${API_URL}/admin/providers`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch providers');
        return data;
    },

    async getPublicProviders(category?: string): Promise<any> {
        const url = category
            ? `${API_URL}/providers/public?category=${encodeURIComponent(category)}`
            : `${API_URL}/providers/public`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch public providers');
        return data;
    },

    async approveProvider(id: string, token: string): Promise<any> {
        const response = await fetch(`${API_URL}/admin/providers/${id}/approve`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to approve provider');
        return data;
    },

    async rejectProvider(id: string, reason: string, token: string): Promise<any> {
        const response = await fetch(`${API_URL}/admin/providers/${id}/reject`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reason }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to reject provider');
        return data;
    },

    async deleteUser(id: string, type: 'user' | 'provider', token: string): Promise<any> {
        const response = await fetch(`${API_URL}/admin/users/${id}?userType=${type}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to delete user');
        return data;
    },

    async getProviderDashboard(token: string): Promise<any> {
        const response = await fetch(`${API_URL}/providers/dashboard`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch provider dashboard');
        return data;
    },

    async createBooking(bookingData: any, token: string): Promise<any> {
        const response = await fetch(`${API_URL}/users/booking`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to create booking');
        return data;
    },

    async getUserBookings(token: string): Promise<any> {
        const response = await fetch(`${API_URL}/users/bookings`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch user bookings');
        return data;
    },

    async updateBookingStatus(id: string, status: string, token: string): Promise<any> {
        const response = await fetch(`${API_URL}/providers/bookings/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to update booking status');
        return data;
    },

    async reviewBooking(id: string, reviewData: { rating: number, review: string }, token: string): Promise<any> {
        const response = await fetch(`${API_URL}/users/bookings/${id}/review`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to submit review');
        return data;
    },

    async seedMockData(token: string): Promise<any> {
        const response = await fetch(`${API_URL}/admin/seed`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to seed mock data');
        return data;
    },
};
