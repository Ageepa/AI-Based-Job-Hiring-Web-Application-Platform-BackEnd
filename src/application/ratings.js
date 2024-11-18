import OpenAI from "openai";
import JobApplication from "../persistance/Entities/jobApplications.js";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateRating(jobApplicationId) {
    const jobApplication = await JobApplication.findById(jobApplicationId).populate("job");
    // Role: Software Architect, Description: "fsjafksdjfklsja"
    const content = `Role:${jobApplication?.job.title}, User Description : ${jobApplication?.answers.join(". ")}`
    
    const completion = await client.chat.completions.create(
        {
            messages:[{role:"user",content}],
            model: "ft:gpt-3.5-turbo-0613:stemlink:fullstacktutorial:8dWQ9vUC"
        }
    );
    const response = JSON.parse(completion.choices[0].message.content);
  
    if (!response.rate) {
        return;
    }
    await JobApplication.findOneAndUpdate({_id:jobApplicationId},{rating:response.rate})
}

