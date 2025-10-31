from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    full_name: Optional[str]
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


# Decision Schemas
class DecisionCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=500)
    description: Optional[str] = None
    category: str = Field(..., pattern="^(career|finance|health|business|education|personal)$")
    context: Optional[Dict[str, Any]] = None


class DecisionUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    context: Optional[Dict[str, Any]] = None
    status: Optional[str] = None


class DecisionResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: Optional[str]
    category: str
    context: Optional[Dict[str, Any]]
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


# Scenario Schemas
class ScenarioResponse(BaseModel):
    id: str
    decision_id: str
    title: str
    description: Optional[str]
    probability: Optional[float]
    timeline_data: Optional[Dict[str, Any]]
    outcomes: Optional[Dict[str, Any]]
    risks: Optional[List[Dict[str, Any]]]
    recommendations: Optional[str]
    rank: Optional[int]
    created_at: datetime
    
    class Config:
        from_attributes = True


class DecisionWithScenariosResponse(BaseModel):
    decision: DecisionResponse
    scenarios: List[ScenarioResponse]


# Simulation Request
class SimulationRequest(BaseModel):
    decision_id: str
    num_scenarios: int = Field(default=3, ge=2, le=5)
    time_horizon_years: int = Field(default=5, ge=1, le=10)

