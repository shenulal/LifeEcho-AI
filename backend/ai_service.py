from openai import OpenAI
from typing import List, Dict, Any
import json
import random
from config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None


def generate_scenarios(
    decision_title: str,
    decision_description: str,
    category: str,
    context: Dict[str, Any],
    num_scenarios: int = 3,
    time_horizon_years: int = 5
) -> List[Dict[str, Any]]:
    """
    Generate multiple future scenarios for a decision using AI
    """
    
    if not client:
        # Fallback to mock data if no API key
        return generate_mock_scenarios(decision_title, category, num_scenarios, time_horizon_years)
    
    try:
        # Create a detailed prompt for scenario generation
        prompt = create_scenario_prompt(
            decision_title, decision_description, category, context, num_scenarios, time_horizon_years
        )
        
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are an expert decision analyst and futurist who helps people visualize potential outcomes of their decisions. Generate realistic, data-driven scenarios with specific metrics and timelines."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            max_tokens=2000
        )
        
        # Parse the AI response
        scenarios_text = response.choices[0].message.content
        scenarios = parse_scenarios_from_text(scenarios_text, time_horizon_years)
        
        return scenarios
    
    except Exception as e:
        print(f"Error generating scenarios with AI: {e}")
        return generate_mock_scenarios(decision_title, category, num_scenarios, time_horizon_years)


def create_scenario_prompt(
    title: str,
    description: str,
    category: str,
    context: Dict[str, Any],
    num_scenarios: int,
    time_horizon: int
) -> str:
    """Create a detailed prompt for scenario generation"""
    
    context_str = "\n".join([f"- {k}: {v}" for k, v in context.items()]) if context else "No additional context provided"
    
    prompt = f"""
I need help analyzing a {category} decision. Please generate {num_scenarios} distinct future scenarios over a {time_horizon}-year timeline.

Decision: {title}
Description: {description}

Context:
{context_str}

For each scenario, provide:
1. A descriptive title
2. Probability estimate (0-100%)
3. Detailed description of what happens
4. Timeline with key milestones (at least 3-5 milestones)
5. Quantitative outcomes (financial impact, satisfaction score 1-10, time investment)
6. Risk factors (at least 2-3 risks with severity: low/medium/high)
7. Recommendations

Format each scenario as JSON with this structure:
{{
  "title": "Scenario title",
  "probability": 0.75,
  "description": "What happens in this scenario",
  "timeline": [
    {{"period": "Month 3", "event": "First milestone", "impact": "positive"}},
    {{"period": "Year 1", "event": "Major milestone", "impact": "neutral"}}
  ],
  "outcomes": {{
    "financial": {{"year_1": 50000, "year_3": 75000, "year_5": 100000}},
    "satisfaction": 7.5,
    "time_investment_hours": 500
  }},
  "risks": [
    {{"factor": "Risk description", "severity": "medium", "mitigation": "How to mitigate"}}
  ],
  "recommendations": "Key recommendations for this path"
}}

Generate {num_scenarios} diverse scenarios ranging from optimistic to conservative to challenging.
"""
    return prompt


def parse_scenarios_from_text(text: str, time_horizon: int) -> List[Dict[str, Any]]:
    """Parse scenarios from AI-generated text"""
    
    scenarios = []
    
    # Try to extract JSON objects from the text
    try:
        # Look for JSON array or multiple JSON objects
        import re
        json_pattern = r'\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}'
        matches = re.findall(json_pattern, text, re.DOTALL)
        
        for i, match in enumerate(matches[:5]):  # Limit to 5 scenarios
            try:
                scenario = json.loads(match)
                # Add rank
                scenario['rank'] = i + 1
                scenarios.append(scenario)
            except json.JSONDecodeError:
                continue
    
    except Exception as e:
        print(f"Error parsing scenarios: {e}")
    
    # If parsing failed, return mock scenarios
    if not scenarios:
        return generate_mock_scenarios("Decision", "general", 3, time_horizon)
    
    return scenarios


def generate_mock_scenarios(
    decision_title: str,
    category: str,
    num_scenarios: int,
    time_horizon: int
) -> List[Dict[str, Any]]:
    """Generate mock scenarios when AI is not available"""
    
    scenarios = []
    
    scenario_templates = [
        {
            "title": f"Optimistic Path: {decision_title}",
            "probability": 0.65,
            "description": "Everything goes according to plan with minimal setbacks. You achieve your goals ahead of schedule.",
            "base_financial": 1.2,
            "satisfaction": 8.5,
            "risk_level": "low"
        },
        {
            "title": f"Balanced Approach: {decision_title}",
            "probability": 0.75,
            "description": "A realistic middle-ground scenario with expected challenges and steady progress.",
            "base_financial": 1.0,
            "satisfaction": 7.0,
            "risk_level": "medium"
        },
        {
            "title": f"Conservative Path: {decision_title}",
            "probability": 0.55,
            "description": "A cautious approach with slower progress but lower risk. Takes longer but more stable.",
            "base_financial": 0.8,
            "satisfaction": 6.5,
            "risk_level": "low"
        },
        {
            "title": f"Aggressive Strategy: {decision_title}",
            "probability": 0.45,
            "description": "High-risk, high-reward approach. Potential for significant gains but also setbacks.",
            "base_financial": 1.5,
            "satisfaction": 7.5,
            "risk_level": "high"
        },
        {
            "title": f"Gradual Transition: {decision_title}",
            "probability": 0.70,
            "description": "Step-by-step approach minimizing disruption. Slower but more manageable.",
            "base_financial": 0.9,
            "satisfaction": 7.8,
            "risk_level": "low"
        }
    ]
    
    for i in range(min(num_scenarios, len(scenario_templates))):
        template = scenario_templates[i]
        
        # Generate timeline
        timeline = []
        for year in range(1, time_horizon + 1):
            if year == 1:
                timeline.append({
                    "period": f"Year {year}",
                    "event": f"Initial implementation and learning phase",
                    "impact": "neutral"
                })
            elif year == time_horizon:
                timeline.append({
                    "period": f"Year {year}",
                    "event": f"Full realization of outcomes",
                    "impact": "positive"
                })
            else:
                timeline.append({
                    "period": f"Year {year}",
                    "event": f"Continued progress and optimization",
                    "impact": "positive"
                })
        
        # Generate financial outcomes
        base_amount = 60000 if category == "career" else 50000
        financial_outcomes = {}
        for year in [1, 3, 5]:
            if year <= time_horizon:
                multiplier = template["base_financial"] * (1 + (year - 1) * 0.15)
                financial_outcomes[f"year_{year}"] = int(base_amount * multiplier)
        
        # Generate risks
        risks = [
            {
                "factor": "Market conditions may change",
                "severity": template["risk_level"],
                "mitigation": "Stay informed and be ready to adapt"
            },
            {
                "factor": "Unexpected challenges may arise",
                "severity": "medium",
                "mitigation": "Build contingency plans and maintain flexibility"
            }
        ]
        
        scenario = {
            "title": template["title"],
            "probability": template["probability"],
            "description": template["description"],
            "timeline": timeline,
            "outcomes": {
                "financial": financial_outcomes,
                "satisfaction": template["satisfaction"],
                "time_investment_hours": random.randint(300, 1000)
            },
            "risks": risks,
            "recommendations": f"This path is suitable if you prioritize {'stability' if template['risk_level'] == 'low' else 'growth'}. Consider your risk tolerance and timeline.",
            "rank": i + 1
        }
        
        scenarios.append(scenario)
    
    return scenarios

