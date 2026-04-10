import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text, mode } = await req.json();
    if (!text || typeof text !== "string" || text.trim().length < 10) {
      return new Response(JSON.stringify({ error: "Please provide at least 10 characters of text." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert career analyst and HR specialist. Extract structured career data from the user's input.
The input may be: free text describing their background, LinkedIn profile content, or CV/resume text.

Return ONLY valid JSON with this exact structure (no markdown, no explanation):
{
  "hardSkills": ["skill1", "skill2"],
  "softSkills": ["skill1", "skill2"],
  "languages": ["language1"],
  "experienceLevel": "junior" | "mid" | "senior",
  "courses": ["course1"],
  "education": ["degree1"],
  "totalYearsExperience": number,
  "careerTendencies": ["analytical", "creative", "strategic", "operational", "entrepreneurial"],
  "profileType": "generalist" | "specialist",
  "summary": "Brief 2-sentence summary of the professional profile",
  "inconsistencies": ["any inconsistencies found in the profile"]
}

Rules:
- Normalize skill names (e.g. "JS" → "JavaScript", "ML" → "Machine Learning")
- Deduplicate skills
- Infer experience level from context (years, titles, responsibilities)
- Identify career tendencies from the type of work described
- Flag inconsistencies (e.g. "claims senior but 1 year experience")
- For courses, extract only the course/certification name, ignore institutions
- If info is missing, use empty arrays or reasonable defaults
- Always return valid JSON`;

    const userPrompt = mode === 'linkedin' 
      ? `Parse this LinkedIn profile content:\n\n${text}`
      : mode === 'cv'
      ? `Parse this CV/resume content:\n\n${text}`
      : `Parse this career description:\n\n${text}`;

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
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    
    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
    const parsed = JSON.parse(jsonMatch[1]!.trim());

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("parse-profile error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
