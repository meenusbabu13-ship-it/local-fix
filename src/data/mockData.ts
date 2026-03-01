export const mockUsers = [
    {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        role: 'User',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        joinedDate: '2023-01-15',
        location: { lat: 40.7128, lng: -74.0060, address: '123 Main St, New York, NY' }
    },
    {
        id: '2',
        name: 'Admin User',
        email: 'admin@localfix.com',
        role: 'Admin',
        status: 'Active',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=10B981&color=fff',
        joinedDate: '2023-01-01',
        location: { lat: 40.7580, lng: -73.9855, address: 'Times Square, New York, NY' }
    },
    {
        id: '3',
        name: 'Alex Henderson',
        email: 'alex.h@provider.com',
        role: 'ServiceProvider',
        status: 'Active',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        joinedDate: '2023-03-10',
        location: { lat: 40.7829, lng: -73.9654, address: 'Central Park West, New York, NY' },
        specialty: 'Electrical Specialist',
        rating: 4.9,
        completedJobs: 128,
        hourlyRate: 85
    }
];

export const mockServiceProviders = [
    {
        id: '101',
        name: 'Dave\'s Pro Repairs',
        specialty: 'Plumbing',
        rating: 4.8,
        completedJobs: 342,
        image: 'https://images.unsplash.com/photo-1581578017093-cd30fba4e9d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: '102',
        name: 'Arctic Air Solutions',
        specialty: 'HVAC',
        rating: 4.9,
        completedJobs: 512,
        image: 'https://images.unsplash.com/photo-1581094794329-cd11965d15eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: '103',
        name: 'SecuHome Systems',
        specialty: 'Smart Home',
        rating: 4.7,
        completedJobs: 215,
        image: 'https://images.unsplash.com/photo-1558002038-109177381793?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
];

export const mockBookingRequests = [
    {
        id: '4321',
        clientName: 'Sarah Johnson',
        clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80',
        service: 'Full Circuit Breaker Replacement',
        location: 'Brooklyn, NY (2.4 miles)',
        time: 'Today, 2:30 PM',
        price: 240.00,
        isNew: true
    },
    {
        id: '4325',
        clientName: 'Michael Ross',
        clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&q=80',
        service: 'Smart Home Lighting Setup',
        location: 'Manhattan, NY (0.8 miles)',
        time: 'Tomorrow, 10:00 AM',
        price: 185.00,
        isNew: true
    }
];

export const mockAgenda = [
    {
        id: '4321',
        time: '09:00 AM - 11:30 AM',
        title: 'Kitchen Rewiring',
        address: '122 West St, Apartment 4B'
    },
    {
        id: '4325',
        time: '12:30 PM - 01:30 PM',
        title: 'Diagnostic Visit',
        address: '45 Central Park, Lobby'
    }
];

export const mockRoles = [
    { id: '1', name: 'Admin', permissions: ['all'] },
    { id: '2', name: 'User', permissions: ['read'] },
    { id: '3', name: 'ServiceProvider', permissions: ['read', 'write', 'service_manage'] }
];

export const mockLogs = [
    { id: '1', user: 'Admin User', action: 'System Login', timestamp: '2023-10-25 09:00:00' },
    { id: '2', user: 'Alex Johnson', action: 'Updated Profile', timestamp: '2023-10-25 10:30:00' },
    { id: '3', user: 'Admin User', action: 'Deleted User', timestamp: '2023-10-26 14:15:00' },
    { id: '4', user: 'Alex Henderson', action: 'Completed Job #4122', timestamp: '2023-10-26 16:00:00' },
];

export const mockStats = {
    revenue: '$4,250.00',
    revenueGrowth: '+12.5%',
    avgRating: '4.9',
    ratingGrowth: '+0.2%',
    completedJobs: '128',
    jobsGrowth: '+8%'
};
