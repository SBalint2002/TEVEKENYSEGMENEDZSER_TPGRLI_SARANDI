const BACKEND_URL = 'http://localhost:5129';

export async function createSchedule(activityDto) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/schedule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activityDto)
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to create schedule');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}