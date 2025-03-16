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
            return { success: true, message: await response.json() };
        } else {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    } catch (error) {
        console.error('Error creating schedule:', error.message);
        return { success: false, message: error.message };
    }
}