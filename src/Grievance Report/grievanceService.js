export const fetchGrievances = async () => {
  try {
    const response = await fetch('http://localhost:8989/grievanceStatus');
    if (!response.ok) {
      throw new Error('Failed to fetch grievances');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching grievances:', error);
    return [];
  }
};
