export const calculateProfileCompletion = (profile: any) => {
    const fields = [
        { name: 'fullName', weight: 10 },
        { name: 'dateOfBirth', weight: 10 },
        { name: 'gender', weight: 10 },
        { name: 'location', weight: 10 },
        { name: 'churchDenomination', weight: 15 },
        { name: 'maritalStatus', weight: 10 },
        { name: 'interests', weight: 10, isArray: true },
        { name: 'occupation', weight: 10 },
        { name: 'about', weight: 5 },
        { name: 'photos', weight: 10, isArray: true }
    ];

    let completionScore = 0;

    fields.forEach(field => {
        if (field.isArray) {
            if (profile[field.name]?.length > 0) {
                completionScore += field.weight;
            }
        } else if (profile[field.name]) {
            completionScore += field.weight;
        }
    });

    return completionScore;
};
