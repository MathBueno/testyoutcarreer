import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { parsedProfile, behavioralProfile } = await req.json();
    if (!parsedProfile) {
      return new Response(JSON.stringify({ error: "Parsed profile is required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const behavioralContext = behavioralProfile 
      ? `\n\nBehavioral Profile (Big Five scores 1-5):
- Openness: ${behavioralProfile.openness}
- Conscientiousness: ${behavioralProfile.conscientiousness}
- Extraversion: ${behavioralProfile.extraversion}
- Agreeableness: ${behavioralProfile.agreeableness}
- Neuroticism: ${behavioralProfile.neuroticism}
Dominant traits: ${behavioralProfile.dominantTraits?.join(', ') || 'N/A'}

Use these to calculate behavioralMatch (0-100) for each role.`
      : '';

    const systemPrompt = `You are a world-class career advisor. Given a parsed professional profile, generate diverse career roles the person could pursue.

Return ONLY valid JSON with this exact structure (no markdown):
{
  "directions": [
    {
      "name": "Direction Name",
      "description": "Brief description of this career path",
      "overallCompatibility": 75,
      "roles": [
        {
          "id": "unique-id",
          "title": "Role Title",
          "area": "Industry/Area",
          "seniority": "junior|mid|senior|lead",
          "compatibilityPercent": 85,
          "presentSkills": ["skills the person has"],
          "missingSkills": ["skills they need"],
          "suggestions": [
            {"type": "hard_skill|soft_skill|language|course|certification", "description": "What to develop"}
          ],
          "effortLevel": "low|medium|high",
          "estimatedTimeMonths": 6,
          "behavioralMatch": 80,
          "zone": "comfort|growth"
        }
      ]
    }
  ],
  "insights": [
    "Key insight about the career profile",
    "Another insight"
  ]
}

Rules:
- Generate 4-6 career directions with 3-5 roles each (15-25 roles total)
- Cover diverse industries: tech, design, marketing, data, management, finance, consulting, education, healthcare, etc.
- Include both "comfort zone" roles (high compatibility, easy transition) and "growth zone" roles (lower compatibility but achievable with effort)
- Compatibility % = how much of the role requirements the person already meets
- effortLevel: low (<3 months), medium (3-12 months), high (>12 months)
- estimatedTimeMonths: realistic time to become qualified
- Seniority should match the person's experience level and nearby levels
- Be specific with role titles (not generic)
- Suggestions should be actionable and specific
- behavioralMatch: how well the person's behavioral traits fit the role (only if behavioral data provided, otherwise omit)
- Insights should be unique observations about career potential, strengths, and areas to explore`;

    const userPrompt = `Generate career roles for this profile:

Hard Skills: ${parsedProfile.hardSkills?.join(', ') || 'None'}
Soft Skills: ${parsedProfile.softSkills?.join(', ') || 'None'}
Languages: ${parsedProfile.languages?.join(', ') || 'None'}
Experience Level: ${parsedProfile.experienceLevel || 'unknown'}
Total Years: ${parsedProfile.totalYearsExperience || 0}
Education: ${parsedProfile.education?.join(', ') || 'None'}
Courses: ${parsedProfile.courses?.join(', ') || 'None'}
Career Tendencies: ${parsedProfile.careerTendencies?.join(', ') || 'None'}
Profile Type: ${parsedProfile.profileType || 'unknown'}
Summary: ${parsedProfile.summary || 'N/A'}${behavioralContext}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
    const parsed = JSON.parse(jsonMatch[1]!.trim());

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-roles error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
