const REACT_APP_OPENAI_API_KEY = 'sk-proj-T9HzCtlIuEzllrzrk8KaT3BlbkFJzcHfSTAsZDHcNZ7lKrGJ';

export const getCompletion = async (numStars, location) => {
    let rating = ''
    if (numStars <= 2.5){
        rating = 'bad'
    } else if (numStars >= 3 && numStars < 4){
        rating = 'mediocre'
    } else if (numStars >= 4){
        rating = 'good'
    }
    const prompt = `Why does this place, ${location}, have a ${rating} potential for electricity 
    production with solar panels? Give your answer in 1-2 sentences.`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',  // Use gpt-3.5-turbo model
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
};